<script setup lang="ts">
const rows = [
  { place: 'AGENTS.md', sub: 'CLAUDE.md から参照', read: '毎回、全文', write: '地図。コマンドと数行のルール、索引への1行', not: '決定の理由、手順の詳細' },
  { place: 'lint・テスト・CI・hook', read: '毎回、機械的に', write: '境界の強制。エラーに ADR 番号と直し方', not: '' },
  { place: '.claude/rules/*.md', read: '該当ファイルを触るとき', write: 'その領域の規約。結論と ADR 番号', not: '理由の長文' },
  { place: 'skills', read: '必要なときに呼ばれる', write: '手順（how）', not: '決定（why）' },
  { place: 'ADR', sub: 'docs/adr/', read: 'grep や索引で開かれる', write: '理由と捨てた案、見直す条件', not: '手順、現状の仕様', hit: true },
  { place: '仕様・ガイド', sub: 'docs/', read: '必要なとき', write: '今どう動くか。常に最新', not: '過去の判断の経緯' },
  { place: 'エージェントのメモリ', read: '個人ごと', write: '個人の好みや作業スタイル', not: 'チームの決定', aside: true },
]
</script>

<template>
  <div class="pl">
    <div class="pl__axis" aria-hidden="true">
      <span>高</span>
      <i />
      <span>低</span>
      <b>読まれる頻度</b>
    </div>
    <div class="pl__table">
      <div class="pl__row pl__row--head">
        <span>置き場所</span><span>読まれ方</span><span>書くこと</span><span>書かないこと</span>
      </div>
      <div v-for="r in rows" :key="r.place" class="pl__row" :class="{ 'is-hit': r.hit, 'is-aside': r.aside }">
        <strong>{{ r.place }}<small v-if="r.sub">{{ r.sub }}</small></strong>
        <span class="pl__read">{{ r.read }}</span>
        <span>{{ r.write }}</span>
        <span class="pl__not">{{ r.not || 'なし' }}</span>
      </div>
    </div>
  </div>
  <p class="pl__quote"><span><Ref id="ebbing" /> の作者は、CLAUDE.md には「結論と ADR 番号だけ」、ADR には「理由と却下した4案」、メモリには「私の好み」。</span></p>
</template>

<style scoped>
.pl {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 12px;
}
.pl__axis {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 30px 0 58px;
  font-size: 11px;
  font-weight: 700;
  color: var(--muted);
}
.pl__axis i {
  flex: 1;
  width: 4px;
  border-radius: 2px;
  background: linear-gradient(180deg, var(--ink-2), var(--line));
}
.pl__axis b {
  position: absolute;
  left: -2px;
  top: 50%;
  transform: translateY(-50%);
  writing-mode: vertical-rl;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: var(--muted);
}
.pl__axis span,
.pl__axis i {
  margin-left: 16px;
}
.pl__row {
  display: grid;
  grid-template-columns: 170px 150px 1fr 150px;
  align-items: baseline;
  gap: 14px;
  padding: 7px 12px;
  border-top: 1px solid var(--line);
  font-size: 13px;
  line-height: 1.5;
}
.pl__row--head {
  padding-top: 0;
  border-top: 0;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--muted);
}
.pl__row strong {
  display: flex;
  flex-direction: column;
  font-size: 13.5px;
  font-weight: 700;
}
.pl__row strong small {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  color: var(--muted);
}
.pl__read {
  font-weight: 600;
  color: var(--ink-2);
}
.pl__not {
  color: var(--muted);
}
.pl__row.is-hit {
  border-radius: var(--r-chip);
  border: 1.5px solid var(--teal-line);
  background: var(--teal-fill);
}
.pl__row.is-hit + .pl__row {
  border-top-color: transparent;
}
.pl__row.is-hit strong,
.pl__row.is-hit .pl__read {
  color: var(--teal-ink);
}
.pl__row.is-aside {
  margin-top: 6px;
  border-top: 1px dashed var(--line-strong);
}
.pl__quote {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 14px 0 0 80px;
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--ink-2);
}
</style>
