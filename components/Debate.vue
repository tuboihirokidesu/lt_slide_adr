<script setup lang="ts">
import type { SourceId } from '../data/sources'

type Voice = { ref: SourceId; label?: string; say: string }

const sides: { name: string; tone: 'recommend' | 'caution'; voices: Voice[] }[] = [
  {
    name: '必要派',
    tone: 'recommend',
    voices: [
      { ref: 'nygard', label: 'Nygard（2011）', say: '理由が分からないと、盲目的に受け入れるか変えるしかない。' },
      { ref: 'radar', say: '2017〜18年に Adopt。ただし現在の版には載っていない。' },
      { ref: 'azure', say: 'アーキテクトの最も重要な成果物の一つ。' },
      { ref: 'huntley', label: 'Geoffrey Huntley', say: 'エージェントを軌道に乗せるには、ADR がほぼすべて。' },
      { ref: 'zozo', label: 'ZOZO（ZOZOFIT）', say: '同じテーマを何度も議論していたのが減った。' },
      { ref: 'layerx', label: 'LayerX（バクラク）', say: '標準から外れた選択を「なぜ例外か」として残した。' },
    ],
  },
  {
    name: '懐疑派',
    tone: 'caution',
    voices: [
      { ref: 'keeling', say: '一度読んだら、何か月も見返さない。' },
      { ref: 'zenn-guide', label: 'Zenn「ADR 完全ガイド」', say: '1〜2人の開発や、3か月で捨てる PoC なら見送る。' },
      { ref: 'roeishous', say: 'エージェントには長すぎる。1決定1行のほうが効く。' },
      { ref: 'prapkim', say: '破壊的変更が多いと、すぐ古くなる。' },
    ],
  },
]
</script>

<template>
  <div class="deb">
    <section v-for="s in sides" :key="s.name" class="deb__side" :class="`is-${s.tone}`">
      <header>
        <span class="deb__name">{{ s.name }}</span>
      </header>
      <ul>
        <li v-for="v in s.voices" :key="v.ref">
          <Ref :id="v.ref" :label="v.label" class="deb__who" />
          <span class="deb__say">{{ v.say }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
/* 2つの陣営が中央の軸に向かって寄る。左は右揃え、右は左揃え */
.deb {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.deb::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  border-left: 1px solid var(--line-strong);
}
.deb__side {
  --c: var(--tone-recommend);
  --c-ink: var(--tone-recommend-ink);
  padding-right: 32px;
  text-align: right;
}
.deb__side.is-caution {
  --c: var(--tone-caution);
  --c-ink: var(--tone-caution-ink);
  padding: 0 0 0 32px;
  text-align: left;
}
.deb__side header {
  position: relative;
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  gap: 14px;
  padding-bottom: 14px;
}
.deb__side.is-caution header {
  flex-direction: row-reverse;
}
.deb__side header::after {
  content: "";
  position: absolute;
  bottom: 0;
  right: -32px;
  width: 80px;
  height: 3px;
  background: var(--c);
}
.deb__side.is-caution header::after {
  right: auto;
  left: -32px;
}
.deb__name {
  font-size: var(--fs-body);
  font-weight: 500;
  color: var(--c-ink);
}
.deb__side ul {
  display: grid;
  gap: 8px;
  padding-top: 14px;
}
.deb__side li {
  display: grid;
  gap: 1px;
}
.deb__who {
  justify-self: end;
  font-size: var(--fs-note);
  font-weight: 500;
  line-height: 1.5;
}
.deb__side.is-caution .deb__who {
  justify-self: start;
}
.deb__say {
  font-size: var(--fs-note);
  line-height: 1.5;
  color: var(--ink-2);
}
</style>
