<script setup lang="ts">
withDefaults(defineProps<{ stage?: number }>(), { stage: 0 })
</script>

<template>
  <div class="flip">
    <div class="flip__col">
      <span class="fx-caption">人間だけのチーム</span>
      <p class="flip__word is-old" :class="{ 'is-past': stage >= 1 }">読まれない</p>
      <p class="flip__src"><Ref id="keeling" />「一度読んだら、何か月も見返さない」</p>
      <p class="flip__why fx-enter" :class="{ 'is-on': stage >= 1 }">エージェントは毎セッション、<br>関係する ADR を読み直す。</p>
    </div>

    <svg class="flip__arrow fx-enter" :class="{ 'is-on': stage >= 1 }" viewBox="0 0 64 20" width="64" height="20" aria-hidden="true">
      <Edge d="M4 10 H60" :end="[60, 10]" dir="r" :on="stage >= 1" />
    </svg>

    <div class="flip__col fx-enter" :class="{ 'is-on': stage >= 1 }" style="--d: 250ms">
      <span class="fx-caption">エージェントと働くチーム</span>
      <p class="flip__word">古い ADR に従う</p>
      <p class="flip__src"><Ref id="uehra" />「ADR が多すぎて、AI が古い決定に従った」</p>
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
  grid-template-columns: 1fr 64px 1.2fr;
  gap: 0 28px;
  align-items: start;
}
.flip__arrow {
  margin-top: 44px;
}
.flip__col {
  display: flex;
  flex-direction: column;
}
.flip__word {
  margin: 14px 0 0;
  font-size: var(--fs-title);
  white-space: nowrap;
  font-weight: 500;
  line-height: 1.35;
  color: var(--tone-caution-ink);
}
/* 古い弱点は線で消さず、色を落として「もう問題ではない」と示す */
.flip__word.is-old {
  transition: color 450ms var(--ease-out);
}
.flip__word.is-past,
.is-static .flip__word.is-old {
  color: var(--muted);
}
.flip__src {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 20px 0 0;
  font-size: var(--fs-note);
  line-height: 1.6;
  color: var(--muted);
}
.flip__src > :first-child {
  flex: none;
}
.flip__why {
  margin: 40px 0 0;
  padding-left: 16px;
  border-left: 2px solid var(--tone-recommend);
  font-size: var(--fs-body);
  font-weight: 400;
  line-height: 1.6;
  color: var(--tone-recommend-ink);
}
.flip__fix {
  margin-top: 40px;
  padding: 18px 24px;
  border-radius: var(--r-box);
  border: 1.5px solid var(--tone-recommend-line);
  background: var(--tone-recommend-fill);
}
.flip__fix strong {
  display: block;
  font-size: var(--fs-body);
  font-weight: 700;
  color: var(--tone-recommend-ink);
}
.flip__fix span {
  display: block;
  margin-top: 4px;
  font-size: var(--fs-note);
  line-height: 1.6;
  color: var(--ink-2);
}
</style>
