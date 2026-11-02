<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import type { Inline } from '../data/sources'

const chapters: { no: string; kicker: string; title: string; desc: Inline[] | string; tone: string }[] = [
  { no: '01', kicker: 'Origin', title: '起点', desc: [{ ref: 'kent' }, ' の動画と、', { ref: 'kody' }, ' のリポジトリ。ADR を No のリストと捉え直す。'], tone: 'teal' },
  { no: '02', kicker: 'Debate', title: '賛否', desc: '必要か。誰が書くか。守らせられるか。どこに置くか。4つの論点。', tone: 'amber' },
  { no: '03', kicker: 'What to write', title: '何を書くか', desc: '3つの条件と、書かなくてよいもの。半ページのテンプレート。', tone: 'teal' },
  { no: '04', kicker: 'How to run', title: 'どう管理するか', desc: '索引と status、PR での運用。置き場所ごとの役割と、最初の1週間。', tone: 'blue' },
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
      <li v-for="c in chapters" :key="c.no" class="agenda-x__col" :class="`is-${c.tone}`">
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
  --c: var(--teal);
  --c-ink: var(--teal-ink);
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
.agenda-x__col::before {
  content: "";
  position: absolute;
  left: 0;
  top: -1px;
  width: 48px;
  height: 3px;
  background: var(--c);
}
.agenda-x__col + .agenda-x__col::before {
  left: 24px;
}
.agenda-x__col.is-amber {
  --c: var(--amber);
  --c-ink: var(--amber-ink);
}
.agenda-x__col.is-blue {
  --c: var(--ext);
  --c-ink: var(--ext-ink);
}
.agenda-x__num {
  font-size: 92px;
  font-weight: 700;
  line-height: 0.9;
  letter-spacing: -0.05em;
  color: var(--c);
  font-variant-numeric: tabular-nums;
}
.agenda-x__kicker {
  margin-top: 28px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--c-ink);
}
.agenda-x__col strong {
  margin-top: 6px;
  font-size: 23px;
  font-weight: 700;
}
.agenda-x__col p {
  margin: 10px 0 0;
  font-size: 13.5px;
  line-height: 1.75;
  color: var(--ink-2);
}
.agenda-x__pages {
  margin-top: auto;
  padding: 22px 0 2px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}
</style>
