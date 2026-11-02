<script setup lang="ts">
import { computed } from 'vue'
import { useIsSlideActive, useSlideContext } from '@slidev/client'

defineProps<{ night?: boolean; accent?: 'recommend' | 'amber' }>()

const active = useIsSlideActive()
const { $renderContext } = useSlideContext()
const shown = computed(() => active.value || $renderContext.value !== 'slide')
</script>

<template>
  <div class="slidev-layout cover-x" :class="{ 'is-shown': shown, 'is-night': night, 'is-caution': accent === 'caution' }">
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
  background: radial-gradient(
    closest-side,
    color-mix(in srgb, var(--tone-recommend) var(--glow-core, 22%), transparent),
    color-mix(in srgb, var(--tone-recommend) var(--glow-edge, 6%), transparent) 55%,
    transparent
  );
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
    linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);
  background-size: 46px 46px;
  mask-image: radial-gradient(ellipse 70% 80% at 75% 50%, black 20%, transparent 75%);
  pointer-events: none;
}
/* 昼の表紙は光を淡くする */
.cover-x:not(.is-night) {
  --glow-core: 13%;
  --glow-edge: 4%;
}
.copy,
.art {
  position: relative;
}
.copy :deep(h1) {
  font-size: var(--fs-display);
  word-break: keep-all;
  line-height: 1.32;
  letter-spacing: -0.01em;
  font-weight: 700;
}
.copy :deep(h1 em) {
  font-style: normal;
  background: linear-gradient(100deg, var(--tone-recommend-ink), var(--tone-recommend-glint));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.copy :deep(.lead) {
  margin-top: 26px;
  font-size: var(--fs-body);
  line-height: 1.8;
  font-weight: 500;
  color: var(--ink-2);
}

/* 表紙と結びの強調語は「No」そのものなので、却下の色で光らせる */
.cover-x.is-caution .copy :deep(h1 em) {
  background-image: linear-gradient(100deg, var(--tone-caution), var(--tone-caution-glint));
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
