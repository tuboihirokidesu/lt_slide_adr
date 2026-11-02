<script setup lang="ts">
import type { Inline } from '../data/sources'

type Finding = { src: Inline[]; fig: string; body: string }
const rows: { claim: string; findings: Finding[]; limit: string }[] = [
  {
    claim: 'いちばんの失敗は、書かれないこと。',
    findings: [
      { src: [{ ref: 'tang' }, ' 2006'], fig: '60.5%', body: '書かない理由の1位は「時間がない」。\n「役に立たない」は 9.9%。' },
      { src: [{ ref: 'buchgeher' }, ' 2023'], fig: '約半数', body: 'ADR を始めたリポジトリが、1〜5本で止まった割合。' },
    ],
    limit: '2005年の調査で回答81人。止まった理由は調べていない。',
  },
  {
    claim: '下書きは書けるが、人間に及ばない。',
    findings: [
      { src: [{ ref: 'dhar' }, ' 2024'], fig: '人間が要る', body: '「not entirely autonomously」。\n記録の手伝いに使う。' },
      { src: [{ ref: 'eth' }, ' 2026'], fig: '+7%', body: '人間が書いたファイルが、LLM 生成を上回った（p = 0.038）。' },
    ],
    limit: 'Dhar は95本で GPT-4 世代。ETH の対象は ADR でなく AGENTS.md。',
  },
  {
    claim: '読ませるのは、直近の数本でいい。',
    findings: [
      { src: [{ ref: 'gupta' }, ' 2026'], fig: '3〜5本', body: '直近の ADR をこれだけ読ませると最良。\n文脈なしでは、人間の約2倍の長さになる。' },
      { src: [{ ref: 'eth-appendix', label: 'ETH 付録B' }], fig: '+2.7%', body: '効かない原因は既存文書との重複。\n文書がなければ人間も上回る。' },
    ],
    limit: 'Gupta は人間の ADR との類似度で測った。付録B は文書を全部消した人工的な条件。',
  },
]
</script>

<template>
  <div class="ev">
    <div class="ev__row ev__row--head">
      <span class="fx-caption">主張と限界</span>
      <span class="fx-caption">根拠</span>
    </div>
    <div v-for="r in rows" :key="r.claim" class="ev__row">
      <div>
        <p class="ev__claim">{{ r.claim }}</p>
        <p class="ev__limit">限界：{{ r.limit }}</p>
      </div>
      <ul class="ev__finds">
        <li v-for="f in r.findings" :key="f.fig">
          <span class="ev__fig">{{ f.fig }}</span>
          <span class="ev__body"><span class="ev__src"><RefText :text="f.src" /></span>{{ f.body }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.ev__row {
  display: grid;
  grid-template-columns: 296px 1fr;
  gap: 28px;
  align-items: start;
  padding: 10px 0;
  border-top: 1px solid var(--line);
}
.ev__row--head {
  padding: 0 0 4px;
  border-top: 0;
}
.ev__row--head + .ev__row {
  border-top: 1.5px solid var(--line-strong);
}
.slidev-layout .ev__claim {
  margin: 0;
  font-size: var(--fs-body);
  font-weight: 500;
  line-height: 1.5;
}
.slidev-layout .ev__limit {
  margin: 4px 0 0;
  font-size: var(--fs-note);
  line-height: 1.5;
  color: var(--muted);
}
.ev__finds {
  display: grid;
  gap: 6px;
}
.ev__finds li {
  display: grid;
  grid-template-columns: 82px 1fr;
  gap: 10px;
  align-items: baseline;
}
.ev__fig {
  font-size: var(--fs-body);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: var(--tone-emphasis-ink);
  white-space: nowrap;
}
.ev__body {
  white-space: pre-line;
  font-size: var(--fs-note);
  line-height: 1.5;
}
.ev__src {
  margin-right: 8px;
  color: var(--ink-2);
}
</style>
