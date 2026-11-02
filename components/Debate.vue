<script setup lang="ts">
type Voice = { who: string; say: string }

const sides: { name: string; tone: 'teal' | 'amber'; voices: Voice[] }[] = [
  {
    name: '必要派',
    tone: 'teal',
    voices: [
      { who: 'Nygard（2011）', say: '理由が分からないと、盲目的に受け入れるか、盲目的に変えるしかない。' },
      { who: 'ThoughtWorks Radar', say: '2017〜18年に Adopt。ただし現在の版には載っていない。' },
      { who: 'Azure Well-Architected', say: 'アーキテクトの最も重要な成果物の一つ。' },
      { who: 'Geoffrey Huntley', say: 'エージェントを軌道に乗せるには、ADR がほぼすべて。' },
      { who: 'ZOZO（ZOZOFIT）', say: '同じテーマを何度も議論していたのが減った。' },
      { who: 'LayerX（バクラク）', say: '標準から外れた選択を「なぜ例外か」として残した。' },
    ],
  },
  {
    name: '懐疑派',
    tone: 'amber',
    voices: [
      { who: 'Michael Keeling', say: '一度読んだら、何か月も見返さない。' },
      { who: 'Zenn「ADR 完全ガイド」', say: '1〜2人の開発や、3か月で捨てる PoC なら見送る。' },
      { who: '@roeishous', say: 'エージェントには長すぎる。1決定1行のほうが効く。' },
      { who: '@PrapKim', say: '破壊的変更が多いと、すぐ古くなる。' },
      { who: '@masayoshi_uehra', say: 'AI が古い決定に従った。索引で現役を示して解決。' },
    ],
  },
]
</script>

<template>
  <div class="deb">
    <section v-for="s in sides" :key="s.name" class="deb__side" :class="`is-${s.tone}`">
      <header><strong>{{ s.name }}</strong><span>{{ s.voices.length }}</span></header>
      <ul>
        <li v-for="v in s.voices" :key="v.who">
          <span class="deb__who">{{ v.who }}</span>
          <span class="deb__say">{{ v.say }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.deb {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}
.deb__side {
  --c: var(--teal);
  --c-ink: var(--teal-ink);
  position: relative;
  border-top: 1px solid var(--line-strong);
}
.deb__side::before {
  content: "";
  position: absolute;
  left: 0;
  top: -1px;
  width: 48px;
  height: 3px;
  background: var(--c);
}
.deb__side.is-amber {
  --c: var(--amber);
  --c-ink: var(--amber-ink);
}
.deb__side header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 12px 0 6px;
}
.deb__side header strong {
  font-size: 18px;
  font-weight: 700;
  color: var(--c-ink);
}
.deb__side header span {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  color: var(--muted);
}
.deb__side li {
  display: grid;
  gap: 1px;
  padding: 7px 0 8px;
  border-top: 1px solid var(--line);
}
.deb__who {
  font-size: 13px;
  font-weight: 700;
  line-height: 1.5;
}
.deb__say {
  font-size: 13px;
  line-height: 1.6;
  color: var(--ink-2);
}
</style>
