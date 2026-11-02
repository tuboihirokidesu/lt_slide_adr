<script setup lang="ts">
const crammed = [86, 72, 94, 60, 80, 90, 54, 76, 88, 66, 92, 58]

const CARD = 196
const STEP_X = 219
const STEP_Y = 64
const steps = [
  { label: 'Step 1', note: '毎回読む。中身は索引への1行だけ。' },
  { label: 'Step 2', note: '必要なときに開く。現役の一覧。' },
  { label: 'Step 3', note: '該当する1本だけを読む。' },
]
const pos = (i: number) => ({ left: `${i * STEP_X}px`, top: `${i * STEP_Y}px` })
const indexRows = [
  { no: '0003', title: 'GraphQL にしない' },
  { no: '0004', title: 'ORM を入れない' },
  { no: '0005', title: 'キャッシュ層を作らない', hit: true },
  { no: '0006', title: 'キューを自作しない' },
]
</script>

<template>
  <div class="disc">
    <div class="disc__bad">
      <div class="fx-paper disc__crammed" aria-hidden="true">
        <div class="fx-paper__head"><span>AGENTS.md</span><span>全部入り</span></div>
        <div class="disc__lines">
          <i v-for="(w, i) in crammed" :key="i" :style="{ width: `${w}%` }" />
        </div>
        <svg class="disc__x" viewBox="0 0 190 176" width="190" height="176" aria-hidden="true">
          <g class="disc__x-mark">
            <Edge d="M27 24 L163 152" tone="amber" />
            <Edge d="M163 24 L27 152" tone="amber" :delay="120" />
          </g>
        </svg>
      </div>
      <p class="disc__caption"><span class="fx-no">全部 AGENTS.md に書く</span></p>
      <p class="disc__sub">毎回すべてが文脈に載り、エージェントの文脈を圧迫する。</p>
    </div>

    <div class="disc__stair">
      <svg class="disc__edges" viewBox="0 0 634 330" width="634" height="330" aria-hidden="true">
        <Edge :d="`M${CARD} 104 H${STEP_X - 1}`" :end="[STEP_X - 1, 104]" dir="r" tone="teal" />
        <Edge :d="`M${STEP_X + CARD} 170 H${STEP_X * 2 - 1}`" :end="[STEP_X * 2 - 1, 170]" dir="r" tone="teal" />
      </svg>

      <div class="disc__step" :style="pos(0)">
        <div class="fx-paper disc__card">
          <div class="fx-paper__head"><span>AGENTS.md</span></div>
          <div class="disc__code">
            <span class="is-dim">## Commands</span>
            <span class="is-dim">pnpm test</span>
            <span class="is-dim">## Decisions</span>
            <span class="is-hit">docs/adr/index.md</span>
          </div>
        </div>
        <p class="disc__note"><span class="fx-label-mono">{{ steps[0].label }}</span>{{ steps[0].note }}</p>
      </div>

      <div class="disc__step" :style="pos(1)">
        <div class="fx-paper disc__card">
          <div class="fx-paper__head"><span>docs/adr/index.md</span></div>
          <ul class="disc__index">
            <li v-for="r in indexRows" :key="r.no" :class="{ 'is-hit': r.hit }"><b>{{ r.no }}</b>{{ r.title }}</li>
          </ul>
        </div>
        <p class="disc__note"><span class="fx-label-mono">{{ steps[1].label }}</span>{{ steps[1].note }}</p>
      </div>

      <div class="disc__step" :style="pos(2)">
        <AdrPaper class="disc__card" no="0005" file="0005-no-cache-layer.md" title="独自のキャッシュ層を作らない。">
          <p class="fx-paper__h">Revisit if</p>
          <p class="fx-revisit disc__revisit">p95 が 800ms を超えたら</p>
        </AdrPaper>
        <p class="disc__note"><span class="fx-label-mono">{{ steps[2].label }}</span>{{ steps[2].note }}</p>
      </div>

      <figure class="disc__quote">
        <blockquote class="fx-quote">progressively<br>disclosed way</blockquote>
        <figcaption class="fx-cite"><Ref id="kent" /></figcaption>
      </figure>
    </div>
  </div>
</template>

<style scoped>
.disc {
  display: grid;
  grid-template-columns: 190px 1fr;
  gap: 36px;
  align-items: start;
}
.disc__crammed {
  position: relative;
  height: 210px;
  box-shadow: none;
  background: var(--legacy-fill);
}
.disc__lines {
  display: grid;
  gap: 7px;
  padding: 12px 14px;
}
.disc__lines i {
  display: block;
  height: 6px;
  border-radius: 3px;
  background: var(--line);
}
.disc__x {
  position: absolute;
  left: 0;
  top: 34px;
}
.disc__caption {
  margin: 14px 0 0;
  font-size: 13.5px;
  font-weight: 700;
}
.disc__sub {
  margin: 4px 0 0;
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--muted);
}
.disc__stair {
  position: relative;
  width: 634px;
  height: 370px;
}
.disc__edges {
  position: absolute;
  inset: 0;
  overflow: visible;
  z-index: 1;
}
.disc__step {
  position: absolute;
  width: 196px;
}
.disc__code {
  display: grid;
  gap: 2px;
  padding: 10px 14px 12px;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.5;
}
.disc__code .is-dim {
  color: var(--muted);
}
.disc__code .is-hit,
.disc__index .is-hit {
  margin: 2px -6px 0;
  padding: 2px 6px;
  border-radius: var(--r-mark);
  background: var(--teal-fill);
  color: var(--teal-ink);
  font-weight: 700;
}
.disc__code .is-hit {
  font-size: 12px;
}
.disc__index {
  display: grid;
  gap: 3px;
  padding: 10px 14px 12px;
}
.disc__index li {
  display: flex;
  gap: 8px;
  font-size: 12px;
  line-height: 1.55;
  white-space: nowrap;
  color: var(--ink-2);
}
.disc__index b {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  color: var(--muted);
}
.disc__index .is-hit b {
  color: var(--teal-ink);
}
.disc__card :deep(.fx-paper__title) {
  font-size: 13.5px;
}
.disc__card :deep(.fx-paper__body) {
  padding: 10px 14px 12px;
}
.disc__revisit {
  margin: 0;
  padding: 4px 10px;
  font-size: 12px;
  color: var(--ink-2);
}
.disc__note {
  margin: 10px 0 0;
  font-size: 12.5px;
  line-height: 1.55;
  color: var(--ink-2);
}
.disc__note .fx-label-mono {
  margin-bottom: 2px;
  color: var(--teal-ink);
}
.disc__quote {
  position: absolute;
  left: 438px;
  top: 0;
  margin: 0;
  padding-left: 16px;
  border-left: 2px solid var(--ext);
}
.disc__quote .fx-quote {
  font-size: 22px;
  line-height: 1.25;
}
</style>
