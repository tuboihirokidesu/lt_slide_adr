<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import type { Inline } from '../data/sources'

const chapters: { no: string; title: string; desc: Inline[] | string }[] = [
  { no: '01', title: '起点', desc: [{ ref: 'kent' }, ' の動画と、', { ref: 'kody' }, ' のリポジトリ'] },
  { no: '02', title: '賛否', desc: '必要か、誰が書くか、守らせられるか、どこに置くかを順に見る' },
  { no: '03', title: '何を書くか', desc: '書く条件、書かなくてよいもの、半ページのテンプレート' },
  { no: '04', title: 'どう管理するか', desc: '索引と status、PR での運用、置き場所ごとの役割、最初の1週間' },
]

// 章の範囲はデッキの frontmatter（章扉の chapter: "01"、本文の chapter: 01 起点）から数える
const { $nav } = useSlideContext()
const pages = (no: string) => {
  const nos = $nav.value.slides.filter((s) => String(s.meta.slide?.frontmatter.chapter ?? '').split(' ')[0] === no).map((s) => s.no)
  return nos.length ? `${Math.min(...nos)}–${Math.max(...nos)}枚目` : ''
}
</script>

<template>
  <ol class="agenda-x">
    <li v-for="c in chapters" :key="c.no">
      <span class="agenda-x__no">第{{ Number(c.no) }}章</span>
      <span class="agenda-x__title">{{ c.title }}</span>
      <p><RefText :text="c.desc" /></p>
      <span class="agenda-x__pages">{{ pages(c.no) }}</span>
    </li>
  </ol>
</template>

<style scoped>
.agenda-x li {
  display: grid;
  grid-template-columns: 64px 150px 1fr auto;
  align-items: baseline;
  gap: 16px;
  padding: 18px 0;
  border-top: 1px solid var(--line);
}
.agenda-x li:last-child {
  border-bottom: 1px solid var(--line);
}
.agenda-x__no {
  font-size: var(--fs-note);
  color: var(--tone-recommend-ink);
}
.agenda-x__title {
  font-size: var(--fs-body);
  font-weight: 500;
}
.agenda-x p {
  margin: 0;
  font-size: var(--fs-body);
  color: var(--ink-2);
}
.agenda-x__pages {
  font-size: var(--fs-note);
  font-variant-numeric: tabular-nums;
  color: var(--muted);
}
</style>
