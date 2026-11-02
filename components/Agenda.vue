<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import type { Inline } from '../data/sources'

const chapters: { no: string; kicker: string; title: string; desc: Inline[] | string }[] = [
  { no: '01', kicker: 'Origin', title: '起点', desc: [{ ref: 'kent' }, ' の動画と、', { ref: 'kody' }, ' のリポジトリ。ADR を No のリストと捉え直す。'] },
  { no: '02', kicker: 'Debate', title: '賛否', desc: '必要か。誰が書くか。守らせられるか。どこに置くか。4つの論点。' },
  { no: '03', kicker: 'What to write', title: '何を書くか', desc: '3つの条件と、書かなくてよいもの。半ページのテンプレート。' },
  { no: '04', kicker: 'How to run', title: 'どう管理するか', desc: '索引と status、PR での運用。置き場所ごとの役割と、最初の1週間。' },
]

// 章の範囲はデッキの frontmatter（章扉の chapter: "01"、本文の chapter: 01 起点）から数える
const { $nav } = useSlideContext()
const pages = (no: string) => {
  const nos = $nav.value.slides.filter((s) => String(s.meta.slide?.frontmatter.chapter ?? '').split(' ')[0] === no).map((s) => s.no)
  const pad = (n: number) => String(n).padStart(2, '0')
  return nos.length ? `${pad(Math.min(...nos))}–${pad(Math.max(...nos))}` : ''
}
</script>

<template>
  <div class="agenda-x">
    <ol class="agenda-x__cols">
      <li v-for="c in chapters" :key="c.no" class="agenda-x__col">
        <span class="agenda-x__num">{{ c.no }}</span>
        <span class="agenda-x__kicker">{{ c.kicker }}</span>
        <strong>{{ c.title }}</strong>
        <p><RefText :text="c.desc" /></p>
        <span class="agenda-x__pages">p. {{ pages(c.no) }}</span>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.agenda-x__cols {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.agenda-x__col {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 28px 24px 0 0;
  border-top: 1px solid var(--line-strong);
}
.agenda-x__col + .agenda-x__col {
  padding-left: 24px;
  border-left: 1px solid var(--line);
}
.agenda-x__col:last-child {
  padding-right: 0;
}
.agenda-x__col::before {
  content: "";
  position: absolute;
  left: 0;
  top: -1px;
  width: 48px;
  height: 3px;
  background: var(--tone-recommend);
}
.agenda-x__col + .agenda-x__col::before {
  left: 24px;
}
.agenda-x__num {
  font-size: var(--fs-numeral);
  font-weight: 700;
  line-height: 0.9;
  letter-spacing: -0.05em;
  color: var(--tone-recommend);
  font-variant-numeric: tabular-nums;
}
.agenda-x__kicker {
  margin-top: 26px;
  font-family: var(--font-mono);
  font-size: var(--fs-label);
  font-weight: 600;
  letter-spacing: var(--ls-label);
  text-transform: uppercase;
  color: var(--tone-recommend-ink);
}
.agenda-x__col strong {
  margin-top: 6px;
  font-size: var(--fs-title);
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: var(--ls-display);
  white-space: nowrap;
}
.agenda-x__col p {
  margin: 10px 0 0;
  font-size: var(--fs-note);
  line-height: 1.7;
  color: var(--ink-2);
}
.agenda-x__pages {
  margin-top: auto;
  padding: 20px 0 2px;
  font-family: var(--font-mono);
  font-size: var(--fs-label);
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}
</style>
