<script setup lang="ts">
import { computed } from 'vue'
import { useIsSlideActive, useSlideContext } from '@slidev/client'

const props = defineProps<{ chapter?: string; kicker?: string }>()

const active = useIsSlideActive()
const { $renderContext } = useSlideContext()
const shown = computed(() => active.value || $renderContext.value !== 'slide')
const chapterNo = computed(() => (props.chapter ? Number(props.chapter) : undefined))
</script>

<template>
  <div class="slidev-layout is-night section-x" :class="{ 'is-shown': shown }">
    <p v-if="kicker" class="section-x__kicker">
      <span v-if="chapterNo">第{{ chapterNo }}章</span>{{ kicker }}
    </p>
    <slot />
  </div>
</template>

<style scoped>
.section-x {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 96px;
  background: var(--bg);
}
.section-x__kicker {
  display: flex;
  gap: 1em;
  margin: 0 0 20px;
  font-size: var(--fs-note);
  letter-spacing: 0.04em;
  color: var(--muted);
}
.section-x__kicker span {
  color: var(--tone-recommend-ink);
}
.section-x :deep(h1) {
  font-size: var(--fs-display);
  line-height: 1.3;
  letter-spacing: var(--ls-display);
}
.section-x > * {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 700ms var(--ease-out), transform 800ms var(--ease-out);
}
.is-shown > * {
  opacity: 1;
  transform: none;
}
.is-shown > :deep(h1) {
  transition-delay: 120ms;
}
</style>
