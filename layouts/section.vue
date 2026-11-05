<script setup lang="ts">
import { computed } from 'vue'
import { useIsSlideActive, useSlideContext } from '@slidev/client'
import { chapters } from '../data/chapters'

const props = defineProps<{ chapter?: string; kicker?: string }>()

const active = useIsSlideActive()
const { $renderContext } = useSlideContext()
const shown = computed(() => active.value || $renderContext.value !== 'slide')
const chapterNo = computed(() => (props.chapter ? Number(props.chapter) : undefined))
</script>

<template>
  <div class="slidev-layout section-x" :class="{ 'is-shown': shown }">
    <p v-if="kicker" class="section-x__kicker">
      <span v-if="chapterNo">第{{ chapterNo }}章</span>{{ kicker }}
    </p>
    <slot />
    <!-- いまどこにいるか。今の章を手描きの線で囲む（線は setup/sketch.ts が描く） -->
    <ol v-if="chapterNo" class="section-x__map" aria-label="章の位置">
      <li
        v-for="(c, i) in chapters"
        :key="c.no"
        :class="{ 'is-done': Number(c.no) < chapterNo, 'is-here': Number(c.no) === chapterNo }"
      >
        <span v-if="i > 0" class="section-x__link" aria-hidden="true" />{{ c.title }}
      </li>
    </ol>
  </div>
</template>

<style scoped>
.section-x {
  position: relative;
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
  color: var(--ink);
}
.section-x__map {
  position: absolute;
  left: 96px;
  bottom: 56px;
  display: flex;
  align-items: center;
  gap: 32px;
  font-size: var(--fs-note);
  color: var(--line-strong);
}
.section-x__map li {
  position: relative;
  padding: 4px 14px;
}
/* 章のあいだは短い手描きの線でつなぐ */
.section-x__link {
  position: absolute;
  left: -26px;
  top: 50%;
  width: 20px;
  border-top: var(--w-hair) solid var(--line);
}
.section-x__map li.is-done {
  color: var(--muted);
}
.section-x__map li.is-here {
  color: var(--ink);
  font-weight: 700;
  border: var(--w-em) solid var(--ink);
  border-radius: 999px;
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
