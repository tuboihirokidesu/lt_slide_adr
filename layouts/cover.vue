<script setup lang="ts">
import { computed } from 'vue'
import { useIsSlideActive, useSlideContext } from '@slidev/client'

defineProps<{ accent?: 'recommend' | 'caution' }>()

const active = useIsSlideActive()
const { $renderContext } = useSlideContext()
const shown = computed(() => active.value || $renderContext.value !== 'slide')
</script>

<template>
  <div class="slidev-layout cover-x" :class="{ 'is-shown': shown, 'is-caution': accent === 'caution' }">
    <div class="copy">
      <slot />
    </div>
    <div class="art"><slot name="art" :shown="shown" /></div>
  </div>
</template>

<style scoped>
.cover-x {
  position: relative;
  overflow: hidden;
  height: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 400px;
  align-items: center;
  gap: 28px;
  padding: 0 64px;
  background: var(--bg);
}
.copy :deep(h1) {
  font-size: var(--fs-display);
  word-break: keep-all;
  line-height: 1.32;
  letter-spacing: var(--ls-display);
  font-weight: 700;
}
.copy :deep(h1 em) {
  font-style: normal;
  color: var(--tone-recommend-ink);
}
.copy :deep(.lead) {
  margin-top: 26px;
  font-size: var(--fs-body);
  line-height: 1.8;
  font-weight: 400;
  color: var(--ink-2);
}

/* 表紙と結びの強調語は「No」そのものなので、却下の色にする */
.cover-x.is-caution .copy :deep(h1 em) {
  display: inline-block;
  line-height: 1.15;
  color: var(--tone-caution);
  /* 却下の語に、手で引いた下線を1本だけ添える（線は setup/sketch.ts が描く） */
  border-bottom: 3px solid var(--tone-caution);
}

/* 見出しは1行ずつ、下から持ち上がる */
.copy :deep(h1),
.copy :deep(.lead) {
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity 800ms var(--ease-out),
    transform 900ms var(--ease-out);
}
.copy :deep(.lead) {
  transition-delay: 180ms;
}
.is-shown .copy :deep(h1),
.is-shown .copy :deep(.lead) {
  opacity: 1;
  transform: none;
}
</style>
