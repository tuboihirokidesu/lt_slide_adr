<script setup lang="ts">
import type { Inline } from '../data/sources'

const circles = [
  { cx: 128, cy: 120, label: '戻しにくい', sub: ['後で変える', 'コストが大きい'], lx: 92, ly: 96 },
  { cx: 270, cy: 120, label: '文脈がないと驚く', sub: ['後から読んだ人が', '「なぜ？」と思う'], lx: 306, ly: 96 },
  { cx: 199, cy: 243, label: '本当のトレードオフ', sub: ['実在する代替案から', '理由をもって選んだ'], lx: 199, ly: 282 },
]
const R = 110

const picks: { head: string; src: Inline[]; body: string; example?: string; tags?: string[] }[] = [
  {
    head: 'エージェントが再提案しそうな No',
    src: [{ ref: 'kent' }],
    body: '一般論として妥当なのに、うちでは捨てた案。',
    example: 'Redis を前段に置く',
  },
  {
    head: '標準からの意図的な逸脱',
    src: [{ ref: 'layerx' }, '、', { ref: 'pocock' }],
    body: '放置すると、誰か（あるいはエージェント）が「直して」しまう。',
    tags: ['標準外の Python・DynamoDB', 'ORM ではなく生 SQL'],
  },
]
</script>

<template>
  <div class="three">
    <figure class="three__venn">
      <svg viewBox="0 0 398 356" width="398" height="356" role="img" aria-label="3つの条件がすべて重なるところで ADR を書く">
        <g class="three__sets">
          <circle v-for="c in circles" :key="c.label" :cx="c.cx" :cy="c.cy" :r="R" class="three__circle" />
        </g>
        <g class="three__labels">
          <g v-for="c in circles" :key="`t-${c.label}`" class="three__text">
            <text :x="c.lx" :y="c.ly" class="three__label">{{ c.label }}</text>
            <text v-for="(s, i) in c.sub" :key="s" :x="c.lx" :y="c.ly + 22 + i * 19" class="three__sub">{{ s }}</text>
          </g>
        </g>
        <text x="199" y="178" class="three__core">書く</text>
      </svg>
      <figcaption>3つを<b>すべて</b>満たすときだけ書く。<br>基準は <Ref id="pocock" /> の <span class="nowrap">grill-with-docs</span>。</figcaption>
    </figure>

    <div class="three__picks">
      <p class="three__lead">とくに条件を満たしやすい2つは、積極的に書く。</p>
      <div v-for="p in picks" :key="p.head" class="fx-box three__pick">
        <div class="three__head"><strong>{{ p.head }}</strong><span><RefText :text="p.src" /></span></div>
        <p>{{ p.body }}</p>
        <p v-if="p.example" class="three__eg"><span class="fx-label-mono">例</span><span class="fx-no">{{ p.example }}</span></p>
        <p v-if="p.tags" class="three__eg"><span class="fx-label-mono">例</span><span class="three__tags"><span v-for="t in p.tags" :key="t" class="fx-tag fx-tag--muted">{{ t }}</span></span></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.three {
  display: grid;
  grid-template-columns: 398px 1fr;
  gap: 32px;
  align-items: center;
}
.three__venn {
  margin: 0;
}
.three__venn svg {
  display: block;
  overflow: visible;
}
.three__circle {
  fill: var(--tone-recommend);
  fill-opacity: 0.08;
  stroke: var(--tone-recommend-line);
  stroke-width: var(--w-hair);
}
.three__text text {
  text-anchor: middle;
  font-family: var(--font-sans);
}
.three__label {
  font-size: var(--fs-body);
  font-weight: 700;
  fill: var(--ink);
}
.three__sub {
  font-size: var(--fs-note);
  font-weight: 500;
  fill: var(--muted);
}
.three__core {
  text-anchor: middle;
  font-family: var(--font-sans);
  font-size: var(--fs-body);
  font-weight: 800;
  fill: var(--tone-recommend-ink);
}
.three__venn figcaption {
  margin-top: 6px;
  font-size: var(--fs-note);
  line-height: 1.6;
  color: var(--muted);
}
.three__venn figcaption b {
  color: var(--tone-recommend-ink);
}
.three__picks {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.three__lead {
  margin: 0 0 2px;
  font-size: var(--fs-body);
  font-weight: 700;
}
.three__pick {
  padding: 14px 18px;
}
.three__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}
.three__head strong {
  font-size: var(--fs-body);
  font-weight: 700;
}
.three__head span {
  font-size: var(--fs-note);
  font-weight: 600;
  color: var(--tone-source-ink);
  white-space: nowrap;
}
.three__pick p {
  margin: 4px 0 0;
  font-size: var(--fs-note);
  line-height: 1.6;
  color: var(--ink-2);
}
.three__pick .three__eg {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-top: 8px;
}
.three__eg .fx-label-mono {
  margin-right: 2px;
}
.three__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
