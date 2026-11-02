<script setup lang="ts">
type Src = { title: string; site: string }

const groups: { name: string; items: Src[] }[] = [
  {
    name: '動画',
    items: [
      { title: 'Kent C. Dodds「Turn Your Agent on Auto-Pilot with ADRs」', site: 'youtube.com' },
      { title: 'Kody の decisions とテンプレート', site: 'github.com/kody-hq/kody' },
      { title: 'Michael Keeling「Architecture Decision Records in Action」SATURN 2017', site: 'youtube.com' },
      { title: 'Vladas Diržys「Introduction to ADRs」Voxxed Days', site: 'youtube.com' },
      { title: 'David Ayers「Communicating and documenting architectural decisions」', site: 'youtube.com' },
    ],
  },
  {
    name: '一次資料・ガイド',
    items: [
      { title: 'Michael Nygard「Documenting Architecture Decisions」2011', site: 'cognitect.com' },
      { title: 'ADR GitHub organization・MADR', site: 'adr.github.io' },
      { title: 'ThoughtWorks Radar「Lightweight ADR」ほか', site: 'thoughtworks.com' },
      { title: 'AWS Prescriptive Guidance「ADR process」ほか', site: 'docs.aws.amazon.com' },
      { title: 'Google Cloud「Architecture decision records overview」', site: 'cloud.google.com' },
      { title: 'Azure Well-Architected「Maintain an ADR」', site: 'learn.microsoft.com' },
      { title: 'OpenAI「Harness engineering」', site: 'openai.com' },
      { title: 'Gloaguen ほか「Evaluating AGENTS.md」ETH Zurich 2026', site: 'arxiv.org' },
      { title: 'Matt Pocock「grill-with-docs」', site: 'github.com/mattpocock' },
    ],
  },
  {
    name: '日本語記事・企業ブログ',
    items: [
      { title: 'ZOZOFIT における ADR を利用した意思決定を残す文化作り', site: 'techblog.zozo.com' },
      { title: '不正検知システムを3日で設計し、3週間で本番リリースした話', site: 'tech.layerx.co.jp' },
      { title: '設計判断を 64 本の ADR に残している理由と書き方', site: 'zenn.dev' },
      { title: 'ADR 完全ガイド', site: 'zenn.dev' },
      { title: '8 Learnings from using ADRs', site: 'tech.willhaben.at' },
      { title: '意思決定を記録する ADR の話（X 経由、本文未取得）', site: 'NIFTY engineering' },
    ],
  },
  {
    name: 'X',
    items: [
      { title: '@GeoffreyHuntley', site: 'ADR がほぼすべて' },
      { title: '@haandol', site: '抽象の逆転' },
      { title: '@Kizuno18', site: '散文はコンパイルされない' },
      { title: '@cypherpunkMTL', site: '文脈であり統治でない' },
      { title: '@EvgeniiKonev', site: '古さは欄で表す' },
      { title: '@roeishous', site: 'ADR は長すぎる' },
      { title: '@PrapKim', site: 'すぐ古くなる' },
      { title: '@masayoshi_uehra', site: '索引で現役を示す' },
      { title: '@therobertta_', site: 'Sean Goedecke の運用' },
      { title: '@EricSoundMinds', site: 'docs と AGENTS.md' },
      { title: '@gr1m0h', site: 'xDR でよい' },
      { title: '@msy78', site: '綺麗に残すと億劫' },
      { title: '@Mx_Issue', site: '作業記録は消す' },
    ],
  },
]
</script>

<template>
  <div class="src">
    <section v-for="g in groups" :key="g.name" class="src__group" :class="{ 'is-x': g.name === 'X' }">
      <header><span class="fx-label-mono">{{ g.name }}</span><b>{{ g.items.length }}</b></header>
      <ul>
        <li v-for="s in g.items" :key="s.title">
          <span>{{ s.title }}</span> <small>{{ s.site }}</small>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.src {
  display: grid;
  grid-template-columns: 0.92fr 1.1fr 1fr 1.18fr;
  gap: 20px;
  align-items: start;
}
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
  line-height: 1.45;
  color: var(--ink);
}
.src__group li small {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted);
  white-space: nowrap;
}
.src__group.is-x li {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  padding: 2px 0;
  white-space: nowrap;
}
.src__group.is-x li span {
  font-family: var(--font-mono);
  font-weight: 600;
}
.src__group.is-x li small {
  font-family: var(--font-sans);
}
</style>
