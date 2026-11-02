<script setup lang="ts">
import type { Inline } from '../data/sources'

const rows: { no: string; title: string; kind: string; why: Inline | Inline[] }[] = [
  { no: '0031', title: 'TypeScript を使う', kind: 'コードや設定が表している選択', why: 'ロックインがなく、再燃もしない。コードを読めば分かる。' },
  { no: '0032', title: '保存ボタンの文言を変える', kind: 'UI の微調整・文言・バグ修正', why: '既存の方針に沿っただけの実装も同じ。' },
  { no: '0033', title: '決済 API の仕様', kind: '仕様・手順書・ガイドライン', why: '仕様は上書きして最新を保つ。ADR は上書きせず、積み重ねる。' },
  { no: '0034', title: '週次定例の議事録', kind: '作業日記・議事録', why: [{ ref: 'kent', label: 'Kent' }, ' の警告。日記にしない、誰も開かないエッセイにしない。'] },
  { no: '0035', title: 'PR #1234 の設計メモ', kind: '毎 PR の ADR', why: [{ ref: 'kody-index', label: 'Kody' }, ' では、同じ番号の ADR が何度も2本できた。'] },
]
</script>

<template>
  <div class="fx-paper dont">
    <div class="fx-paper__head"><span>docs/adr/index.md に載せないもの</span><span>記入例（架空）</span></div>
    <ul>
      <li v-for="r in rows" :key="r.no">
        <span class="dont__no">{{ r.no }}</span>
        <span class="dont__title"><span class="fx-no">{{ r.title }}</span></span>
        <span class="dont__why"><span class="dont__kind">{{ r.kind }}</span><RefText :text="r.why" /></span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dont ul {
  padding: 4px 22px 8px;
}
.dont li {
  display: grid;
  grid-template-columns: 44px 272px 1fr;
  align-items: baseline;
  gap: 14px;
  padding: 11px 0;
  border-top: 1px solid var(--line);
}
.dont li:first-child {
  border-top: 0;
}
.dont__no {
  font-family: var(--font-mono);
  font-size: var(--fs-label);
  font-variant-numeric: tabular-nums;
  color: var(--tone-caution-ink);
}
.dont__title {
  font-size: var(--fs-body);
  font-weight: 500;
}
.dont__why {
  font-size: var(--fs-note);
  line-height: 1.6;
  color: var(--muted);
}
.dont__kind {
  display: block;
  color: var(--ink);
}
</style>
