<script setup lang="ts">
const sections = [
  { h: '背景と目標', bars: [88] },
  { h: '案の比較', bars: [92, 64] },
  { h: '結論', bars: [76], hit: true },
  { h: '詳細設計', bars: [84] },
]
</script>

<template>
  <div class="tl">
    <div class="tl__stage">
      <svg class="tl__edges" viewBox="0 0 860 320" width="860" height="320" aria-hidden="true">
        <Edge d="M300 207 C 420 207, 460 168, 554 168" :end="[554, 168]" dir="r" tone="amber" dashed />
        <Edge d="M0 304 H856" :end="[856, 304]" dir="r" />
      </svg>
      <span class="fx-label is-on fx-label--amber tl__cut">結論を切り出す</span>

      <div class="tl__decision" aria-hidden="true"><span>決定</span></div>
      <span class="tl__axis">時間</span>

      <div class="tl__side tl__side--dd">
        <p class="tl__dir"><strong>Design Doc</strong><span>前向き。これから作るものを議論する。</span></p>
        <div class="fx-paper tl__dd">
          <div class="fx-paper__head"><span>design-doc.md</span><span>数ページ</span></div>
          <div class="fx-paper__body">
            <div v-for="s in sections" :key="s.h" class="tl__sec" :class="{ 'is-hit': s.hit }">
              <p class="fx-paper__h">{{ s.h }}</p>
              <i v-for="(w, j) in s.bars" :key="j" :style="{ width: `${w}%` }" />
            </div>
          </div>
        </div>
      </div>

      <div class="tl__side tl__side--adr">
        <p class="tl__dir"><strong>ADR</strong><span>後ろ向き。決まったことを短く固定する。</span></p>
        <AdrPaper class="tl__adr" no="0005" file="0005-no-cache-layer.md" title="独自のキャッシュ層を作らない。" status="accepted">
          <p class="fx-paper__h">Considered options</p>
          <p class="tl__opt"><span class="fx-no">Redis を前段に置く</span></p>
          <p class="fx-paper__h">Revisit if</p>
          <p class="fx-revisit tl__revisit">p95 が 800ms を超えたら</p>
        </AdrPaper>
      </div>
    </div>
    <p class="tl__note">LayerX も Design Doc と ADR の2本立て。不正検知システムでは、3日で Design Doc 2本と ADR 5本を書いた。</p>
  </div>
</template>

<style scoped>
.tl__stage {
  position: relative;
  width: 860px;
  height: 320px;
}
.tl__edges {
  position: absolute;
  inset: 0;
  overflow: visible;
  z-index: 2;
}
.tl__cut {
  left: 316px;
  top: 214px;
  z-index: 3;
}
.tl__decision {
  position: absolute;
  left: 429px;
  top: 22px;
  bottom: 16px;
  border-left: 1.5px dashed var(--line-strong);
}
.tl__decision span {
  position: absolute;
  top: -22px;
  left: 0;
  transform: translateX(-50%);
  padding: 0 8px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--ink-2);
}
.tl__axis {
  position: absolute;
  right: 0;
  top: 312px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--muted);
}
.tl__side {
  position: absolute;
  top: 0;
}
.tl__side--dd {
  left: 0;
  width: 300px;
}
.tl__side--adr {
  left: 556px;
  width: 304px;
}
.tl__dir {
  margin: 0 0 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.tl__dir strong {
  font-size: 18px;
  font-weight: 700;
}
.tl__dir span {
  font-size: 13.5px;
  color: var(--ink-2);
}
.tl__side--adr .tl__dir strong {
  color: var(--teal-ink);
}
.tl__dd .fx-paper__body {
  padding-top: 4px;
  padding-bottom: 10px;
}
.tl__sec .fx-paper__h {
  margin: 6px 0 4px;
}
.tl__sec i {
  display: block;
  height: 5px;
  margin-top: 4px;
  border-radius: 3px;
  background: var(--line);
}
.tl__sec.is-hit {
  margin: 4px -8px 0;
  padding: 0 8px 6px;
  border-radius: var(--r-mark);
  border: 1.5px dashed var(--amber);
}
.tl__sec.is-hit i {
  background: color-mix(in srgb, var(--amber) 45%, transparent);
}
.tl__opt {
  margin: 0;
  font-size: 13px;
}
.tl__revisit {
  margin: 0;
  padding: 3px 10px;
  font-size: 12px;
  color: var(--ink-2);
}
.tl__note {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 18px 0 0;
  font-size: 13.5px;
  color: var(--ink-2);
}
</style>
