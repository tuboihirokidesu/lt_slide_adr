<script setup lang="ts">
const camps = [
  {
    name: '書かせる派',
    voices: [
      { who: 'Kent C. Dodds', say: 'エージェントに ADR を保存させる。自分から提案してくる状態を目指す。' },
      { who: 'Ebbing（Zenn、4.5か月で64本）', say: '書くのは Claude。人間は、捨てた案と理由が自分の言ったことと合っているかだけを見る。' },
      { who: 'LayerX', say: 'LLM でたたき台を作り、人間が仕上げる。' },
    ],
  },
  {
    name: '書かせない派',
    voices: [
      { who: 'Sean Goedecke', say: 'コードは任せても、ADR・PR 説明・Slack は自分で書く。@therobertta_ による紹介で、原文は未確認。' },
      { who: '@haandol「抽象の逆転」', say: 'エージェントが今の実装を意図されたアーキテクチャと思い込み、ADR をコードに合わせて書き換える。' },
    ],
  },
]

const stats = [
  { value: '+20%', unit: '以上', label: '推論コスト', tone: 'amber' },
  { value: '上がらず', label: 'タスク成功率', tone: 'muted' },
  { value: 'わずかに低下', label: 'LLM が生成したファイルの成功率', tone: 'amber' },
]
</script>

<template>
  <div class="who">
    <section v-for="c in camps" :key="c.name" class="who__camp">
      <header><strong>{{ c.name }}</strong></header>
      <ul>
        <li v-for="v in c.voices" :key="v.who">
          <span class="who__name">{{ v.who }}</span>
          <p>{{ v.say }}</p>
        </li>
      </ul>
    </section>

    <section class="fx-box who__eth">
      <header><strong>ETH Zurich の研究</strong><span class="who__tag">arXiv 2602.11988</span></header>
      <p class="who__paper">AGENTS.md 型のコンテキストファイルを評価した研究。</p>
      <dl>
        <div v-for="s in stats" :key="s.label" :class="`is-${s.tone}`">
          <dt>{{ s.label }}</dt>
          <dd><b>{{ s.value }}</b><small v-if="s.unit">{{ s.unit }}</small></dd>
        </div>
      </dl>
      <p class="who__rec">推奨は、人間が書いた、非標準な慣行に絞った最小限の指示。</p>
    </section>
  </div>
</template>

<style scoped>
.who {
  display: grid;
  grid-template-columns: 1fr 1fr 290px;
  gap: 28px;
  align-items: stretch;
}
.who__camp {
  border-top: 1px solid var(--line-strong);
}
.who header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 14px 0 6px;
}
.who header strong {
  font-size: 17px;
  font-weight: 700;
}
.who__eth header {
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  padding-top: 18px;
}
.who__tag {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  color: var(--muted);
}
.who__camp li {
  padding: 10px 0;
  border-top: 1px solid var(--line);
}
.who__camp li:first-child {
  border-top: 0;
}
.who__name {
  display: block;
  font-size: 12.5px;
  font-weight: 700;
  color: var(--ext-ink);
}
.who__camp p {
  margin: 3px 0 0;
  font-size: 13.5px;
  line-height: 1.65;
}
.who__eth {
  padding: 0 22px 18px;
  display: flex;
  flex-direction: column;
}
.who__paper {
  margin: 0;
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--muted);
}
.who__eth dl {
  margin: 12px 0 0;
  display: grid;
  gap: 10px;
}
.who__eth dl > div {
  padding-top: 10px;
  border-top: 1px solid var(--line);
}
.who__eth dt {
  font-size: 12px;
  font-weight: 600;
  color: var(--muted);
}
.who__eth dd {
  margin: 2px 0 0;
  display: flex;
  align-items: baseline;
  gap: 6px;
}
.who__eth dd b {
  font-size: 22px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--ink);
}
.who__eth div:first-child dd b {
  font-size: 40px;
  letter-spacing: -0.03em;
}
.who__eth .is-amber dd b {
  color: var(--amber-ink);
}
.who__eth dd small {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--amber-ink);
}
.who__rec {
  margin: auto 0 0;
  padding-top: 12px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.6;
  color: var(--ink-2);
}
</style>
