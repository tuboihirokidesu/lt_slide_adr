<script setup lang="ts">
withDefaults(defineProps<{ stage?: number }>(), { stage: 0 })
</script>

<template>
  <div class="rf">
    <div class="rf__pair">
      <div class="rf__col is-old">
        <span class="fx-caption"><Ref id="nygard" label="Nygard" />（2011）の型と例</span>
        <div class="fx-paper rf__paper">
          <div class="fx-paper__head"><span>Documenting Architecture Decisions</span></div>
          <div class="fx-paper__body">
            <p class="fx-paper__title"><code>ADR 9:</code> LDAP for Multitenant Integration</p>
            <p class="fx-paper__h">Context</p>
            <p class="rf__text">This section describes the forces at play, …</p>
            <p class="fx-paper__h">Decision</p>
            <p class="rf__text">“We will …”</p>
            <p class="fx-paper__h">Consequences</p>
            <p class="rf__text">This section describes the resulting context, after applying the decision.</p>
          </div>
        </div>
        <p class="rf__cap"><span class="rf__lead">何を採用したか</span>採用した内容は、コードを読めば分かる。</p>
      </div>

      <svg class="rf__arrow" viewBox="0 0 40 20" width="40" height="20" aria-hidden="true">
        <Edge d="M2 10 H38" :end="[38, 10]" dir="r" tone="recommend" :on="stage >= 1" />
      </svg>

      <div class="rf__col fx-enter" :class="{ 'is-on': stage >= 1 }" style="--d: 300ms">
        <span class="fx-caption is-recommend"><Ref id="kent" label="Kent" /> の書き方（<Ref id="kody" label="Kody" /> の実物）</span>
        <div class="fx-paper rf__paper">
          <div class="fx-paper__head">
            <span><Ref id="kody-0025" label="0025-no-package-services-primitive.md" /></span>
            <span class="fx-status fx-status--accepted">accepted</span>
          </div>
          <div class="fx-paper__body">
            <p class="fx-paper__title"><code>0025:</code> No package services primitive</p>
            <p class="fx-paper__h">Context</p>
            <p class="rf__text">A fleet check found zero running services across 62 users.</p>
            <p class="fx-paper__h">Decision</p>
            <p class="rf__text">Delete the package services primitive, including <code>kody.services</code>, the services MCP domain, and <code>PackageServiceInstance</code>.</p>
          </div>
        </div>
        <p class="rf__cap"><span class="rf__lead">何をやらないか、その理由</span>却下した案は、コードに残らない。</p>
      </div>
    </div>

    <div class="rf__foot">
      <p class="rf__fail">
        <span class="fx-caption">私の見立て</span>エージェントの失敗は、知らないことより、<br><strong>一般論として妥当な案を、自信をもって再提案すること。</strong>
      </p>
      <div class="rf__gaps">
        <p class="rf__fill"><span class="fx-caption">動画が触れていないこと</span>レビュー、承認、番号の衝突、陳腐化。リポジトリの <Ref id="kody-index" /> と docs:check が埋めている。</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rf__pair {
  display: grid;
  grid-template-columns: 1fr 40px 1fr;
  align-items: stretch;
  gap: 0 14px;
}
.rf__arrow {
  align-self: center;
}
.rf__col {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.rf__col.is-old .rf__paper {
  box-shadow: none;
  background: var(--legacy-fill);
}
.fx-caption.is-recommend {
  color: var(--tone-recommend-ink);
}
.rf__paper {
  flex: 1;
}
.rf__paper .fx-paper__title code {
  color: var(--tone-recommend-ink);
}
.rf__col.is-old .fx-paper__title code {
  color: var(--muted);
}
.rf__paper .fx-paper__head {
  padding: 6px 12px;
}
.rf__paper .fx-paper__body {
  padding: 8px 14px 10px;
}
.rf__paper .fx-paper__title {
  margin: 0;
}
.rf__paper .fx-paper__h {
  margin: 6px 0 1px;
}
.rf__text {
  margin: 0;
  font-size: var(--fs-note);
  line-height: 1.5;
  color: var(--ink-2);
}
.rf__cap {
  margin: 0;
  font-size: var(--fs-note);
  line-height: 1.6;
  color: var(--ink-2);
}
.rf__lead {
  display: block;
  font-size: var(--fs-body);
  font-weight: 500;
  color: var(--ink);
}
.rf__foot {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--line-strong);
}
.rf__fail {
  margin: 0;
  padding-right: 24px;
  font-size: var(--fs-note);
  line-height: 1.6;
  color: var(--ink-2);
}
.rf__fail strong {
  font-size: var(--fs-body);
  color: var(--ink);
}
.rf__foot .fx-caption {
  display: inline;
  margin-right: 10px;
}
.rf__gaps {
  padding-left: 24px;
  border-left: 1px solid var(--line);
}
.rf__fill {
  margin: 0;
  font-size: var(--fs-note);
  line-height: 1.6;
  color: var(--ink-2);
}
</style>
