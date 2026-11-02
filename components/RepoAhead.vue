<script setup lang="ts">
import type { SourceId } from '../data/sources'

const index = [
  { no: '0026', w: 78 },
  { no: '0027', w: 62 },
  { no: '0028', w: 46, dup: true },
  { no: '0028', w: 38, dup: true },
  { no: '0029', w: 44, dup: true },
  { no: '0029', w: 34, dup: true },
  { no: '0030', w: 74 },
]

const facts: { file: SourceId; head: string; sub: string; quote?: string }[] = [
  { file: 'kody-index', head: '自らを steering veto list と定義する。', sub: '新しいプリミティブ・サーフェス・保存先を提案する前に開く一覧。', quote: 'not as homework and not as a museum' },
  { file: 'kody-index', head: 'Do not write an ADR on every PR.', sub: '毎 PR で書いた失敗例として、番号の衝突を挙げる。docs:check が重複を弾く。' },
  { file: 'kody-primitives', head: 'primitives:check がリンク切れを見つける。', sub: '関連 ADR が Superseded 済みか、存在しないものかを検出する。' },
  { file: 'kody-template', head: 'Context は、決定の後に書く。', sub: 'PR の設計概要として書かない。UI の微調整やライブラリの採用では書かない。' },
]
</script>

<template>
  <div class="repo">
    <div class="repo__left">
      <div class="fx-paper repo__index">
        <div class="fx-paper__head"><span><Ref id="kody" label="kody-hq/kody" /> · index.md の模型</span><span>0095 まで</span></div>
        <ul>
          <li v-for="(r, i) in index" :key="i" :class="{ 'is-dup': r.dup }">
            <b>{{ r.no }}</b><i :style="{ width: `${r.w}%` }" />
          </li>
          <li class="is-more"><b>⋮</b></li>
          <li><b>0095</b><i style="width: 68%" /></li>
          <li class="repo__dup-label">同じ日に<br>2本ずつ</li>
        </ul>
      </div>
      <div class="repo__term is-night">
        <p><span class="is-prompt">$</span> npm run docs:check</p>
        <p class="is-fail">✗ ADR 番号の重複: 0028, 0029</p>
      </div>
    </div>

    <ol class="repo__facts">
      <li v-for="f in facts" :key="f.head">
        <span class="fx-label-mono"><Ref :id="f.file" /></span>
        <strong>{{ f.head }}</strong>
        <p>{{ f.sub }}</p>
        <p v-if="f.quote" class="repo__quote"><span class="fx-quote">{{ f.quote }}</span></p>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.repo {
  display: grid;
  grid-template-columns: 330px 1fr;
  gap: 40px;
  align-items: center;
}
.repo__index {
  position: relative;
}
/* 重複した4行だけを左列に寄せ、右列に括弧と注記を置く */
.repo__index ul {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2px 14px;
  padding: 10px 16px 12px;
}
.repo__index li {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 12px;
  height: 22px;
  margin: 0 -8px;
  padding: 0 8px;
  border-radius: var(--r-mark);
}
.repo__index b {
  width: 34px;
  font-family: var(--font-mono);
  font-size: 11.5px;
  font-weight: 600;
  color: var(--muted);
}
.repo__index i {
  display: block;
  height: 6px;
  border-radius: 3px;
  background: var(--line);
}
.repo__index li.is-dup {
  grid-column: 1;
  margin-right: 0;
  background: var(--amber-fill);
}
.repo__index li.is-dup b {
  color: var(--amber-ink);
}
.repo__index li.is-dup i {
  background: color-mix(in srgb, var(--amber) 45%, transparent);
}
.repo__index li.is-more {
  height: 16px;
}
.repo__index li.repo__dup-label {
  grid-column: 2;
  grid-row: 3 / span 4;
  height: auto;
  margin: 3px 0;
  padding: 0 0 0 12px;
  border-left: var(--w-em) solid var(--amber);
  border-radius: 0;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.5;
  color: var(--amber-ink);
}
.repo__term {
  margin-top: 12px;
  padding: 10px 16px;
  border-radius: var(--r-doc);
  background: var(--paper);
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.7;
  color: var(--ink-2);
}
.repo__term p {
  margin: 0;
}
.repo__term .is-prompt {
  color: var(--teal-ink);
}
.repo__term .is-fail {
  color: var(--amber-ink);
}
.repo__facts {
  display: grid;
  gap: 0;
}
.repo__facts li {
  padding: 9px 0;
  border-top: 1px solid var(--line);
}
.repo__facts li:first-child {
  border-top: 0;
  padding-top: 0;
}
.repo__facts strong {
  display: block;
  margin-top: 3px;
  font-size: 16px;
  font-weight: 700;
}
.repo__facts p {
  margin: 3px 0 0;
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--ink-2);
}
.repo__facts .repo__quote {
  margin-top: 6px;
}
.repo__quote .fx-quote {
  font-size: 15px;
  font-weight: 600;
}
</style>
