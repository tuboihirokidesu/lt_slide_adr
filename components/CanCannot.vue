<script setup lang="ts">
import type { Inline } from '../data/sources'

const can: { head: string; sub?: Inline[] }[] = [
  { head: '却下済みの案の再提案を防ぐ。' },
  { head: '新しいセッションの立ち上がりが速くなる。' },
  { head: '経緯を知らないレビュアーにも、却下済みの案が伝わる。' },
  { head: '人間の新メンバーのオンボーディングにも効く。', sub: [{ ref: 'keeling', label: 'Keeling' }, ' のデータで、最も確かな効果。'] },
]
const cannot = [
  { head: ['境界違反の自動検出'], who: ['lint・CI の役目'] },
  { head: ['ADR が古いと判定して、', 'エージェントが書き換える'], who: ['できるのは報告まで。', '古さは status 欄と索引で人間が示す'] },
]
</script>

<template>
  <div class="cc">
    <section class="cc__col is-can">
      <header><span class="fx-caption">できること</span></header>
      <ul>
        <li v-for="c in can" :key="c.head">
          <p class="cc__head">{{ c.head }}</p>
          <p v-if="c.sub" class="cc__sub"><RefText :text="c.sub" /></p>
        </li>
      </ul>
    </section>
    <section class="cc__col is-cannot">
      <header><span class="fx-caption">できないこと</span></header>
      <ul>
        <li v-for="c in cannot" :key="c.head[0]">
          <p class="cc__head"><template v-for="(h, i) in c.head" :key="h"><br v-if="i">{{ h }}</template></p>
          <p class="cc__who"><svg viewBox="0 0 30 12" width="30" height="12" aria-hidden="true"><Edge d="M1 6 H28" :end="[28, 6]" dir="r" tone="recommend" /></svg><span><template v-for="(w, i) in c.who" :key="w"><br v-if="i">{{ w }}</template></span></p>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.cc {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;
}
.cc__col {
  position: relative;
  border-top: 1px solid var(--line-strong);
}
.cc__col::before {
  content: "";
  position: absolute;
  left: 0;
  top: -1px;
  width: 48px;
  height: 3px;
  background: var(--tone-recommend);
}
.cc__col.is-cannot::before {
  background: var(--tone-caution);
}
.cc__col header {
  padding: 14px 0 6px;
}
.is-can .fx-caption {
  color: var(--tone-recommend-ink);
}
.is-cannot .fx-caption {
  color: var(--tone-caution-ink);
}
.cc__col li {
  padding: 18px 0;
  border-top: 1px solid var(--line);
}
.cc__col li:first-child {
  border-top: 0;
}
.cc__head {
  margin: 0;
  font-size: var(--fs-body);
  font-weight: 500;
  line-height: 1.6;
}
.cc__sub {
  margin: 4px 0 0;
  font-size: var(--fs-note);
  color: var(--muted);
}
.cc__who {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 8px 0 0;
  font-size: var(--fs-note);
  line-height: 1.6;
  color: var(--tone-recommend-ink);
}
.cc__who svg {
  overflow: visible;
}
</style>
