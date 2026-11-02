<script setup lang="ts">
withDefaults(defineProps<{ stage?: number }>(), { stage: 0 })

const gaps = ['レビュー', '承認', '番号の衝突', '陳腐化']
</script>

<template>
  <div class="rf">
    <div class="rf__pair">
      <div class="rf__col is-old">
        <span class="fx-label-mono"><Ref id="nygard" label="Nygard" /> 以来の語られ方</span>
        <AdrPaper class="rf__paper" no="0003" file="0003-use-postgresql.md" title="PostgreSQL を採用する。" status="accepted">
          <p class="fx-paper__h">Context</p>
          <div class="rf__bars"><i style="width: 88%" /><i style="width: 60%" /></div>
          <p class="fx-paper__h">Decision</p>
          <div class="rf__bars"><i style="width: 72%" /></div>
        </AdrPaper>
        <p class="rf__cap"><strong>何を採用したか。</strong>採用した内容は、コードを読めば分かる。</p>
      </div>

      <svg class="rf__arrow" viewBox="0 0 64 20" width="64" height="20" aria-hidden="true">
        <Edge d="M4 10 H60" :end="[60, 10]" dir="r" tone="teal" :on="stage >= 1" />
      </svg>

      <div class="rf__col fx-enter" :class="{ 'is-on': stage >= 1 }" style="--d: 300ms">
        <span class="fx-label-mono is-teal"><Ref id="kent" label="Kent" /> の捉え直し</span>
        <AdrPaper class="rf__paper" no="0005" file="0005-no-own-cache-layer.md" title="独自のキャッシュ層を作らない。" status="accepted">
          <p class="fx-paper__h">Considered options</p>
          <p class="rf__opt"><span class="fx-no">Redis を前段に置く</span></p>
          <p class="fx-paper__h">Revisit if</p>
          <p class="fx-revisit rf__revisit">p95 が 800ms を超えたら</p>
        </AdrPaper>
        <p class="rf__cap"><strong>やらない・理由・見直す条件。</strong>却下した案は、コードに残らない。</p>
      </div>
    </div>

    <div class="rf__foot">
      <p class="rf__fail">
        エージェントの失敗は <span class="fx-no">知らないこと</span> より、<br><strong>一般論として妥当な案を、自信をもって再提案すること。</strong>
      </p>
      <div class="rf__gaps">
        <span class="fx-label-mono">動画が触れていない穴</span>
        <p class="rf__chips"><span v-for="g in gaps" :key="g" class="fx-tag fx-tag--muted">{{ g }}</span></p>
        <p class="rf__fill">リポジトリの <Ref id="kody-index" /> と docs:check が埋めている。</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rf__pair {
  display: grid;
  grid-template-columns: 1fr 64px 1fr;
  align-items: stretch;
  gap: 0 16px;
}
.rf__arrow {
  align-self: center;
}
.rf__col {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.rf__col.is-old .rf__paper {
  box-shadow: none;
  background: var(--legacy-fill);
}
.fx-label-mono.is-teal {
  color: var(--teal-ink);
}
.rf__paper {
  flex: 1;
}
.rf__bars {
  display: grid;
  gap: 6px;
  padding-top: 4px;
}
.rf__bars i {
  display: block;
  height: 6px;
  border-radius: 3px;
  background: var(--line);
}
.rf__opt {
  margin: 0;
  font-size: 13px;
}
.rf__revisit {
  margin: 2px 0 0;
  padding: 4px 10px;
  font-size: 12px;
  color: var(--ink-2);
}
.rf__cap {
  margin: 2px 0 0;
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--ink-2);
}
.rf__cap strong {
  display: block;
  font-size: 16px;
  color: var(--ink);
}
.rf__foot {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--line-strong);
}
.rf__fail {
  margin: 0;
  padding-right: 24px;
  font-size: 13.5px;
  line-height: 1.75;
  color: var(--ink-2);
}
.rf__fail strong {
  font-size: 15px;
  color: var(--ink);
}
.rf__gaps {
  padding-left: 24px;
  border-left: 1px solid var(--line);
}
.rf__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 6px 0 0;
}
.rf__fill {
  margin: 6px 0 0;
  font-size: 13.5px;
  color: var(--ink-2);
}
</style>
