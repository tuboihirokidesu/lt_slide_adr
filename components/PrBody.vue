<script setup lang="ts">
// 記入例は架空の N+1 の修正。足した2欄だけを強調する
const sections: { h: string; lines?: string[]; add?: boolean; aside?: string }[] = [
  { h: '目的と概要', lines: ['注文一覧で明細を1件ずつ取っていた N+1 を解消する。'] },
  { h: '利用者から見た変化、環境変数', aside: '省略' },
  { h: '実装方針', lines: ['注文と明細を JOIN した1本の SQL で取る。'] },
  { h: '採らなかった案と理由', lines: ['DataLoader。呼び出しが1か所で、層を足すほどではない。', 'ORM の eager loading。ADR-0012 で却下済み。'], add: true },
  { h: '動作確認と結果', lines: ['明細100件の注文で、クエリが101回から1回に減った。', '未確認：本番相当のデータ量。'] },
  { h: '関連 ADR', lines: ['ADR-0012 を参照。新規は不要：方式を変えない修正のため。'], add: true },
]

const questions = [
  { q: 'マージした後も効くか。', to: '効くなら ADR の草案（proposed）にする。', adr: true },
  { q: '採らなかった案は、また提案されそうか。', to: 'されそうなら ADR の草案にする。', adr: true },
  { q: '方式を替えたら書き換わるか。', to: '書き換わるなら PR 本文に残す。' },
]
</script>

<template>
  <div class="pr">
    <div class="fx-paper pr__doc">
      <div class="fx-paper__head"><span>pull_request_template.md</span><span>記入例</span></div>
      <div class="fx-paper__body">
        <section v-for="s in sections" :key="s.h" class="pr__sec" :class="{ 'is-add': s.add }">
          <p class="fx-paper__h">{{ s.h }}<span v-if="s.add" class="pr__added">追加した欄</span><span v-if="s.aside" class="pr__aside">（{{ s.aside }}）</span></p>
          <p v-for="l in s.lines" :key="l" class="pr__line">{{ l }}</p>
        </section>
      </div>
    </div>

    <div class="pr__side">
      <p class="fx-caption">ADR に上げるかを決める問い</p>
      <ol class="pr__qs">
        <li v-for="x in questions" :key="x.q" :class="{ 'is-adr': x.adr }">
          <p class="pr__q">{{ x.q }}</p>
          <p class="pr__to">
            <svg viewBox="0 0 24 12" width="24" height="12" aria-hidden="true"><Edge d="M1 6 H22" :end="[22, 6]" dir="r" :tone="x.adr ? 'recommend' : 'muted'" /></svg>
            <span>{{ x.to }}</span>
          </p>
        </li>
      </ol>
      <p class="pr__review">本文はエージェントが書き、依頼した人が承認する。レビュアーは、まず差分だけを読み、次に本文と関連 ADR を読む。</p>
    </div>
  </div>
</template>

<style scoped>
.pr {
  display: grid;
  grid-template-columns: 492px 1fr;
  gap: 36px;
  align-items: start;
}
.pr__doc .fx-paper__body {
  padding: 6px 16px 10px;
}
.pr__sec {
  margin: 0 -8px;
  padding: 2px 8px 4px;
  border-radius: var(--r-mark);
}
.pr__sec .fx-paper__h {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 4px 0 1px;
}
.pr__sec.is-add {
  margin-top: 2px;
  background: var(--tone-recommend-fill);
  box-shadow: inset 2px 0 0 var(--tone-recommend);
}
.pr__sec.is-add .fx-paper__h {
  color: var(--tone-recommend-ink);
}
.pr__added,
.pr__aside {
  font-family: var(--font-sans);
  font-size: var(--fs-note);
  letter-spacing: 0;
}
.pr__line {
  margin: 0;
  font-size: var(--fs-note);
  line-height: 1.55;
  color: var(--ink);
}
.pr__aside {
  margin-left: -8px;
  color: var(--muted);
}
.pr__side .fx-caption {
  margin: 0 0 6px;
}
.pr__qs li {
  padding: 14px 0;
  border-top: 1px solid var(--line);
}
.pr__q {
  margin: 0;
  font-size: var(--fs-body);
  font-weight: 500;
  line-height: 1.5;
}
.pr__to {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 6px 0 0;
  font-size: var(--fs-note);
  line-height: 1.6;
  color: var(--ink-2);
}
.pr__to svg {
  flex: none;
  overflow: visible;
}
.is-adr .pr__to {
  color: var(--tone-recommend-ink);
}
.pr__review {
  margin: 8px 0 0;
  padding-top: 14px;
  border-top: 1px solid var(--line);
  font-size: var(--fs-note);
  line-height: 1.6;
  color: var(--ink-2);
}
</style>
