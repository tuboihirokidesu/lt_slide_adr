<script setup lang="ts">
import type { Inline } from '../data/sources'

type Line = { text: string; rejected?: string; kept?: boolean }
type Row = {
  key: string
  head?: string
  lines?: Line[]
  revisit?: boolean
  src?: Inline
  note?: string[]
  strong?: boolean
}

const rows: Row[] = [
  { key: 'fm', src: { ref: 'azure', label: 'Azure' }, note: ['confidence は確信度。', 'deciders は Accepted にした人間。'] },
  { key: 'title', src: { ref: 'nygard', label: 'Nygard' }, note: ['タイトルは決定そのもの。', 'No なら「〜しない」。'] },
  { key: 'Context', head: 'Context', lines: [{ text: '集計クエリが多く、ORM の生成 SQL では実行計画を制御しにくい。' }], note: ['事実だけを書く。'] },
  { key: 'Decision', head: 'Decision', lines: [{ text: 'ORM は入れない。SQL ファイルと型生成で書く。' }] },
  {
    key: 'Options',
    head: 'Considered options',
    lines: [
      { text: '生 SQL ＋型生成（採用）', kept: true },
      { text: 'ORM を入れる', rejected: '集計の実行計画を制御できない' },
      { text: 'クエリビルダー', rejected: '結局 SQL を読む力が要る' },
    ],
    src: { ref: 'madr' },
    note: ['ここが一番価値がある。'],
    strong: true,
  },
  { key: 'Consequences', head: 'Consequences', lines: [{ text: '＋実行計画を読める　−定型の CRUD も手で書く' }], note: ['悪い結果を必ず1つ以上。'] },
  { key: 'Revisit', head: 'Revisit if', lines: [{ text: 'CRUD 中心の画面が全体の半分を超えたら' }], revisit: true, src: { ref: 'kent' }, note: ['見直す条件を、具体的に。'] },
  { key: 'Enforcement', head: 'Enforcement', lines: [{ text: 'lint: no-restricted-imports（ORM パッケージ）' }], src: { ref: 'kizuno' }, note: ['どう守らせているか。', 'なければ「レビューのみ」。'] },
]
</script>

<template>
  <div class="hp">
    <div class="hp__grid">
      <div class="fx-paper hp__paper" aria-hidden="true" />
      <div class="fx-paper__head hp__file"><span>docs/adr/0012-no-orm.md</span><span>記入例（架空）</span></div>

      <template v-for="(r, i) in rows" :key="r.key">
        <div class="hp__cell" :style="{ gridRow: i + 2 }">
          <div v-if="r.key === 'fm'" class="hp__fm">
            <span><i>status:</i> accepted</span><span><i>date:</i> 2026-10-30</span><span><i>confidence:</i> medium</span>
            <span><i>deciders:</i> "@backend-lead"</span>
          </div>
          <p v-else-if="r.key === 'title'" class="hp__title"><b>0012:</b> ORM を導入しない。クエリは生 SQL で書く。</p>
          <div v-else class="hp__sec">
            <span class="hp__h">{{ r.head }}</span>
            <div :class="{ 'fx-revisit hp__revisit': r.revisit }">
              <p v-for="l in r.lines" :key="l.text" :class="{ 'is-kept': l.kept, 'is-rejected': l.rejected }">
                {{ l.text }}<template v-if="l.rejected">（<span class="hp__rejected">却下</span>：{{ l.rejected }}）</template>
              </p>
            </div>
          </div>
        </div>
        <template v-if="r.note">
          <i class="hp__leader" :class="{ 'is-recommend': r.strong }" :style="{ gridRow: i + 2 }" aria-hidden="true" />
          <p class="hp__note" :class="{ 'is-strong': r.strong }" :style="{ gridRow: i + 2 }">
            <span v-if="r.src" class="hp__src"><RefText :text="r.src" /></span><template v-for="(n, k) in r.note" :key="n"><br v-if="k">{{ n }}</template>
          </p>
        </template>
      </template>
    </div>
    <p class="hp__foot"><span class="fx-caption">目安</span><span>全体で半ページ、40〜80行。<Ref id="nygard" label="Nygard" /> と <Ref id="kent" label="Kent" /> の型に、選択肢・確信度・強制手段を足す。</span></p>
  </div>
</template>

<style scoped>
.hp__grid {
  display: grid;
  grid-template-columns: 530px 30px 1fr;
  align-items: center;
}
.hp__paper {
  grid-column: 1;
  grid-row: 1 / 10;
  align-self: stretch;
}
.hp__file {
  grid-column: 1;
  grid-row: 1;
  position: relative;
}
.hp__cell {
  grid-column: 1;
  position: relative;
  padding: 2px 14px;
}
.hp__cell:last-of-type {
  padding-bottom: 12px;
}
.hp__fm {
  display: flex;
  flex-wrap: wrap;
  gap: 0 16px;
  padding: 6px 0 2px;
  font-family: var(--font-mono);
  font-size: var(--fs-label);
  line-height: 1.6;
  color: var(--ink-2);
}
.hp__fm i {
  font-style: normal;
  color: var(--muted);
}
.hp__title {
  margin: 0;
  padding: 2px 0 4px;
  font-size: var(--fs-body);
  font-weight: 500;
  line-height: 1.4;
}
.hp__title b {
  font-family: var(--font-mono);
  font-size: var(--fs-label);
  color: var(--tone-recommend-ink);
}
.hp__sec {
  display: grid;
  grid-template-columns: 156px 1fr;
  align-items: baseline;
  gap: 6px;
}
.hp__h {
  font-family: var(--font-mono);
  font-size: var(--fs-label);
  letter-spacing: 0;
  color: var(--muted);
}
.hp__h::before {
  content: "## ";
  color: var(--line-strong);
}
.hp__sec p {
  margin: 0;
  font-size: var(--fs-note);
  line-height: 1.5;
  letter-spacing: 0;
  color: var(--ink);
}
.hp__sec p.is-kept {
  color: var(--tone-recommend-ink);
}
.hp__sec p.is-rejected {
  color: var(--muted);
}
.hp__rejected {
  color: var(--tone-caution-ink);
}
.hp__revisit {
  margin: 2px 0;
  padding: 3px 10px;
}
.hp__leader {
  grid-column: 2;
  position: relative;
  height: 1px;
  background: var(--line-strong);
}
.hp__leader::before {
  content: "";
  position: absolute;
  left: -3px;
  top: -3px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--line-strong);
}
.hp__leader.is-recommend,
.hp__leader.is-recommend::before {
  background: var(--tone-recommend);
}
.hp__note {
  grid-column: 3;
  margin: 0;
  padding-left: 10px;
  font-size: var(--fs-note);
  line-height: 1.5;
  color: var(--ink-2);
}
.hp__src {
  margin-right: 8px;
  font-size: var(--fs-note);
  font-weight: 400;
  color: var(--tone-source-ink);
}
.hp__note.is-strong {
  font-size: var(--fs-body);
  font-weight: 700;
  color: var(--tone-recommend-ink);
}
.hp__foot {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 8px 0 0;
  font-size: var(--fs-note);
  color: var(--muted);
}
</style>
