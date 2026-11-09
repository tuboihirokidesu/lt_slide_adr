<script setup lang="ts">
// MTG で人間だけが決め、その場にいないエージェントには決定が届かない。人と机とエージェントは rough.js で描く
import rough from 'roughjs'

const props = withDefaults(defineProps<{ stage?: number }>(), { stage: 0 })
const at = (n: number) => props.stage >= n

const gen = rough.generator()
const base = { roughness: 1.1, bowing: 0.8, strokeWidth: 1.6, preserveVertices: true }
const strokes = (d: ReturnType<typeof gen.path>) => gen.toPaths(d).map((p) => p.d)
const sketch = (d: string, seed: number, o = {}) => strokes(gen.path(d, { ...base, seed, ...o }))
const ring = (cx: number, cy: number, r: number, seed: number) => strokes(gen.circle(cx, cy, r * 2, { ...base, seed }))
const round = (x: number, y: number, w: number, h: number, r: number) =>
  `M${x + r} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}V${y + h - r}Q${x + w} ${y + h} ${x + w - r} ${y + h}H${x + r}Q${x} ${y + h} ${x} ${y + h - r}V${y + r}Q${x} ${y} ${x + r} ${y}Z`

// 机の向こうに座る3人。頭と肩だけで描き、机の天板が胸から下を隠す
const people = [80, 156, 232].map((cx, i) => {
  const cy = 184 + (i === 1 ? -4 : 0)
  const shoulders = `M${cx - 30} ${cy + 58} C${cx - 29} ${cy + 30} ${cx - 16} ${cy + 22} ${cx} ${cy + 22} C${cx + 16} ${cy + 22} ${cx + 29} ${cy + 30} ${cx + 30} ${cy + 58}`
  return {
    cx,
    cy,
    head: ring(cx, cy, 15, 11 + i),
    body: sketch(shoulders, 21 + i, { roughness: 0.9 }),
    bodyFill: `${shoulders}Z`,
  }
})
const table = {
  fill: round(24, 232, 284, 22, 4),
  top: sketch(round(24, 232, 284, 22, 4), 31, { roughness: 0.7 }),
  legs: sketch('M48 254 V300 M284 254 V300', 32, { roughness: 0.6 }),
  // 机の上の書類2枚
  papers: sketch('M64 238 L100 236 L101 248 M172 237 L214 238 L213 249', 33, { roughness: 0.6, strokeWidth: 1.2 }),
}
// 閉じたドア。机の向こうの壁にある
const door = {
  fill: round(264, 60, 70, 172, 3),
  frame: sketch(round(264, 60, 70, 172, 3), 35, { roughness: 0.7 }),
  knob: ring(322, 150, 3.5, 36),
  // 札を掛けたひも
  cord: sketch('M299 74 L282 90 M299 74 L316 90', 37, { roughness: 0.4, strokeWidth: 1.2 }),
}

// エージェント。端末のような四角い頭に、目が2つとアンテナ
// 目は少し左、会議室のほうを見ている
const BX = 508
const bot = {
  headFill: round(BX - 30, 58, 60, 46, 12),
  head: sketch(round(BX - 30, 58, 60, 46, 12), 41, { roughness: 0.9 }),
  antenna: sketch(`M${BX} 58 V44`, 42, { roughness: 0.6 }),
  knob: ring(BX, 40, 4, 43),
  face: sketch(`M${BX - 16} 76 V84 M${BX + 8} 76 V84 M${BX - 11} 93 Q${BX - 4} 97 ${BX + 3} 93`, 44, { roughness: 0.5, strokeWidth: 1.8 }),
  bodyFill: round(BX - 20, 110, 40, 24, 8),
  body: sketch(round(BX - 20, 110, 40, 24, 8), 45, { roughness: 0.8 }),
  desk: sketch(`M${BX - 56} 134 H${BX + 56}`, 46, { roughness: 0.7 }),
}
</script>

