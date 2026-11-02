<script setup lang="ts">
withDefaults(defineProps<{ stage?: number }>(), { stage: 0 })
</script>

<template>
  <div class="flip">
    <div class="flip__col">
      <span class="fx-label-mono">人間だけのチーム</span>
      <p class="flip__word"><span class="fx-no fx-no--draw" :class="{ 'is-on': stage >= 1 }">読まれない</span></p>
      <p class="flip__src">Michael Keeling「一度読んだら、何か月も見返さない」</p>
      <p class="flip__why fx-enter" :class="{ 'is-on': stage >= 1 }">エージェントは毎セッション、<br>関係する ADR を読み直す。</p>
    </div>

    <svg class="flip__arrow fx-enter" :class="{ 'is-on': stage >= 1 }" viewBox="0 0 64 20" width="64" height="20" aria-hidden="true">
      <Edge d="M4 10 H60" :end="[60, 10]" dir="r" :on="stage >= 1" />
    </svg>

    <div class="flip__col fx-enter" :class="{ 'is-on': stage >= 1 }" style="--d: 250ms">
      <span class="fx-label-mono">エージェントと働くチーム</span>
      <p class="flip__word is-new">古い ADR に従う</p>
      <p class="flip__src">@masayoshi_uehra「ADR が多すぎて、AI が古い決定に従った」</p>
      <div class="flip__fix fx-enter" :class="{ 'is-on': stage >= 2 }">
        <strong>対策は、status 欄と索引。</strong>
        <span>現役（steering）と履歴（superseded）を分け、古さを欄で示す。</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flip {
  display: grid;
  grid-template-columns: 1fr 64px 1.12fr;
  gap: 0 28px;
  align-items: start;
}
.flip__arrow {
  margin-top: 72px;
}
.flip__col {
  display: flex;
  flex-direction: column;
}
.flip__word {
  margin: 18px 0 0;
  font-size: 48px;
  white-space: nowrap;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: var(--amber-ink);
}
.flip__word .fx-no {
  color: var(--amber-ink);
  background-size: 0% 3px;
}
.flip__word .fx-no.is-on,
.is-static .flip__word .fx-no {
  background-size: 100% 3px;
  color: var(--muted);
}
.flip__src {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 16px 0 0;
  font-size: 13px;
  line-height: 1.6;
  color: var(--muted);
}
.flip__why {
  margin: 34px 0 0;
  padding-left: 14px;
  border-left: 2px solid var(--teal);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.6;
  color: var(--teal-ink);
}
.flip__fix {
  margin-top: 34px;
  padding: 14px 20px;
  border-radius: var(--r-box);
  border: 1.5px solid var(--teal-line);
  background: var(--teal-fill);
}
.flip__fix strong {
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: var(--teal-ink);
}
.flip__fix span {
  display: block;
  margin-top: 4px;
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--ink-2);
}
</style>
