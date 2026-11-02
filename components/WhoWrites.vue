<script setup lang="ts">
import type { Inline } from '../data/sources'

const camps: { name: string; voices: { who: Inline[]; say: string }[] }[] = [
  {
    name: '書かせる派',
    voices: [
      { who: [{ ref: 'kent' }], say: 'エージェントに ADR を保存させる。自分から提案してくる状態を目指す。' },
      { who: [{ ref: 'ebbing' }, '（Zenn、4.5か月で64本）'], say: '書くのは Claude。人間は、捨てた案と理由が自分の言ったことと合っているかだけを見る。' },
      { who: [{ ref: 'layerx' }], say: 'LLM でたたき台を作り、人間が仕上げる。' },
      { who: [{ ref: 'equalexperts' }, '（英国のコンサル）'], say: '記録のなかった決定を、遡って数十本。人間が決定の核を一文で書き、AI が周りを書く。' },
    ],
  },
  {
    name: '書かせない派',
    voices: [
      { who: [{ ref: 'haandol' }, '「抽象の逆転」'], say: 'エージェントが今の実装を意図されたアーキテクチャと思い込み、ADR をコードに合わせて書き換える。' },
      { who: [{ ref: 'eth' }, ' 2026'], say: '人間が書いた文脈ファイルは、LLM が生成したものより成功率が有意に高い（p\u00a0=\u00a00.038）。対象は ADR ではなく AGENTS.md。' },
    ],
  },
]
</script>

<template>
  <div class="who">
    <section v-for="c in camps" :key="c.name" class="who__camp">
      <header><strong>{{ c.name }}</strong><span>{{ c.voices.length }}</span></header>
      <ul>
        <li v-for="v in c.voices" :key="v.say">
          <span class="who__name"><RefText :text="v.who" /></span>
          <p>{{ v.say }}</p>
        </li>
      </ul>
    </section>

    <p class="who__common">
      <span class="fx-label-mono">両派が一致する点</span>
      <strong>「なぜ」と「捨てた案」を決めるのは、人間。</strong>
    </p>
  </div>
</template>

<style scoped>
.who {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 48px;
}
.who__camp {
  border-top: 1px solid var(--line-strong);
}
.who header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 12px 0 2px;
}
.who header strong {
  font-size: 17px;
  font-weight: 700;
}
.who header span {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  color: var(--muted);
}
.who__camp li {
  display: grid;
  grid-template-columns: 168px 1fr;
  gap: 16px;
  align-items: baseline;
  padding: 9px 0;
  border-top: 1px solid var(--line);
}
.who__camp li:first-child {
  border-top: 0;
}
.who__name {
  font-size: 12.5px;
  font-weight: 700;
  line-height: 1.55;
  color: var(--ink-2);
}
.who__camp p {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.65;
}
.who__common {
  grid-column: 1 / -1;
  display: flex;
  align-items: baseline;
  gap: 20px;
  margin: 18px 0 0;
  padding: 14px 0 0;
  border-top: 1.5px solid var(--teal-line);
}
.who__common .fx-label-mono {
  color: var(--teal-ink);
}
.who__common strong {
  font-size: 17px;
  font-weight: 700;
}
</style>
