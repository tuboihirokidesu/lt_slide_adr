<script setup lang="ts">
import { computed } from 'vue'
import { useIsSlideActive, useSlideContext } from '@slidev/client'

const props = withDefaults(defineProps<{ chapter?: string; kicker?: string; tone?: 'teal' | 'amber' | 'blue' }>(), { tone: 'teal' })

const active = useIsSlideActive()
const { $renderContext } = useSlideContext()
const shown = computed(() => active.value || $renderContext.value !== 'slide')
const toneClass = computed(() => `tone-${props.tone}`)
</script>

<template>
  <div class="slidev-layout is-night section-x" :class="[toneClass, { 'is-shown': shown }]">
    <!-- 章番号は画面からはみ出す大きさで、奥に沈める -->
    <span v-if="chapter" class="section-x__num" aria-hidden="true">{{ chapter }}</span>

    <!-- 光が上から下へ一度だけ走る柱 -->
    <div class="section-x__spine" aria-hidden="true"><i /></div>

    <div class="section-x__copy">
      <p v-if="kicker" class="section-x__kicker">
        <span v-if="chapter">Chapter {{ chapter }}</span><b />{{ kicker }}
      </p>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.section-x {
  --accent: var(--teal);
  --accent-ink: var(--teal-ink);
  position: relative;
  overflow: hidden;
  height: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 14px 1fr;
  align-items: center;
  gap: 44px;
  padding: 0 84px;
  background:
    radial-gradient(ellipse 60% 90% at 0% 50%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 70%),
    var(--bg);
}
.tone-amber {
  --accent: #f0a42b;
  --accent-ink: #ffc766;
}
.tone-blue {
  --accent: var(--ext);
  --accent-ink: var(--ext-ink);
}
.section-x__num {
  position: absolute;
  right: -24px;
  bottom: -96px;
  font-family: var(--font-sans);
  font-size: 330px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.06em;
  font-variant-numeric: tabular-nums;
  color: transparent;
  -webkit-text-stroke: 1.2px color-mix(in srgb, var(--accent) 34%, transparent);
  background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%);
  -webkit-background-clip: text;
  background-clip: text;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1100ms var(--ease-out) 150ms, transform 1400ms var(--ease-out) 150ms;
  user-select: none;
}
.is-shown .section-x__num {
  opacity: 1;
  transform: none;
}
.section-x__spine {
  position: relative;
  height: 180px;
  border-radius: 5px;
  overflow: hidden;
  background: color-mix(in srgb, var(--accent) 30%, transparent);
  box-shadow: 0 0 32px color-mix(in srgb, var(--accent) 45%, transparent);
  transform: scaleY(0.2);
  transform-origin: 50% 0;
  opacity: 0;
  transition: transform 900ms var(--ease-move), opacity 400ms ease;
}
.is-shown .section-x__spine {
  transform: none;
  opacity: 1;
}
.section-x__spine i {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent, var(--accent) 35%, #fff 50%, var(--accent) 65%, transparent);
  background-size: 100% 300%;
  background-position: 0 100%;
}
.is-shown .section-x__spine i {
  animation: spine-run 1600ms var(--ease-move) 500ms both;
}
@keyframes spine-run {
  from { background-position: 0 100%; }
  to { background-position: 0 0%; }
}
.section-x__copy {
  position: relative;
}
.section-x__kicker {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 0 0 20px;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent-ink);
}
.section-x__kicker span {
  color: var(--muted);
}
.section-x__kicker b {
  width: 28px;
  height: 1px;
  background: currentColor;
  opacity: 0.6;
}
.section-x :deep(h1) {
  font-size: 54px;
  line-height: 1.25;
  letter-spacing: -0.01em;
}
.section-x :deep(.lead) {
  margin-top: 20px;
  font-size: 17px;
  font-weight: 500;
  color: var(--ink-2);
}
.section-x__copy > *,
.section-x__copy :deep(> *) {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 700ms var(--ease-out), transform 800ms var(--ease-out);
}
.is-shown .section-x__copy > *,
.is-shown .section-x__copy :deep(> *) {
  opacity: 1;
  transform: none;
}
.is-shown .section-x__copy :deep(h1) { transition-delay: 120ms; }
.is-shown .section-x__copy :deep(.lead) { transition-delay: 240ms; }
</style>
