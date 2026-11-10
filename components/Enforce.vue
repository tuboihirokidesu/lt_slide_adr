<script setup lang="ts">
withDefaults(defineProps<{ stage?: number }>(), { stage: 0 })
</script>

<template>
  <div class="enf">
    <div class="enf__grid">
      <AdrPaper class="enf__adr" no="0012" file="0012-no-orm.md" status="accepted" title="ORM を導入しない。">
        <div class="enf__field">
          <p class="fx-paper__h">Enforcement</p>
          <p class="enf__text"><code>no-restricted-imports</code>（<code>.oxlintrc.json</code>）</p>
        </div>
      </AdrPaper>

      <div class="enf__h">
        <svg viewBox="0 0 100 40" width="100" height="40" aria-hidden="true">
          <Edge d="M2 20 H98" :end="[98, 20]" dir="r" tone="recommend" :on="stage >= 1" />
        </svg>
        <span class="fx-label fx-label--recommend enf__hl" :class="{ 'is-on': stage >= 1 }">同じ決定を<br>lint にも書く</span>
      </div>

      <div class="fx-paper enf__file fx-enter" :class="{ 'is-on': stage >= 1 }">
        <div class="fx-paper__head"><span>.oxlintrc.json</span><span>人間が書く</span></div>
        <div class="enf__code">
          <p>"no-restricted-imports": ["error", { "paths": [{</p>
          <p>  "name": "some-orm",</p>
          <p class="is-ref">  "message": "ADR-0012 を参照。sql/ を使う"</p>
          <p>}] }]</p>
        </div>
      </div>

      <div class="enf__v">
        <svg viewBox="0 0 40 52" width="40" height="52" aria-hidden="true">
          <Edge d="M20 50 V2" :end="[20, 2]" dir="u" tone="recommend" :on="stage >= 2" />
        </svg>
        <span class="fx-label fx-label--recommend enf__vl" :class="{ 'is-on': stage >= 2 }">help が ADR を指す</span>
      </div>

      <div class="enf__term">
        <p class="enf__bar">$ pnpm lint</p>
        <div v-if="stage >= 2" class="enf__out">
          <p><span class="is-dim">src/db/users.ts:1:1:</span> <span class="is-err">error</span> eslint(no-restricted-imports): 'some-orm' import is restricted from being used.</p>
          <p class="is-ref">help: ADR-0012 を参照。sql/ を使う</p>
        </div>
        <p v-else class="enf__pass">何も出ずに通る</p>
      </div>

      <div class="enf__h">
        <svg viewBox="0 0 100 40" width="100" height="40" aria-hidden="true">
          <Edge d="M98 20 H2" :end="[2, 20]" dir="l" />
        </svg>
      </div>

      <div class="enf__right">
        <div class="fx-paper enf__file">
          <div class="fx-paper__head"><span>src/db/users.ts</span><span>エージェントが書く</span></div>
          <div class="enf__code">
            <p>import { db } from 'some-orm'</p>
          </div>
        </div>
        <p class="enf__note">強制できない「当面〜しない」系の決定は、<br>ADR とレビューで守る。それで十分。</p>
      </div>
    </div>

    <div class="enf__foot">
      <figure class="enf__quote">
        <blockquote class="fx-quote">When documentation falls short, we promote the rule into code</blockquote>
        <figcaption class="fx-cite"><Ref id="openai" label="OpenAI の記事「Harness engineering」" /></figcaption>
      </figure>
    </div>
  </div>
</template>

<style scoped>
.enf__grid {
  display: grid;
  grid-template-columns: 1fr 100px 420px;
  grid-template-rows: auto 44px auto;
  align-items: start;
}
.enf__v {
  position: relative;
  grid-column: 1;
  justify-self: center;
}
.enf__v svg,
.enf__h svg {
  display: block;
  overflow: visible;
}
.enf__vl {
  top: 12px;
  white-space: nowrap;
  left: 44px;
}
.enf__v + * {
  grid-column: 1;
}
.enf__h {
  position: relative;
  align-self: center;
}
.enf__hl {
  bottom: 44px;
  left: 0;
  right: 0;
  text-align: center;
  line-height: 1.4;
}
.enf__text {
  margin: 0;
  font-size: var(--fs-note);
}
.enf__field {
  margin: 10px -8px 0;
  padding: 0 8px 8px;
  border-radius: var(--r-chip);
  background: var(--tone-recommend-fill);
  border: 1.5px solid var(--tone-recommend-line);
}
.enf__field .fx-paper__h {
  margin-top: 6px;
  color: var(--tone-recommend-ink);
}
.enf__code,
.enf__term {
  font-family: var(--font-mono);
  font-size: var(--fs-label);
  line-height: 1.75;
  color: var(--ink-2);
}
.enf__code {
  padding: 8px 14px 10px;
  white-space: pre;
}
.enf__code p,
.enf__term p {
  margin: 0;
}
.enf__term {
  box-sizing: border-box;
  padding: 0 0 12px;
  border: 1px solid var(--line);
  border-radius: var(--r-doc);
  background: var(--paper);
}
.enf__term .enf__bar {
  margin-bottom: 8px;
  padding: 8px 14px;
  border-bottom: 1px solid var(--line);
  color: var(--muted);
}
.enf__out {
  padding: 0 14px;
}
.enf__out p + p {
  margin-top: 4px;
}
.enf__pass {
  padding: 0 14px;
  font-family: var(--font-sans);
  font-size: var(--fs-note);
  color: var(--muted);
}
.is-dim {
  color: var(--muted);
}
.is-err {
  color: var(--tone-caution-ink);
}
.is-ref {
  color: var(--tone-recommend-ink);
}
.enf__foot {
  margin-top: 14px;
  padding-top: 10px;
  border-top: 1px solid var(--line-strong);
}
.enf__quote {
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin: 0;
}
.enf__quote .fx-quote {
  font-size: var(--fs-body);
  line-height: 1.5;
}
.enf__right {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.enf__note {
  margin: 0;
  font-size: var(--fs-note);
  line-height: 1.65;
  color: var(--ink-2);
}
</style>
