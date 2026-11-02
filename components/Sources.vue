<script setup lang="ts">
import { sources, type Source, type SourceGroup, type SourceId } from '../data/sources'

// 14px では1枚に収まらないので、出典一覧は2枚に分ける。part で、どちらの群を出すかを選ぶ
const props = withDefaults(defineProps<{ part?: 1 | 2 }>(), { part: 1 })

const groups: { key: SourceGroup; name: string; part: 1 | 2 }[] = [
  { key: 'video', name: '動画', part: 1 },
  { key: 'primary', name: '一次資料・ガイド', part: 1 },
  { key: 'paper', name: '研究', part: 1 },
  { key: 'ja', name: '記事・企業ブログ', part: 2 },
  { key: 'x', name: 'X', part: 2 },
]

const all = Object.entries(sources) as [SourceId, Source][]
const items = (g: SourceGroup) => all.filter(([, s]) => 'group' in s && s.group === g)
const parts = (id: SourceId) => all.filter(([, s]) => 'partOf' in s && s.partOf === id)
</script>

<template>
  <div class="src" :class="`is-part-${props.part}`">
    <section v-for="g in groups.filter((g) => g.part === props.part)" :key="g.key" class="src__group" :class="`is-${g.key}`">
      <header><span class="fx-caption">{{ g.name }}</span></header>
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
  gap: 16px 40px;
  align-items: start;
}
.src.is-part-1 {
  grid-template-columns: 1fr 1.15fr;
  grid-template-areas: 'video primary' 'paper primary';
}
.src.is-part-2 {
  grid-template-columns: 1.15fr 1fr;
  grid-template-areas: 'ja x';
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
  padding: 10px 0 4px;
}
.src__group li {
  padding: 4px 0;
  font-size: var(--fs-note);
  line-height: 1.5;
  color: var(--ink);
}
.src__who {
  font-weight: 500;
}
.src__title {
  color: var(--ink-2);
}
.src__group li small {
  display: block;
  font-size: var(--fs-note);
}
.src__group.is-x li,
.src__group.is-paper li {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding: 2px 0;
  white-space: nowrap;
}
.src__group.is-paper li {
  justify-content: flex-start;
}
.src__group.is-paper .src__title {
  margin-left: auto;
}
.src__group.is-paper small {
  display: inline;
}
.src__group.is-x .src__title,
.src__group.is-paper .src__title {
  color: var(--muted);
}
</style>
