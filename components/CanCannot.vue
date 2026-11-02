<script setup lang="ts">
const can = [
  { head: '却下済みの案の再提案を防ぐ。' },
  { head: '新しいセッションの立ち上がりが速くなる。' },
  { head: 'レビューで「なぜ」を説明する手間が減る。' },
  { head: '人間の新メンバーのオンボーディングにも効く。', sub: 'Keeling のデータで、最も確かな効果。' },
]
const cannot = [
  { head: ['境界違反の自動検出'], who: 'lint・CI の役目' },
  { head: ['ADR が古いかどうかを、', 'エージェントが自分で判断する'], who: 'status 欄と索引で、人間が示す' },
]
</script>

<template>
  <div class="cc">
    <section class="cc__col is-can">
      <header><span class="fx-label-mono">できること</span></header>
      <ol>
        <li v-for="(c, i) in can" :key="c.head">
          <b>{{ String(i + 1).padStart(2, '0') }}</b>
          <p><strong>{{ c.head }}</strong><small v-if="c.sub">{{ c.sub }}</small></p>
        </li>
      </ol>
    </section>
    <section class="cc__col is-cannot">
      <header><span class="fx-label-mono">できないこと</span></header>
      <ul>
        <li v-for="c in cannot" :key="c.who">
          <p class="cc__no"><template v-for="(h, i) in c.head" :key="h"><br v-if="i"><span class="fx-no">{{ h }}</span></template></p>
          <p class="cc__who"><svg viewBox="0 0 30 12" width="30" height="12" aria-hidden="true"><Edge d="M1 6 H28" :end="[28, 6]" dir="r" tone="teal" /></svg><span>{{ c.who }}</span></p>
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
  background: var(--teal);
}
.cc__col.is-cannot::before {
  background: var(--amber);
}
.cc__col header {
  padding: 14px 0 6px;
}
.is-can .fx-label-mono {
  color: var(--teal-ink);
}
.is-cannot .fx-label-mono {
  color: var(--amber-ink);
}
.cc__col li {
  padding: 16px 0;
  border-top: 1px solid var(--line);
}
.cc__col li:first-child {
  border-top: 0;
}
.is-can li {
  display: grid;
  grid-template-columns: 34px 1fr;
  align-items: baseline;
}
.is-can b {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  color: var(--teal-ink);
}
.is-can p {
  margin: 0;
}
.is-can strong {
  display: block;
  font-size: 19px;
  font-weight: 700;
  line-height: 1.5;
}
.is-can small {
  display: block;
  margin-top: 2px;
  font-size: 13.5px;
  color: var(--muted);
}
.cc__no {
  margin: 0;
  font-size: 19px;
  font-weight: 700;
  line-height: 1.6;
}
.cc__no .fx-no {
  color: var(--ink-2);
}
.cc__who {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px 0 0;
  font-size: 15px;
  font-weight: 700;
  color: var(--teal-ink);
}
.cc__who svg {
  overflow: visible;
}
</style>
