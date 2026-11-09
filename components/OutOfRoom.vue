<script setup lang="ts">
// MTG で人間だけが決め、その場にいないエージェントには決定が届かない。
// 会議はななめ上から見た机と、手前に座る人で描く。人は顔や手足を持たない駒の形にとどめる。
// ホワイトボードには決定だけが残り、理由は口で話されるだけ（＝その場にいた人の頭の中にしかない）
import rough from 'roughjs'

const props = withDefaults(defineProps<{ stage?: number }>(), { stage: 0 })
const at = (n: number) => props.stage >= n

const gen = rough.generator()
const base = { roughness: 1.1, bowing: 0.8, strokeWidth: 1.6, preserveVertices: true }
const strokes = (d: ReturnType<typeof gen.path>) => gen.toPaths(d).map((p) => p.d)
const round = (x: number, y: number, w: number, h: number, r: number) =>
  `M${x + r} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}V${y + h - r}Q${x + w} ${y + h} ${x + w - r} ${y + h}H${x + r}Q${x} ${y + h} ${x} ${y + h - r}V${y + r}Q${x} ${y} ${x + r} ${y}Z`
const oval = (cx: number, cy: number, rx: number, ry: number) => `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${rx * 2} 0a${rx} ${ry} 0 1 0 ${-rx * 2} 0Z`

// 描く順に積む。塗りの上に手描きの線を重ねる
type Layer = { d: string; cls: string }
const layers: Layer[] = []
let seed = 1
const ink = (d: string, o: object = {}, cls = 'oor__ink') =>
  strokes(gen.path(d, { ...base, seed: seed++, ...o })).forEach((p) => layers.push({ d: p, cls }))
const shape = (d: string, o: object = {}, fillCls = 'oor__fill', inkCls = 'oor__ink') => {
  layers.push({ d, cls: fillCls })
  ink(d, o, inkCls)
}
// 駒の形の人を後ろから見る。肩の丸い胴と頭だけ。頭を少し横へずらすと、そちらを向いて見える
const pawn = (x: number, y: number, r: number, turn = 0) => {
  const w = r * 1.75
  shape(`M${x - w} ${y + r * 4}C${x - w} ${y + r * 2} ${x - w * 0.6} ${y + r} ${x} ${y + r}C${x + w * 0.6} ${y + r} ${x + w} ${y + r * 2} ${x + w} ${y + r * 4}Z`, { roughness: 0.7 }, 'oor__fill oor__fill--body')
  shape(oval(x + turn, y, r, r), { roughness: 0.5 }, 'oor__fill oor__fill--body')
}

// ---- 机の左奥に立つホワイトボード。決定だけが書いてある。左の脚は机の外で床に着く ----
ink('M18 112L14 210M194 112L198 170', { roughness: 0.5 }, 'oor__ink oor__ink--soft')
ink('M8 114H204', { roughness: 0.5, strokeWidth: 2 }, 'oor__ink oor__ink--soft')

// ---- 机。奥の縁から手前へ広がる天板と、手前の厚み ----
shape('M80 158H272L312 240H40Z', { roughness: 0.7 }, 'oor__fill oor__fill--table', 'oor__ink oor__ink--soft')
shape('M40 240H312V250H40Z', { roughness: 0.5 }, 'oor__fill oor__fill--chair', 'oor__ink oor__ink--soft')
ink('M52 250V292M300 250V292', { roughness: 0.5 }, 'oor__ink oor__ink--soft')
// 机の上の書類とマグカップ
shape('M120 196L152 192L156 206L123 210Z', { roughness: 0.5, strokeWidth: 1.2 }, 'oor__fill', 'oor__ink oor__ink--soft')
shape(oval(102, 180, 7, 4.5), { roughness: 0.4, strokeWidth: 1.3 }, 'oor__fill', 'oor__ink oor__ink--soft')

// ---- 手前に座る3人。右の人が理由を話し、ほかの2人はそちらへ顔を向けている。椅子の背が胴の下を隠す ----
for (const [x, turn] of [[94, 3], [172, 3], [256, 0]]) {
  pawn(x, 224, 15, turn)
  shape(round(x - 30, 262, 60, 28, 8), { roughness: 0.6 }, 'oor__fill oor__fill--chair', 'oor__ink oor__ink--soft')
}
// 話している人の吹き出しの尻尾
shape('M246 182L254 206L262 182', { roughness: 0.4, strokeWidth: 1.4 }, 'oor__fill oor__fill--chair', 'oor__ink oor__ink--faint')

// ---- エージェント。端末のような四角い頭に、目が2つとアンテナ ----
const BX = 508
ink(`M${BX - 56} 134H${BX + 56}`, { roughness: 0.7 }, 'oor__ink oor__ink--soft')
shape(round(BX - 20, 110, 40, 24, 8), { roughness: 0.8 })
ink(`M${BX} 58V45`, { roughness: 0.6 })
shape(oval(BX, 41, 4, 4), { roughness: 0.35 })
shape(round(BX - 30, 58, 60, 46, 12), { roughness: 0.9 })
layers.push({ d: oval(BX - 9, 80, 2.6, 3.6), cls: 'oor__eye' }, { d: oval(BX + 9, 80, 2.6, 3.6), cls: 'oor__eye' })
ink(`M${BX - 5} 94H${BX + 5}`, { roughness: 0.3, strokeWidth: 1.8 })
</script>

