// Usage: node scripts/check-links.mjs [manuscript.md]
// Requests every URL in data/sources.ts, prints status and final URL, and lists registry URLs the manuscript does not contain.
import { readFileSync } from 'node:fs'
import { sources } from '../data/sources.ts'

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'

async function probe(url) {
  let last
  for (const method of ['HEAD', 'GET']) {
    try {
      const res = await fetch(url, { method, redirect: 'follow', headers: { 'user-agent': UA }, signal: AbortSignal.timeout(20000) })
      last = { status: res.status, final: res.url }
      if (res.ok) return last
    } catch (e) {
      last = { status: 0, final: '', error: e.cause?.code ?? e.name }
    }
  }
  return last
}

// A redirect is suspicious when it leaves the host, or on GitHub when it lands in another repository.
const identity = (url) => {
  const { host, pathname } = new URL(url)
  const h = host.replace(/^www\./, '')
  return (h === 'github.com' ? `${h}/${pathname.split('/').slice(1, 3).join('/')}` : h).toLowerCase()
}

const entries = Object.entries(sources)
const rows = await Promise.all(entries.filter(([, s]) => s.url).map(async ([id, s]) => {
  const r = await probe(s.url)
  const isX = identity(s.url) === 'x.com'
  let verdict = 'ok'
  let why = ''
  if (r.status < 200 || r.status > 299) {
    verdict = isX ? 'warn' : 'FAIL'
    why = r.error ?? `HTTP ${r.status}`
    if (isX) why += ' (x.com は到達不可でも警告のみ)'
  } else if (identity(r.final) !== identity(s.url)) {
    verdict = 'warn'
    why = `別の場所へ転送: ${r.final}`
  }
  return { id, status: r.status, verdict, why, url: s.url, final: r.final }
}))

for (const [id, s] of entries) {
  if ('partOf' in s && !(s.partOf in sources)) rows.push({ id, status: '-', verdict: 'FAIL', why: `partOf "${s.partOf}" が存在しない`, url: s.url ?? '' })
}

const pad = (v, n) => String(v).padEnd(n)
console.log(`${pad('verdict', 8)}${pad('status', 7)}${pad('id', 16)}url`)
for (const r of rows) {
  const moved = r.final && r.final !== r.url ? `\n${' '.repeat(31)}→ ${r.final}` : ''
  console.log(`${pad(r.verdict, 8)}${pad(r.status, 7)}${pad(r.id, 16)}${r.url}${moved}${r.why ? `\n${' '.repeat(31)}${r.why}` : ''}`)
}
const unlinked = entries.filter(([, s]) => !s.url).map(([id]) => id)
const count = (v) => rows.filter((r) => r.verdict === v).length
console.log(`\n${entries.length} entries, ${rows.length} checked: ${count('ok')} ok, ${count('warn')} warn, ${count('FAIL')} fail. URL なし: ${unlinked.join(', ') || 'none'}`)

if (process.argv[2]) {
  const text = readFileSync(process.argv[2], 'utf8')
  const inManuscript = new Set([...text.matchAll(/https?:\/\/[^\s)）」>]+/g)].map((m) => m[0].replace(/[.,、。]+$/, '')))
  const differs = entries.filter(([, s]) => s.url && !inManuscript.has(s.url))
  console.log(`\n原稿にない URL: ${differs.length}`)
  for (const [id, s] of differs) console.log(`  ${pad(id, 16)}${s.url}`)
}

process.exit(count('FAIL') ? 1 : 0)
