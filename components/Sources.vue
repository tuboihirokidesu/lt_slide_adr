<script setup lang="ts">
import { sources, type Source, type SourceGroup, type SourceId } from '../data/sources'

const groups: { key: SourceGroup; name: string }[] = [
  { key: 'video', name: '動画' },
  { key: 'primary', name: '一次資料・ガイド' },
  { key: 'paper', name: '研究' },
  { key: 'ja', name: '記事・企業ブログ' },
  { key: 'x', name: 'X' },
]

const all = Object.entries(sources) as [SourceId, Source][]
const items = (g: SourceGroup) => all.filter(([, s]) => 'group' in s && s.group === g)
const parts = (id: SourceId) => all.filter(([, s]) => 'partOf' in s && s.partOf === id)
</script>

<template>
  <div class="src">
    <section v-for="g in groups" :key="g.key" class="src__group" :class="`is-${g.key}`">
      <header><span class="fx-label-mono">{{ g.name }}</span><b>{{ items(g.key).length }}</b></header>
      <ul>
        <li v-for="[id, s] in items(g.key)" :key="id">
          <Ref :id="id" class="src__who" /> <span class="src__title">{{ s.title }}</span><small v-if="parts(id).length"><template v-for="([pid, p], i) in parts(id)" :key="pid">{{ i ? '・' : '' }}<Ref :id="pid" :label="p.title" /></template></small>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.src {
  display: grid;
  grid-template-columns: 0.9fr 1.2fr 0.95fr 1.18fr;
  grid-template-areas: 'video primary ja x' 'video primary ja paper';
  grid-template-rows: auto 1fr;
  gap: 14px 20px;
  align-items: start;
}
.src__group.is-video { grid-area: video; }
.src__group.is-primary { grid-area: primary; }
.src__group.is-paper { grid-area: paper; }
.src__group.is-ja { grid-area: ja; }
.src__group.is-x { grid-area: x; }
.src__group {
  border-top: 1px solid var(--line-strong);
}
.src__group header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 10px 0 4px;
}
.src__group header b {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  color: var(--muted);
}
.src__group li {
  padding: 3px 0;
  font-size: 11px;
  line-height: 1.5;
  color: var(--ink);
}
.src__who {
  font-weight: 700;
}
.src__title {
  color: var(--ink-2);
}
.src__group li small {
  display: block;
  font-size: 11px;
}
.src__group.is-x li,
.src__group.is-paper li {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  padding: 1px 0;
  white-space: nowrap;
}
.src__group.is-x .src__who {
  font-family: var(--font-mono);
  font-weight: 600;
}
.src__group.is-x li,
.src__group.is-paper li {
  font-size: 10.5px;
}
.src__group.is-paper li {
  justify-content: flex-start;
}
.src__group.is-paper .src__title {
  margin-left: auto;
}
.src__group.is-paper small {
  display: inline;
  font-size: 10.5px;
}
.src__group.is-x .src__title,
.src__group.is-paper .src__title {
  color: var(--muted);
}
</style>
