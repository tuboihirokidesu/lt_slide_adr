<script setup lang="ts">
withDefaults(defineProps<{ stage?: number }>(), { stage: 0 })

const steps = [
  { at: 0, who: 'エージェント', what: '草案を書く' },
  { at: 1, who: '人間', what: '捨てた案と理由を直す' },
  { at: 2, who: '人間', what: 'Accepted にする' },
]
</script>

<template>
  <div class="da">
    <div class="da__flow">
      <svg class="da__edges" viewBox="0 0 860 200" width="860" height="200" aria-hidden="true">
        <Edge d="M262 104 H296" :end="[296, 104]" dir="r" :on="stage >= 1" />
        <Edge d="M562 104 H596" :end="[596, 104]" dir="r" tone="teal" :on="stage >= 2" />
      </svg>

      <div v-for="(s, i) in steps" :key="s.what" class="da__step fx-enter" :class="{ 'is-on': stage >= s.at }" >
        <p class="da__who"><span class="fx-label-mono">{{ s.who }}</span>{{ s.what }}</p>

        <AdrPaper v-if="i === 0" class="da__paper" no="0005" file="0005-no-cache-layer.md" status="proposed" title="独自のキャッシュ層を作らない。">
          <p class="fx-paper__h">Considered options</p>
          <p class="da__opt">Redis を前段に置く<em class="is-blank">却下理由: ＿＿＿</em></p>
        </AdrPaper>

        <AdrPaper v-else-if="i === 1" class="da__paper" no="0005" file="0005-no-cache-layer.md" status="proposed" title="独自のキャッシュ層を作らない。">
          <p class="fx-paper__h">Considered options</p>
          <p class="da__opt"><span class="fx-no">Redis を前段に置く</span><em class="is-human">運用できる人がいない</em></p>
        </AdrPaper>

        <AdrPaper v-else class="da__paper is-locked" no="0005" file="0005-no-cache-layer.md" status="accepted" title="独自のキャッシュ層を作らない。">
          <p class="da__lock"><b>CODEOWNERS</b><b>CI</b>エージェントは書き換えない</p>
        </AdrPaper>
      </div>
    </div>

    <div class="da__inv fx-enter" :class="{ 'is-on': stage >= 2 }">
      <span class="fx-label-mono">防ぎたい失敗：抽象の逆転（<Ref id="haandol" />）</span>
      <div class="da__chains">
        <p class="da__chain is-ok">
          <span>要件</span><svg class="da__arr" viewBox="0 0 28 12" width="28" height="12" aria-hidden="true"><Edge d="M1 6 H26" :end="[26, 6]" dir="r" tone="teal" /></svg><span>ADR</span><svg class="da__arr" viewBox="0 0 28 12" width="28" height="12" aria-hidden="true"><Edge d="M1 6 H26" :end="[26, 6]" dir="r" tone="teal" /></svg><span>コード</span>
          <small>正しい権威の向き</small>
        </p>
        <p class="da__chain is-bad">
          <span>コード</span><svg class="da__arr" viewBox="0 0 28 12" width="28" height="12" aria-hidden="true"><Edge d="M1 6 H26" :end="[26, 6]" dir="r" tone="amber" /></svg><span>ADR</span>
          <small>今の実装に合わせて、ADR が黙って書き換えられる</small>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.da__flow {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 262px);
  justify-content: space-between;
}
.da__edges {
  position: absolute;
  inset: 0;
  overflow: visible;
  z-index: 1;
}
.da__step {
  display: flex;
  flex-direction: column;
}
.da__who {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 0 0 8px;
  font-size: 13.5px;
  font-weight: 700;
}
.da__who .fx-label-mono {
  color: var(--teal-ink);
}
.da__step:first-child .da__who .fx-label-mono {
  color: var(--muted);
}
.da__paper {
  flex: 1;
}
.da__paper :deep(.fx-paper__title) {
  font-size: 14px;
}
.da__opt {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 13px;
}
.da__opt em {
  font-style: normal;
  font-size: 12.5px;
  font-weight: 600;
}
.da__opt .is-blank {
  color: var(--muted);
}
.da__opt .is-human {
  align-self: flex-start;
  padding: 1px 8px;
  border-radius: var(--r-mark);
  background: var(--teal-fill);
  color: var(--teal-ink);
}
.da__paper.is-locked {
  border-color: var(--teal-line);
}
.da__lock {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin: 18px 0 0;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--ink-2);
}
.da__lock b {
  padding: 1px 8px;
  border-radius: var(--r-mark);
  border: 1px solid var(--teal-line);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  color: var(--teal-ink);
}
.da__inv {
  margin-top: 22px;
  padding-top: 14px;
  border-top: 1px solid var(--line-strong);
}
.da__chains {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  margin-top: 10px;
}
.da__chain {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}
.da__chain span {
  padding: 4px 12px;
  border-radius: var(--r-chip);
  border: 1.5px solid var(--teal-line);
  background: var(--surface);
  font-size: 13.5px;
  font-weight: 700;
  color: var(--teal-ink);
}
.da__arr {
  overflow: visible;
}
.da__chain small {
  flex-basis: 100%;
  font-size: 12.5px;
  color: var(--muted);
}
.da__chain.is-bad span {
  border-color: var(--amber);
  background: var(--amber-fill);
  color: var(--amber-ink);
}
.da__chain.is-bad small {
  color: var(--amber-ink);
}
</style>
