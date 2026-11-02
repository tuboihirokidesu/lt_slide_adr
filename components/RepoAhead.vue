<script setup lang="ts">
import type { SourceId } from '../data/sources'

const facts: { file: SourceId; head: string; sub: string; quote?: string }[] = [
  { file: 'kody-index', head: '提案の前に、まず開く一覧', sub: '新しいプリミティブ・サーフェス・保存先を足す前に、却下済みかを確かめる。', quote: 'not as homework and not as a museum' },
  { file: 'kody-primitives', head: 'primitives:check がリンク切れを見つける', sub: '関連 ADR が Superseded 済みか、存在しないものかを検出する。' },
  { file: 'kody-template', head: '決定が済んでから書く', sub: 'PR の設計概要にしない。UI の微調整やライブラリの採用では書かない。' },
]
</script>

<template>
  <div class="repo">
    <div class="fx-paper repo__index">
      <div class="fx-paper__head"><span><Ref id="kody" label="kody-hq/kody" /> · <Ref id="kody-index" /></span><span>0095 まで</span></div>
      <div class="fx-paper__body">
        <p class="fx-paper__h">When to add a record</p>
        <p>
          Do <span class="is-md">**</span>not<span class="is-md">**</span> write an ADR on every PR. Number collisions
          <mark>(two 0022s, then two 0028s, then two 0029s the same day)</mark>
          are the failure mode of that habit. If a number collides, renumber the later record; do not leave duplicates. The decision-record member of <code>npm run docs:check</code>
          (part of <code>npm run validate</code>) rejects duplicate primary numbers.
        </p>
      </div>
    </div>

    <ol class="repo__facts">
      <li v-for="f in facts" :key="f.head">
        <span class="fx-caption"><Ref :id="f.file" /></span>
        <p class="repo__head">{{ f.head }}</p>
        <p>{{ f.sub }}</p>
        <p v-if="f.quote" class="repo__quote"><span class="fx-quote">{{ f.quote }}</span></p>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.repo {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 36px;
  align-items: center;
}
.repo__index .fx-paper__h {
  margin-top: 0;
}
.repo__index .fx-paper__body p:not(.fx-paper__h) {
  margin: 0;
  font-size: var(--fs-body);
  line-height: 1.65;
  color: var(--ink);
}
.repo__index .is-md {
  font-family: var(--font-mono);
  color: var(--muted);
}
.repo__index mark {
  padding: 1px 2px;
  border-radius: var(--r-mark);
  background: var(--tone-caution-fill);
  color: var(--tone-caution-ink);
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}
.repo__facts {
  display: grid;
  gap: 0;
}
.repo__facts li {
  padding: 12px 0;
  border-top: 1px solid var(--line);
}
.repo__facts li:first-child {
  border-top: 0;
  padding-top: 0;
}
.repo__facts p {
  margin: 3px 0 0;
  font-size: var(--fs-note);
  line-height: 1.6;
  color: var(--ink-2);
}
.repo__facts .repo__head {
  margin-top: 3px;
  font-size: var(--fs-body);
  font-weight: 500;
  color: var(--ink);
}
.repo__facts .repo__quote {
  margin-top: 6px;
}
.repo__quote .fx-quote {
  font-size: var(--fs-body);
}
</style>
