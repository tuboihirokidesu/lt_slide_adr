// Usage: pnpm dev (port 3030) → node scripts/check.mjs [outDir] [slideNo...]
// Captures every slide at its final click state and reports layout defects and links hidden under overlays.
import { chromium } from 'playwright-chromium'
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { resolve } from 'node:path'

const base = process.env.SLIDEV_URL ?? 'http://localhost:3030'
const out = resolve(process.argv[2] ?? 'shots')
const only = process.argv.slice(3).map(Number)
mkdirSync(out, { recursive: true })

// Fall back to the newest cached headless shell when the pinned Playwright build is not downloaded.
const cache = `${homedir()}/Library/Caches/ms-playwright`
const shell = existsSync(chromium.executablePath()) || !existsSync(cache)
  ? undefined
  : readdirSync(cache).filter((d) => d.startsWith('chromium_headless_shell-')).sort().map((d) => `${cache}/${d}/chrome-headless-shell-mac-arm64/chrome-headless-shell`).filter(existsSync).pop()
const browser = await chromium.launch({ executablePath: shell })
const page = await browser.newPage({ viewport: { width: 980, height: 552 }, deviceScaleFactor: 2 })
await page.goto(`${base}/1`, { waitUntil: 'networkidle' })
await page.waitForFunction(() => window.__slidev__?.nav?.total > 0)
const total = await page.evaluate(() => window.__slidev__.nav.total)
const targets = only.length ? only : Array.from({ length: total }, (_, i) => i + 1)

const report = []
for (const n of targets) {
  await page.goto(`${base}/${n}?clicks=99`, { waitUntil: 'networkidle' })
  await page.addStyleTag({ content: '#slide-container nav,#slidev-goto-dialog{display:none!important}' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(1600)
  const el = page.locator('#slide-content')
  await el.screenshot({ path: `${out}/${String(n).padStart(2, '0')}.png` })

  const issues = await page.evaluate(() => {
    if (document.querySelector('vite-error-overlay')) return ['vite-error-overlay: the slide failed to compile']
    const root = document.querySelector('#slide-content .slidev-page:not([style*="display: none"]) .slidev-layout')
      ?? document.querySelector('#slide-content .slidev-layout')
    if (!root) return ['no .slidev-layout found']
    const frame = document.querySelector('#slide-content').getBoundingClientRect()
    const found = []
    const label = (e) => `${e.tagName.toLowerCase()}.${[...e.classList].join('.')} "${(e.textContent ?? '').trim().slice(0, 28)}"`
    for (const e of root.querySelectorAll('*')) {
      const cs = getComputedStyle(e)
      if (cs.visibility === 'hidden' || cs.display === 'none' || Number(cs.opacity) === 0) continue
      if (e.closest('[aria-hidden="true"]')) continue
      const r = e.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) continue
      const tol = 1
      if (r.left < frame.left - tol || r.top < frame.top - tol || r.right > frame.right + tol || r.bottom > frame.bottom + tol) {
        found.push(`out-of-slide: ${label(e)}`)
      }
      const clips = ['hidden', 'clip', 'auto', 'scroll'].includes(cs.overflowX) || ['hidden', 'clip', 'auto', 'scroll'].includes(cs.overflowY)
      if (clips && (e.scrollHeight > e.clientHeight + 2 || e.scrollWidth > e.clientWidth + 2) && e.textContent.trim()) {
        found.push(`clipped-content: ${label(e)} (${e.scrollWidth}x${e.scrollHeight} > ${e.clientWidth}x${e.clientHeight})`)
      }
    }
    // A link is usable only if a click at its centre lands on the link, not on an overlay drawn above it.
    for (const a of root.querySelectorAll('a[href]')) {
      const r = a.getClientRects()[0]
      if (!r) continue
      const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2)
      if (!hit || !a.contains(hit)) found.push(`covered-link: ${label(a)} under ${hit ? label(hit) : 'nothing'}`)
    }
    return found.slice(0, 12)
  })
  report.push({ slide: n, issues })
  console.log(`${String(n).padStart(2, '0')} ${issues.length ? '✗ ' + issues.join('\n   ') : '✓'}`)
}

const cells = targets.map((n) => `<figure><img src="${String(n).padStart(2, '0')}.png"><figcaption>${n}</figcaption></figure>`).join('')
writeFileSync(`${out}/sheet.html`, `<!doctype html><style>body{margin:0;background:#222;display:grid;grid-template-columns:repeat(3,1fr);gap:12px;padding:12px}img{width:100%;display:block}figure{margin:0}figcaption{color:#aaa;font:12px monospace;padding:2px}</style>${cells}`)
writeFileSync(`${out}/report.json`, JSON.stringify(report, null, 2))
await browser.close()
process.exit(report.some((r) => r.issues.length) ? 1 : 0)