<template>
  <div class="oor">
    <div class="oor__scene">
      <span class="fx-caption oor__cap oor__cap--room">MTG（人間だけ）</span>

      <svg class="oor__art" viewBox="0 0 624 316" width="624" height="316" aria-hidden="true">
        <path v-for="(l, j) in layers" :key="j" :class="l.cls" :d="l.d" />
        <!-- 吹き出しの尻尾 -->
        <path class="oor__tail fx-enter" :class="{ 'is-on': at(1) }" d="M500 153 L508 141 L516 153" />
      </svg>

      <div class="oor__board fx-paper">
        <span class="fx-caption">決まったこと</span>
        <p class="oor__decision">キャッシュ層は入れない</p>
      </div>
      <p class="oor__talk">整合性の事故が怖いから</p>

      <span class="oor__huh" aria-hidden="true">?</span>
      <span class="fx-caption oor__cap oor__cap--bot">エージェント（その場にいない）</span>

      <p class="oor__say oor__say--bot fx-enter" :class="{ 'is-on': at(1) }">キャッシュ層を足しましょう。</p>
      <!-- 次のセッションでも、また同じことを伝え直す -->
      <span v-for="i in [2, 1]" :key="`echo-${i}`" class="oor__echo fx-enter" :class="{ 'is-on': at(3) }" :style="{ '--i': i, '--d': `${(2 - i) * 140 + 120}ms` }" aria-hidden="true" />
      <p class="oor__say oor__say--you fx-enter" :class="{ 'is-on': at(2) }" style="--d: 450ms">それ、MTG で却下した。</p>

      <svg class="oor__edges" viewBox="0 0 624 316" width="624" height="316" aria-hidden="true">
        <Edge d="M280 242 C330 236 350 234 384 234" :end="[386, 234]" dir="r" tone="caution" :on="at(2)" />
      </svg>
      <span class="fx-label fx-label--caution oor__again" :class="{ 'is-on': at(3) }" style="--d: 300ms">毎回、人間が伝え直す</span>
    </div>

    <figure class="oor__quote fx-enter" :class="{ 'is-on': at(3) }" style="--d: 500ms">
      <blockquote class="fx-quote">you become<br>the memory</blockquote>
      <figcaption class="fx-cite"><Ref id="kent" /></figcaption>
      <p>決めた理由は、その場にいた人の頭の中にしかない。</p>
    </figure>
  </div>
</template>

<style scoped>
.oor {
  display: grid;
  grid-template-columns: 624px 1fr;
  gap: 36px;
  align-items: center;
}
.oor__scene {
  position: relative;
  height: 316px;
}
.oor__scene > * {
  position: absolute;
  margin: 0;
}
.oor__cap { top: 0; }
.oor__cap--room { left: 0; }
.oor__cap--bot { left: 392px; }

/* 決定は、机の左奥のホワイトボードに書いてある */
.oor__board {
  left: 0;
  top: 34px;
  width: 212px;
  height: 76px;
  padding: 10px 16px 12px;
}
.oor__board p { margin: 0; }
.oor__decision {
  margin-top: 4px !important;
  font-size: var(--fs-body);
  color: var(--tone-caution-ink);
}
/* 理由は書かれず、口で話されるだけ */
.oor__talk {
  left: 164px;
  top: 148px;
  white-space: nowrap;
  box-sizing: border-box;
  padding: 8px 12px;
  border: var(--w-hair) solid var(--line);
  border-radius: var(--r-chip);
  background: var(--label-bg);
  font-size: var(--fs-note);
  line-height: 1.5;
  text-align: center;
  color: var(--ink-2);
}

.oor__art,
.oor__edges {
  inset: 0;
  overflow: visible;
}
/* 人とエージェントは rough.js で手描き済みなので、揺れのフィルターを重ねない */
.slidev-layout .oor__art { filter: none; }
.oor__ink {
  fill: none;
  stroke: var(--ink-2);
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.oor__ink--soft { stroke: var(--line-strong); }
.oor__ink--faint { stroke: var(--line); }
.oor__fill { fill: var(--paper); stroke: none; }
.oor__fill--table { fill: var(--surface); }
.oor__fill--chair { fill: var(--label-bg); }
.oor__fill--body { fill: var(--line); }
.oor__eye { fill: var(--ink-2); }
/* 伝え直した吹き出しの後ろに重なる札。何度も同じことを言った跡 */
.oor__echo {
  left: 392px;
  top: 214px;
  width: 232px;
  height: 41px;
  box-sizing: border-box;
  border: var(--w-hair) solid var(--tone-caution-glint);
  border-radius: var(--r-chip);
  background: var(--tone-caution-fill);
}
.oor__echo.is-on {
  transform: translate(calc(var(--i) * 7px), calc(var(--i) * -7px));
}
.oor__tail {
  fill: var(--label-bg);
  stroke: var(--line);
  stroke-width: 1.5;
  stroke-linejoin: round;
}

.oor__huh {
  left: 552px;
  top: 32px;
  font-size: var(--fs-title);
  font-weight: 700;
  line-height: 1;
  color: var(--line-strong);
  transform: rotate(10deg);
}

.oor__say {
  left: 392px;
  width: 232px;
  box-sizing: border-box;
  padding: 9px 12px;
  border-radius: var(--r-chip);
  font-size: var(--fs-note);
  line-height: 1.5;
  text-align: center;
}
.oor__say--bot {
  top: 152px;
  background: var(--label-bg);
  border: var(--w-hair) solid var(--line);
}
.oor__say--you {
  top: 214px;
  background: var(--tone-caution-fill);
  border: var(--w-hair) solid var(--tone-caution);
  color: var(--tone-caution-ink);
}
.oor__again {
  left: 400px;
  top: 270px;
}

.oor__quote {
  margin: 0;
  padding-left: 22px;
  border-left: 2px solid var(--tone-source);
}
.oor__quote .fx-quote {
  font-size: var(--fs-title);
  line-height: 1.25;
}
.oor__quote p {
  margin: 18px 0 0;
  font-size: var(--fs-note);
  line-height: 1.7;
  color: var(--ink-2);
}
</style>
