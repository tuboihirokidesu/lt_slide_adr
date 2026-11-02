<script setup lang="ts">
const index = [
  { no: '0026', w: 78 },
  { no: '0027', w: 62 },
  { no: '0028', w: 46, dup: true },
  { no: '0028', w: 38, dup: true },
  { no: '0029', w: 44, dup: true },
  { no: '0029', w: 34, dup: true },
  { no: '0030', w: 74 },
]

const facts = [
  { file: 'index.md', head: '自らを steering veto list と定義する。', sub: '新しいプリミティブ・サーフェス・保存先を提案する前に開く一覧。', quote: 'not as homework and not as a museum' },
  { file: 'index.md', head: 'Do not write an ADR on every PR.', sub: '毎 PR で書いた失敗例として、番号の衝突を挙げる。docs:check が重複を弾く。' },
  { file: 'primitives.yaml', head: 'primitives:check がリンク切れを見つける。', sub: '関連 ADR が Superseded 済みか、存在しないものかを検出する。' },
  { file: '0000-template.md', head: 'Context は、決定の後に書く。', sub: 'PR の設計概要として書かない。UI の微調整やライブラリの採用では書かない。' },
]
</script>

<template>
  <div class="repo">
    <div class="repo__left">
      <div class="fx-paper repo__index">
        <div class="fx-paper__head"><span>decisions/index.md の模型</span><span>0095 まで</span></div>
        <ul>
          <li v-for="(r, i) in index" :key="i" :class="{ 'is-dup': r.dup }">
            <b>{{ r.no }}</b><i :style="{ width: `${r.w}%` }" />
          </li>
          <li class="is-more"><b>⋮</b></li>
          <li><b>0095</b><i style="width: 68%" /></li>
        </ul>
        <span class="repo__dup-label">同じ日に2本ずつ</span>
      </div>
      <div class="repo__term is-night">
        <p><span class="is-prompt">$</span> npm run docs:check</p>
        <p class="is-fail">✗ ADR 番号の重複: 0028, 0029</p>
      </div>
    </div>

    <ol class="repo__facts">
      <li v-for="f in facts" :key="f.head">
        <span class="fx-label-mono">{{ f.file }}</span>
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
.repo__index ul {
  display: grid;
  gap: 2px;
  padding: 10px 16px 12px;
}
.repo__index li {
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
.repo__dup-label {
  position: absolute;
  right: 18px;
  top: 136px;
  font-size: 12px;
  font-weight: 700;
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
