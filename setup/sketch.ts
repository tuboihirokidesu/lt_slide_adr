// 枠線を手描きの線に描き直す。
// 部品は普通の CSS の border を書くだけでよい。ここで計算済みの border を読み、rough.js（Excalidraw の描画エンジン）で
// 同じ色・太さ・角丸・破線の線を描いて border-image に差し込む。border の値そのものは変えないので、
// 色が状態で変わっても読み直せるし、画像が読めない環境では元の直線の枠がそのまま出る。
import rough from 'roughjs'

const gen = rough.generator()
const PAD = 4 // 線の揺れが枠の外へはみ出す分
const sketched = new WeakMap<HTMLElement, string>()
const sizes = new ResizeObserver((entries) => {
  for (const e of entries) draw(e.target as HTMLElement)
})

type Side = { w: number; style: string; color: string }

const visible = (s: Side) => s.w >= 0.5 && s.style !== 'none' && s.style !== 'hidden' && !/rgba\([^)]*,\s*0\)|transparent/.test(s.color)

// 同じ要素は毎回同じ揺れ方にする（撮影や書き出しで線が変わらないように）
const seedOf = (key: string) => {
  let h = 2166136261
  for (let i = 0; i < key.length; i++) h = Math.imul(h ^ key.charCodeAt(i), 16777619)
  return (h >>> 0) % 2147483646 + 1
}

const roundedRect = (x: number, y: number, w: number, h: number, r: number) => {
  r = Math.max(0, Math.min(r, w / 2, h / 2))
  if (r < 1) return `M${x} ${y}H${x + w}V${y + h}H${x}Z`
  return `M${x + r} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}V${y + h - r}Q${x + w} ${y + h} ${x + w - r} ${y + h}H${x + r}Q${x} ${y + h} ${x} ${y + h - r}V${y + r}Q${x} ${y} ${x + r} ${y}Z`
}

const dashOf = (s: Side) => (s.style === 'dashed' ? [Math.max(4, s.w * 3.5), Math.max(3, s.w * 2.5)] : s.style === 'dotted' ? [1, Math.max(3, s.w * 2.5)] : undefined)

const optsOf = (s: Side, seed: number, long: number) => ({
  stroke: s.color,
  // 細い罫線は投影で消えるので、手描きの線は少しだけ太らせる
  strokeWidth: Math.max(s.w * 1.15, 1.5),
  // 長い線ほど揺れが目立つので、長さで揺れを抑える
  roughness: long > 600 ? 0.6 : long > 240 ? 0.85 : 1,
  bowing: 1,
  seed,
  strokeLineDash: dashOf(s),
  disableMultiStroke: s.style !== 'solid' || s.w < 1.5,
  preserveVertices: true,
})

const toSvg = (w: number, h: number, paths: { d: string; stroke: string; strokeWidth: number }[]) => {
  const body = paths
    .map((p) => `<path d="${p.d}" fill="none" stroke="${p.stroke}" stroke-width="${p.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>`)
    .join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`
}

function draw(el: HTMLElement) {
  if (!el.isConnected) return
  const cs = getComputedStyle(el)
  const sides: Side[] = (['Top', 'Right', 'Bottom', 'Left'] as const).map((k) => ({
    w: parseFloat(cs.getPropertyValue(`border-${k.toLowerCase()}-width`)),
    style: cs.getPropertyValue(`border-${k.toLowerCase()}-style`),
    color: cs.getPropertyValue(`border-${k.toLowerCase()}-color`),
  }))
  const w = el.offsetWidth
  const h = el.offsetHeight
  const on = sides.map(visible)
  const key = `${w}x${h}|${sides.map((s, i) => (on[i] ? `${s.w}${s.style}${s.color}` : '-')).join('|')}|${cs.borderTopLeftRadius}`
  if (sketched.get(el) === key) return
  sketched.set(el, key)
  if (!on.some(Boolean) || w === 0 || h === 0) {
    el.style.removeProperty('border-image')
    return
  }

  const seed = seedOf(`${el.className}|${(el.textContent ?? '').slice(0, 40)}|${w}x${h}`)
  const W = w + PAD * 2
  const H = h + PAD * 2
  const paths: { d: string; stroke: string; strokeWidth: number }[] = []
  const add = (d: ReturnType<typeof gen.line>) => paths.push(...gen.toPaths(d))
  const same = on.every(Boolean) && sides.every((s) => s.color === sides[0].color && s.style === sides[0].style && s.w === sides[0].w)

  if (same) {
    const s = sides[0]
    const r = parseFloat(cs.borderTopLeftRadius) || 0
    const inset = s.w / 2
    add(gen.path(roundedRect(PAD + inset, PAD + inset, w - s.w, h - s.w, r), optsOf(s, seed, Math.max(w, h))))
  } else {
    // 片側だけの罫線（表の区切り、引用の縦線）は、辺ごとに1本の線で描く
    const [t, rt, b, l] = sides
    if (on[0]) add(gen.line(PAD, PAD + t.w / 2, PAD + w, PAD + t.w / 2, optsOf(t, seed, w)))
    if (on[1]) add(gen.line(PAD + w - rt.w / 2, PAD, PAD + w - rt.w / 2, PAD + h, optsOf(rt, seed + 1, h)))
    if (on[2]) add(gen.line(PAD, PAD + h - b.w / 2, PAD + w, PAD + h - b.w / 2, optsOf(b, seed + 2, w)))
    if (on[3]) add(gen.line(PAD + l.w / 2, PAD, PAD + l.w / 2, PAD + h, optsOf(l, seed + 3, h)))
  }

  const url = `url("data:image/svg+xml,${encodeURIComponent(toSvg(W, H, paths))}")`
  // slice 0 + fill で、画像を枠の外側 PAD まで広げて1枚で貼る。border の幅と色は元のまま残る
  el.style.setProperty('border-image', `${url} 0 fill / 0 / ${PAD}px stretch`)
}

const scan = (root: ParentNode) => {
  for (const el of root.querySelectorAll<HTMLElement>('.slidev-layout *')) {
    if (el.closest('svg, pre, .sk-off')) continue
    if (!sketched.has(el)) {
      const cs = getComputedStyle(el)
      if (cs.display === 'inline' || cs.display === 'contents') continue
      const any = ['top', 'right', 'bottom', 'left'].some((k) => parseFloat(cs.getPropertyValue(`border-${k}-width`)) >= 0.5 && cs.getPropertyValue(`border-${k}-style`) !== 'none')
      if (!any) continue
      sizes.observe(el)
    }
    draw(el)
  }
}

let queued = false
const schedule = () => {
  if (queued) return
  queued = true
  requestAnimationFrame(() => {
    queued = false
    scan(document)
  })
}

export function startSketch() {
  if (typeof window === 'undefined' || (window as any).__sketch) return
  ;(window as any).__sketch = true
  new MutationObserver(schedule).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['class'] })
  document.fonts?.ready.then(schedule)
  schedule()
}
