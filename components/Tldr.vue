<script setup lang="ts">
const conditions = ['戻しにくい', 'コードを読んでも理由が分からない', 'エージェントが再提案してくる']

const points = [
  { head: ['価値は、捨てた案と', 'revisit-if にある。'], sub: '採用した案はコードから読める。却下した案はコードに残らない。' },
  { head: ['ADR は理由を書く。', '強制は lint と CI。'], sub: '散文はコンパイルされない。守らせたい境界はコードに落とし、ADR から指す。' },
  { head: ['置き場所は docs/adr/。', 'AGENTS.md には1行だけ。'], sub: 'Accepted は書き換えない。変えるときは新しい ADR で Superseded にする。' },
  { head: ['書くのはエージェント、', 'Accepted にするのは人間。'], sub: 'いちばんの失敗は、書かれないこと。下書きはエージェントに任せ、捨てた案の理由は人間が直す。' },
]
const no = (i: number) => String(i + 2).padStart(2, '0')
</script>

<template>
  <div class="tldr">
    <div class="fx-box fx-box--recommend tldr__main">
      <span class="tldr__no">01</span>
      <p class="tldr__yes">必要。</p>
      <p class="tldr__lede">ただし、<span class="fx-no">全部を記録する設計書</span>ではなく、</p>
      <ul class="tldr__conds">
        <li v-for="c in conditions" :key="c">{{ c }}</li>
      </ul>
      <p class="tldr__head">この3つが重なる決定だけを、<br>半ページで残す。</p>
      <p class="tldr__sub">エージェントはセッションをまたいで記憶を持たず、一度捨てた案を一般論として丁寧に再提案してくる。</p>
    </div>
    <div v-for="(p, i) in points" :key="p.sub" class="fx-box tldr__pt">
      <span class="tldr__no">{{ no(i) }}</span>
      <strong><span v-for="h in p.head" :key="h" class="tldr__line">{{ h }}</span></strong>
      <p>{{ p.sub }}</p>
    </div>
  </div>
</template>

<style scoped>
.tldr {
  display: grid;
  grid-template-columns: 320px 1fr 1fr;
  grid-auto-rows: 1fr;
  gap: 12px;
}
.tldr__main {
  grid-row: span 2;
  display: flex;
  flex-direction: column;
  padding: 20px 22px;
  box-shadow: none;
}
.tldr__no {
  font-family: var(--font-mono);
  font-size: var(--fs-label);
  font-weight: 700;
  letter-spacing: var(--ls-label);
  font-variant-numeric: tabular-nums;
  color: var(--tone-recommend-ink);
}
.tldr__yes {
  margin: 6px 0 0;
  font-size: var(--fs-title);
  font-weight: 700;
  line-height: 1.2;
  color: var(--tone-recommend-ink);
}
.tldr__lede {
  margin: 8px 0 0;
  font-size: var(--fs-note);
  font-weight: 600;
  line-height: 1.7;
  color: var(--ink-2);
}
.tldr__conds {
  margin: 10px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 6px;
}
.tldr__conds li {
  padding: 5px 12px;
  border-radius: var(--r-chip);
  background: var(--surface);
  border: 1px solid var(--tone-recommend-line);
  font-size: var(--fs-note);
  font-weight: 700;
  color: var(--tone-recommend-ink);
}
.tldr__head {
  margin: 14px 0 0;
  font-size: var(--fs-body);
  font-weight: 700;
  line-height: 1.55;
}
.tldr__sub {
  margin: auto 0 0;
  padding-top: 12px;
  font-size: var(--fs-note);
  line-height: 1.6;
  color: var(--muted);
}
.tldr__pt {
  display: flex;
  flex-direction: column;
  padding: 16px 18px;
}
.tldr__pt .tldr__no {
  color: var(--muted);
}
.tldr__pt strong {
  margin-top: 8px;
  font-size: var(--fs-body);
  font-weight: 700;
  line-height: 1.5;
}
.tldr__line {
  display: block;
  white-space: nowrap;
}
.tldr__pt p {
  margin: 8px 0 0;
  font-size: var(--fs-note);
  line-height: 1.6;
  color: var(--ink-2);
}
</style>
