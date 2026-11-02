// Usage: pnpm dev (port 3030) → node scripts/check.mjs [outDir] [slideNo...]
//        node scripts/check.mjs --lint   (static rules and speaker-note length only; no dev server needed)
// Captures every slide at its final click state and reports design-rule breaks, layout defects and links hidden under overlays.
// The rules mirror AGENTS.md. Raw values live only in the custom-property definitions of styles/index.css.
import { chromium } from 'playwright-chromium'
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { resolve } from 'node:path'

const MIN_LABEL_PX = 12
const MIN_SENTENCE_PX = 14
const NOTE_CHARS_PER_MIN = 300
const NOTE_MAX_CHARS = 500

const RULES = [
  {
    id: 'raw-font-size',
    test: /font-size:(?!\s*(?:(?:calc\()?var\(--fs-|inherit\b|[\d.]+em\b))[^;"}]+/g,
    why: '文字サイズは --fs-* の段階から選ぶ',
  },
  {
    id: 'raw-color',
    test: /#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|oklch)\(/g,
    why: '色は --tone-* などの用途の名前で参照する',
  },
  {
    id: 'color-named-tone',
    test: /--(?:teal|amber|ext|blue|green|indigo)\b(?!-)|--(?:teal|amber|ext)-|\b(?:is|tone)-(?:teal|amber|blue)\b|\b(?:tone|accent)[=:]\s*["']?(?:teal|amber|blue)\b/g,
    why: '色の名前ではなく、recommend・caution・source・emphasis の用途で呼ぶ',
  },
]

const root = resolve(import.meta.dirname, '..')
const sources = ['slides.md', 'styles/index.css', ...['components', 'layouts'].flatMap((d) => readdirSync(`${root}/${d}`).filter((f) => f.endsWith('.vue')).map((f) => `${d}/${f}`))]
// Only CSS is linted: <style> blocks, style/fill/stroke attributes, and stylesheets. Prose such as "PR #1234" is not CSS.
const cssRegions = (file, text) => {
  if (file.endsWith('.css')) return [[0, text.length]]
  const regions = []
  for (const m of text.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) regions.push([m.index + m[0].indexOf(m[1]), m.index + m[0].indexOf(m[1]) + m[1].length])
  for (const m of text.matchAll(/\b(?:style|fill|stroke|stop-color|color)="([^"]*)"/g)) regions.push([m.index, m.index + m[0].length])
  for (const m of text.matchAll(/\b(?:tone|accent)[=:]\s*["']?\w+/g)) regions.push([m.index, m.index + m[0].length])
  for (const m of text.matchAll(/^(?:tone|accent):.*$/gm)) regions.push([m.index, m.index + m[0].length])
  return regions
}
const isTokenDefinition = (file, line) => file === 'styles/index.css' && /^\s*--[\w-]+\s*:/.test(line)

const lint = () => {
  const found = []
  for (const file of sources) {
    const text = readFileSync(`${root}/${file}`, 'utf8')
    const lines = text.split('\n')
    const lineAt = (i) => text.slice(0, i).split('\n').length
    for (const [from, to] of cssRegions(file, text)) {
      const region = text.slice(from, to)
      for (const rule of RULES) {
        for (const m of region.matchAll(rule.test)) {
          const n = lineAt(from + m.index)
          if (isTokenDefinition(file, lines[n - 1])) continue
          found.push(`${rule.id}: ${file}:${n} "${m[0].trim()}" (${rule.why})`)
        }
      }
    }
  }
  return [...new Set(found)]
}

const noteReport = () => {
  const slides = readFileSync(`${root}/slides.md`, 'utf8').split(/^---$/m)
  const notes = []
  let page = 0
  for (const chunk of slides) {
    if (!/^\s*#\s/m.test(chunk) && !/^</m.test(chunk.trim())) continue
    page += 1
    const note = chunk.match(/<!--([\s\S]*?)-->\s*$/)?.[1] ?? ''
    notes.push({ page, chars: note.replace(/\[click(?::\d+)?\]/g, '').replace(/\s/g, '').length })
  }
  const total = notes.reduce((sum, n) => sum + n.chars, 0)
  const long = notes.filter((n) => n.chars > NOTE_MAX_CHARS)
  return { total, minutes: total / NOTE_CHARS_PER_MIN, long }
}

const ruleBreaks = lint()
const notes = noteReport()
console.log(ruleBreaks.length ? `✗ ${ruleBreaks.length} design-rule breaks\n   ${ruleBreaks.join('\n   ')}` : '✓ design rules')
console.log(`notes: ${notes.total} chars ≈ ${notes.minutes.toFixed(1)} min at ${NOTE_CHARS_PER_MIN} chars/min`)
for (const n of notes.long) console.log(`   ⚠ slide ${String(n.page).padStart(2, '0')} note is ${n.chars} chars (> ${NOTE_MAX_CHARS}, about ${Math.round((n.chars / NOTE_CHARS_PER_MIN) * 60)} s)`)
if (process.argv[2] === '--lint') process.exit(ruleBreaks.length ? 1 : 0)

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

  const issues = await page.evaluate(({ minLabel, minSentence }) => {
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
      // Text too small to read when projected. Monospace labels may sit at the label step; sentences start at the note step.
      const ownText = [...e.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim())
      if (ownText) {
        const px = parseFloat(cs.fontSize)
        const floor = /mono/i.test(cs.fontFamily.split(',')[0]) ? minLabel : minSentence
        if (px < floor - 0.01) found.push(`small-text: ${label(e)} ${px}px < ${floor}px`)
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
  }, { minLabel: MIN_LABEL_PX, minSentence: MIN_SENTENCE_PX })
  report.push({ slide: n, issues })
  console.log(`${String(n).padStart(2, '0')} ${issues.length ? '✗ ' + issues.join('\n   ') : '✓'}`)
}

const cells = targets.map((n) => `<figure><img src="${String(n).padStart(2, '0')}.png"><figcaption>${n}</figcaption></figure>`).join('')
writeFileSync(`${out}/sheet.html`, `<!doctype html><style>body{margin:0;background:#222;display:grid;grid-template-columns:repeat(3,1fr);gap:12px;padding:12px}img{width:100%;display:block}figure{margin:0}figcaption{color:#aaa;font:12px monospace;padding:2px}</style>${cells}`)
writeFileSync(`${out}/report.json`, JSON.stringify(report, null, 2))
await browser.close()
process.exit(ruleBreaks.length || report.some((r) => r.issues.length) ? 1 : 0)
