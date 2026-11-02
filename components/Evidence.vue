<script setup lang="ts">
import type { Inline } from '../data/sources'

type Finding = { src: Inline[]; fig: string; body: string }
const rows: { claim: string; findings: Finding[]; limit: string }[] = [
  {
    claim: 'いちばんの失敗は、書かれないこと。',
    findings: [
      { src: [{ ref: 'tang' }, ' 2006'], fig: '60.5%', body: '書かない理由の1位は「時間がない」。「役に立たない」は 9.9%。' },
      { src: [{ ref: 'buchgeher' }, ' 2023'], fig: '約半数', body: 'ADR を始めたリポジトリが、1〜5本で止まった割合。' },
    ],
    limit: '2005年の調査で回答81人。止まった理由は調べていない。',
  },
  {
    claim: '下書きは書けるが、人間に及ばない。',
    findings: [
      { src: [{ ref: 'dhar' }, ' 2024'], fig: '人間が要る', body: '「not entirely autonomously」。記録の手伝いに使う。' },
      { src: [{ ref: 'eth' }, ' 2026'], fig: '+7%', body: '人間が書いたファイルが、LLM 生成を上回った（p = 0.038）。' },
    ],
    limit: 'Dhar は95本で GPT-4 世代。ETH の対象は ADR でなく AGENTS.md。',
  },
  {
    claim: '読ませるのは、直近の数本でいい。',
    findings: [
      { src: [{ ref: 'gupta' }, ' 2026'], fig: '3〜5本', body: '直近の ADR をこれだけ読ませると最良。\n文脈なしでは、人間の約2倍の長さになる。' },
      { src: [{ ref: 'eth-appendix', label: 'ETH 付録B' }], fig: '+2.7%', body: '効かない原因は既存文書との重複。文書がなければ人間も上回る。' },
    ],
    limit: 'Gupta は人間の ADR との類似度で測った。付録B は文書を全部消した人工的な条件。',
  },
]
const no = (i: number) => String(i + 1).padStart(2, '0')
</script>

<template>
  <div class="ev">
    <div class="ev__row ev__row--head">
      <span />
      <span>主張と限界</span>
      <span>根拠</span>
    </div>
    <div v-for="(r, i) in rows" :key="r.claim" class="ev__row">
      <b class="ev__no">{{ no(i) }}</b>
      <div>
        <strong class="ev__claim">{{ r.claim }}</strong>
        <p class="ev__limit"><span>限界</span>{{ r.limit }}</p>
      </div>
      <ul class="ev__finds">
        <li v-for="f in r.findings" :key="f.fig">
          <span class="ev__fig">{{ f.fig }}</span>
          <span class="ev__body"><span class="ev__src"><RefText :text="f.src" /></span>{{ f.body }}</span>
        </li>
      </ul>
    </div>
    <p class="ev__note">
      ETH の「LLM が生成したファイルで成功率がわずかに下がった」は有意差なし。コストは約 +20% で有意だが、<Ref id="lulla" /> 2026 では実行時間の中央値が −28.64% と、結果は割れている。
    </p>
  </div>
</template>

<style scoped>
.ev__row {
  display: grid;
  grid-template-columns: 24px 250px 1fr;
  gap: 24px;
  align-items: start;
  padding: 10px 0;
  border-top: 1px solid var(--line);
}
.ev__row--head {
  padding: 0 0 6px;
  border-top: 0;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--muted);
}
.ev__row--head + .ev__row {
  border-top: 1.5px solid var(--line-strong);
}
.ev__no {
  padding-top: 2px;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  color: var(--teal-ink);
}
.ev__claim {
  display: block;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.5;
}
.ev__limit {
  margin: 5px 0 0;
  font-size: 11px;
  line-height: 1.55;
  color: var(--muted);
}
.ev__limit span {
  margin-right: 6px;
  font-family: var(--font-mono);
  font-weight: 600;
  letter-spacing: 0.08em;
}
.ev__finds {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 6px;
}
.ev__finds li {
  display: grid;
  grid-template-columns: 84px 1fr;
  gap: 12px;
  align-items: baseline;
}
.ev__fig {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--teal-ink);
  white-space: nowrap;
}
.ev__body {
  white-space: pre-line;
  font-size: 12.5px;
  line-height: 1.6;
}
.ev__src {
  margin-right: 8px;
  font-weight: 700;
  color: var(--ink-2);
}
.ev__note {
  margin: 8px 0 0;
  padding-top: 8px;
  border-top: 1px solid var(--line);
  font-size: 11px;
  line-height: 1.6;
  color: var(--muted);
}
</style>
