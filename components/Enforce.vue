<script setup lang="ts">
withDefaults(defineProps<{ stage?: number }>(), { stage: 0 })

const lint = [
  { cls: 'is-path', text: 'src/db/users.ts:3:1' },
  { cls: 'is-err', text: "error  'some-orm' の import は禁止" },
  { cls: 'is-ref', text: '       ADR-0012「ORM を導入しない」' },
  { cls: 'is-dim', text: '       docs/adr/0012-no-orm.md' },
  { cls: 'is-dim', text: '       代わりに sql/ のクエリと型生成を使う' },
  { cls: 'is-sum', text: '✖ 1 problem (1 error)' },
]
</script>

<template>
  <div class="enf">
    <div class="enf__row">
      <div class="enf__col">
        <p class="enf__role"><b>ADR</b>理由を書く</p>
        <AdrPaper class="enf__paper" no="0012" file="0012-no-orm.md" status="accepted" title="ORM を導入しない。">
          <p class="fx-paper__h">Decision</p>
          <p class="enf__text">クエリは生 SQL で書く。</p>
          <div class="enf__field">
            <p class="fx-paper__h">Enforcement</p>
            <p class="enf__text"><code>no-restricted-imports</code>（ORM パッケージ）</p>
          </div>
        </AdrPaper>
      </div>

      <div class="enf__mid">
        <svg viewBox="0 0 150 150" width="150" height="150" aria-hidden="true">
          <Edge d="M2 46 H148" :end="[148, 46]" dir="r" tone="teal" :on="stage >= 1" />
          <Edge d="M148 112 H2" :end="[2, 112]" dir="l" tone="amber" :on="stage >= 2" />
        </svg>
        <span class="fx-label fx-label--teal enf__l1" :class="{ 'is-on': stage >= 1 }">Enforcement 欄が<br>ルールを指す</span>
        <span class="fx-label fx-label--amber enf__l2" :class="{ 'is-on': stage >= 2 }">エラーが<br>ADR 番号を引く</span>
      </div>

      <div class="enf__col">
        <p class="enf__role"><b>lint・CI</b>強制する</p>
        <div class="enf__term is-night">
          <p class="enf__bar"><i /><i /><i /><span>pnpm lint</span></p>
          <p v-for="l in lint" :key="l.text" :class="l.cls">{{ l.text }}</p>
        </div>
      </div>
    </div>

    <div class="enf__foot">
      <figure class="enf__quote">
        <blockquote class="fx-quote">When documentation falls short, we promote the rule into code</blockquote>
        <figcaption class="fx-cite">OpenAI · Harness engineering</figcaption>
      </figure>
      <p class="enf__note">強制できない「当面〜しない」系の決定は、ADR とレビューで守る。それで十分。</p>
    </div>
  </div>
</template>

<style scoped>
.enf__row {
  display: grid;
  grid-template-columns: 1fr 150px 1fr;
  align-items: stretch;
}
.enf__col {
  display: flex;
  flex-direction: column;
}
.enf__role {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 0 0 8px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--muted);
}
.enf__role b {
  font-size: 18px;
  font-weight: 700;
  color: var(--ink);
}
.enf__paper,
.enf__term {
  flex: 1;
}
.enf__text {
  margin: 0;
  font-size: 13.5px;
}
.enf__text code {
  font-size: 12.5px;
}
.enf__field {
  margin: 10px -8px 0;
  padding: 0 8px 8px;
  border-radius: var(--r-chip);
  background: var(--teal-fill);
  border: 1.5px solid var(--teal-line);
}
.enf__field .fx-paper__h {
  margin-top: 6px;
  color: var(--teal-ink);
}
.enf__mid {
  position: relative;
  height: 150px;
  align-self: center;
  margin-top: 30px;
}
.enf__mid svg {
  overflow: visible;
}
.enf__l1,
.enf__l2 {
  left: 0;
  right: 0;
  text-align: center;
  white-space: normal;
  font-size: 12px;
  line-height: 1.4;
}
.enf__l1 {
  top: 2px;
}
.enf__l2 {
  top: 120px;
}
.enf__term {
  box-sizing: border-box;
  padding: 0 0 14px;
  border-radius: var(--r-doc);
  background: var(--paper);
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.75;
  color: var(--ink-2);
  white-space: pre;
  overflow: hidden;
}
.enf__term p {
  margin: 0;
  padding: 0 16px;
}
.enf__term .enf__bar {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--line);
  color: var(--muted);
  font-size: 11px;
}
.enf__bar i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--line-strong);
}
.enf__bar span {
  margin-left: 8px;
}
.enf__term .is-path,
.enf__term .is-dim {
  color: var(--muted);
}
.enf__term .is-err {
  color: var(--amber-ink);
}
.enf__term .is-ref {
  color: var(--teal-ink);
  font-weight: 700;
}
.enf__term .is-sum {
  margin-top: 10px;
  color: var(--amber-ink);
  font-weight: 700;
}
.enf__foot {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: center;
  margin-top: 22px;
  padding-top: 16px;
  border-top: 1px solid var(--line-strong);
}
.enf__quote {
  margin: 0;
}
.enf__quote .fx-quote {
  font-size: 18px;
}
.enf__note {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.65;
}
</style>
