<script setup lang="ts">
import { computed } from 'vue'
import { useIsSlideActive, useSlideContext } from '@slidev/client'

defineProps<{ night?: boolean; accent?: 'teal' | 'amber' }>()

const active = useIsSlideActive()
const { $renderContext } = useSlideContext()
const shown = computed(() => active.value || $renderContext.value !== 'slide')
</script>

<template>
  <div class="slidev-layout cover-x" :class="{ 'is-shown': shown, 'is-night': night, 'is-amber': accent === 'amber' }">
    <div class="cover-x__glow" aria-hidden="true" />
    <div class="cover-x__grid" aria-hidden="true" />

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
/* 右の図の真後ろから滲む光 */
.cover-x__glow {
  position: absolute;
  right: 150px;
  top: 50%;
  width: 520px;
  height: 520px;
  margin-top: -260px;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(31, 196, 201, 0.22), rgba(31, 196, 201, 0.06) 55%, transparent);
  opacity: 0;
  transform: scale(0.85);
  transition: opacity 1200ms var(--ease-out) 300ms, transform 1600ms var(--ease-out) 300ms;
  pointer-events: none;
}
.is-shown .cover-x__glow {
  opacity: 1;
  transform: none;
}
.cover-x__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(170, 205, 222, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(170, 205, 222, 0.05) 1px, transparent 1px);
  background-size: 46px 46px;
  mask-image: radial-gradient(ellipse 70% 80% at 75% 50%, #000 20%, transparent 75%);
  pointer-events: none;
}
/* 昼の表紙：光と方眼を淡くし、強調語は濃い teal で読ませる */
.cover-x:not(.is-night) .cover-x__glow {
  background: radial-gradient(closest-side, rgba(0, 140, 149, 0.13), rgba(0, 140, 149, 0.04) 55%, transparent);
}
.cover-x:not(.is-night) .cover-x__grid {
  background-image:
    linear-gradient(to right, rgba(22, 41, 59, 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(22, 41, 59, 0.06) 1px, transparent 1px);
}
.cover-x:not(.is-night) .copy :deep(h1 em) {
  background-image: linear-gradient(100deg, var(--teal-ink), #0a9aa3);
}
.copy,
.art {
  position: relative;
}
.copy :deep(h1) {
  font-size: 42px;
  word-break: keep-all;
  line-height: 1.32;
  letter-spacing: -0.01em;
  font-weight: 700;
}
.copy :deep(h1 em) {
  font-style: normal;
  background: linear-gradient(100deg, var(--teal-ink), #b9f2f3);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.copy :deep(.lead) {
  margin-top: 26px;
  font-size: 16px;
  line-height: 1.8;
  font-weight: 500;
  color: var(--ink-2);
}

/* 強調語を No・却下の色で光らせる */
.cover-x.is-amber .copy :deep(h1 em) {
  background-image: linear-gradient(100deg, #f0a42b, #ffd895);
}

/* 見出しは1行ずつ、下から持ち上がる */
.copy :deep(h1),
.copy :deep(.lead) {
  opacity: 0;
  transform: translateY(14px);
  filter: blur(4px);
  transition:
    opacity 800ms var(--ease-out),
    transform 900ms var(--ease-out),
    filter 800ms var(--ease-out);
}
.copy :deep(.lead) {
  transition-delay: 180ms;
}
.is-shown .copy :deep(h1),
.is-shown .copy :deep(.lead) {
  opacity: 1;
  transform: none;
  filter: none;
}
</style>