<template>
  <div class="oor">
    <div class="oor__scene">
      <span class="fx-caption oor__cap oor__cap--room">MTG（人間だけ）</span>

      <div class="oor__room" />

      <div class="oor__board fx-paper">
        <span class="fx-caption">ホワイトボード</span>
        <p class="oor__decision">キャッシュ層は入れない</p>
        <p class="oor__why">整合性の事故が怖いから</p>
      </div>

      <svg class="oor__art" viewBox="0 0 624 316" width="624" height="316" aria-hidden="true">
        <path class="oor__fill oor__fill--door" :d="door.fill" />
        <path v-for="(d, j) in [...door.frame, ...door.knob, ...door.cord]" :key="`d${j}`" class="oor__ink oor__ink--soft" :d="d" />
        <g class="oor__people">
          <g v-for="p in people" :key="p.cx">
            <path class="oor__fill" :d="p.bodyFill" />
            <path v-for="(d, j) in p.body" :key="`b${j}`" class="oor__ink" :d="d" />
            <circle class="oor__fill" :cx="p.cx" :cy="p.cy" r="15" />
            <path v-for="(d, j) in p.head" :key="`h${j}`" class="oor__ink" :d="d" />
          </g>
        </g>
        <path class="oor__fill" :d="table.fill" />
        <path v-for="(d, j) in [...table.top, ...table.legs]" :key="`t${j}`" class="oor__ink oor__ink--soft" :d="d" />
        <path v-for="(d, j) in table.papers" :key="`p${j}`" class="oor__ink oor__ink--soft" :d="d" />

        <g class="oor__bot">
          <path class="oor__fill" :d="bot.bodyFill" />
          <path v-for="(d, j) in bot.body" :key="`bb${j}`" class="oor__ink" :d="d" />
          <path v-for="(d, j) in bot.antenna" :key="`ba${j}`" class="oor__ink" :d="d" />
          <path v-for="(d, j) in bot.knob" :key="`bk${j}`" class="oor__ink" :d="d" />
          <path class="oor__fill" :d="bot.headFill" />
          <path v-for="(d, j) in bot.head" :key="`bh${j}`" class="oor__ink" :d="d" />
          <path v-for="(d, j) in bot.face" :key="`bf${j}`" class="oor__ink" :d="d" />
          <path v-for="(d, j) in bot.desk" :key="`bd${j}`" class="oor__ink oor__ink--soft" :d="d" />
        </g>

        <!-- 吹き出しの尻尾 -->
        <path class="oor__tail fx-enter" :class="{ 'is-on': at(1) }" d="M500 153 L508 141 L516 153" />
      </svg>

      <span class="oor__sign">会議中</span>
      <span class="oor__huh" aria-hidden="true">?</span>
      <span class="fx-caption oor__cap oor__cap--bot">エージェント（その場にいない）</span>

      <p class="oor__say oor__say--bot fx-enter" :class="{ 'is-on': at(1) }">キャッシュ層を足しましょう。</p>
      <!-- 次のセッションでも、また同じことを伝え直す -->
      <span v-for="i in [2, 1]" :key="`echo-${i}`" class="oor__echo fx-enter" :class="{ 'is-on': at(3) }" :style="{ '--i': i, '--d': `${(2 - i) * 140 + 120}ms` }" aria-hidden="true" />
      <p class="oor__say oor__say--you fx-enter" :class="{ 'is-on': at(2) }" style="--d: 450ms">それ、MTG で却下した。</p>

      <svg class="oor__edges" viewBox="0 0 624 316" width="624" height="316" aria-hidden="true">
        <Edge d="M252 192 C306 192 330 234 384 234" :end="[386, 234]" dir="r" tone="caution" :on="at(2)" />
      </svg>
      <span class="fx-label fx-label--caution oor__again" :class="{ 'is-on': at(3) }" style="--d: 300ms">毎回、人間が伝え直す</span>
    </div>

    <figure class="oor__quote fx-enter" :class="{ 'is-on': at(3) }" style="--d: 500ms">
      <blockquote class="fx-quote">now you are<br>the memory</blockquote>
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

/* 会議室の壁。決定はこの線の内側に残る */
.oor__room {
  left: 0;
  top: 26px;
  width: 352px;
  height: 290px;
  box-sizing: border-box;
  border: var(--w-em) solid var(--line-strong);
  border-radius: var(--r-box);
  background: var(--legacy-fill);
}
.oor__board {
  left: 22px;
  top: 46px;
  width: 228px;
  padding: 10px 16px 12px;
}
.oor__board p { margin: 0; }
.oor__decision {
  margin-top: 4px !important;
  font-size: var(--fs-body);
  color: var(--tone-caution-ink);
}
.oor__why {
  font-size: var(--fs-note);
  color: var(--muted);
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
.oor__fill { fill: var(--paper); }
.oor__fill--door { fill: var(--label-bg); }
/* ドアに掛けた札 */
.oor__sign {
  left: 273px;
  top: 88px;
  width: 52px;
  box-sizing: border-box;
  padding: 1px 0;
  border: var(--w-hair) solid var(--line-strong);
  border-radius: var(--r-mark);
  background: var(--paper);
  font-size: var(--fs-note);
  line-height: 1.5;
  text-align: center;
  color: var(--ink-2);
}
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
