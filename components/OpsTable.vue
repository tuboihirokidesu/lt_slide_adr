<script setup lang="ts">
import type { Inline } from '../data/sources'

const keeling: Inline = { ref: 'keeling', label: 'Keeling' }
const zenn: Inline = { ref: 'zenn-guide', label: 'Zenn ガイド' }
const ebbing: Inline = { ref: 'ebbing' }

const rows: { item: string; rec: string[]; src: (Inline | Inline[])[] }[] = [
  { item: '番号', rec: ['4桁の連番。再利用しない。', 'CI で重複を検出する。'], src: [{ ref: 'nygard', label: 'Nygard' }, { ref: 'kody-index', label: 'Kody の docs:check' }] },
  { item: '起票のタイミング', rec: ['実装と同じ PR。「やらない」系は ADR だけの PR。', '合意前の議論を ADR の PR でしない。'], src: [keeling, ebbing] },
  { item: 'レビュー', rec: ['コードと同じ PR レビュー。docs/adr/ に CODEOWNERS。', 'Accepted への遷移は人間の承認を必須にする。'], src: [keeling, { ref: 'aws' }, [{ ref: 'haandol' }, ' 対策']] },
  { item: 'PR との結び付け', rec: ['PR テンプレートに「関連 ADR」欄を置く。', 'コメントやテストから ADR-NNNN を参照する。'], src: [zenn, ebbing] },
  { item: '陳腐化対策', rec: ['revisit-if は四半期に一度だけ棚卸し。食い違ったら、事実はコードを正とし、', '意図を変えるかは人間が新しい ADR で決める。エージェントは報告だけ。'], src: [{ ref: 'openai' }, ebbing, zenn] },
  { item: 'ツール', rec: ['素の Markdown と小さな CI スクリプトで足りる。', 'adr-tools や log4brains は必須ではない。'], src: [zenn, { ref: 'kody' }] },
]
const no = (i: number) => String(i + 1).padStart(2, '0')
</script>

<template>
  <div class="ops">
    <div class="ops__row ops__row--head">
      <span />
      <span>項目</span>
      <span>推奨</span>
      <span>根拠</span>
    </div>
    <div v-for="(r, i) in rows" :key="r.item" class="ops__row">
      <b>{{ no(i) }}</b>
      <strong>{{ r.item }}</strong>
      <p><span v-for="l in r.rec" :key="l">{{ l }}</span></p>
      <p class="ops__src"><span v-for="(s, j) in r.src" :key="j"><RefText :text="s" /></span></p>
    </div>
  </div>
</template>

<style scoped>
.ops__row {
  display: grid;
  grid-template-columns: 28px 128px 1fr 200px;
  align-items: baseline;
  gap: 16px;
  padding: 8px 0;
  border-top: 1px solid var(--line);
}
.ops__row--head {
  padding: 0 0 8px;
  border-top: 0;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--muted);
}
.ops__row--head + .ops__row {
  border-top: 1.5px solid var(--line-strong);
}
.ops__row b {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  color: var(--teal-ink);
}
.ops__row strong {
  font-size: 15px;
  font-weight: 700;
}
.ops__row p {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.6;
}
.ops__row p > span {
  display: block;
}
.ops__src {
  display: flex;
  flex-wrap: wrap;
  gap: 2px 14px;
}
.ops__row .ops__src > span {
  display: inline;
  font-size: 12.5px;
  font-weight: 600;
  line-height: 1.6;
  color: var(--ink-2);
}
</style>
