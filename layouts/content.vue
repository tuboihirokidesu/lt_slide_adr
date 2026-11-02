<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const props = defineProps<{ tag?: string; chapter?: string }>()

const { $nav, $page, $renderContext } = useSlideContext()
// 書き出し（自動操作のブラウザ）や一覧では、ループする光を止めて静止画として整える
const isStatic = computed(
  () => !['slide', 'presenter'].includes($renderContext.value) || (typeof navigator !== 'undefined' && navigator.webdriver),
)

const pageNo = computed(() => String($page.value).padStart(2, '0'))
const total = computed(() => String($nav.value.total).padStart(2, '0'))
const chapterNo = computed(() => props.chapter?.split(' ')[0])
const chapterName = computed(() => props.chapter?.split(' ').slice(1).join(' '))
</script>

<template>
  <div class="slidev-layout fig" :class="{ 'is-static': isStatic }">
    <p class="fig__eyebrow">
      <span v-if="chapter" class="fig__chapter"><b>{{ chapterNo }}</b>{{ chapterName }}</span>
      <span class="fig__page" aria-hidden="true">{{ pageNo }}<b>/</b>{{ total }}</span>
    </p>
    <span v-if="tag" class="fig__tag">{{ tag }}</span>
    <slot />
  </div>
</template>

<style scoped>
.fig {
  position: relative;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 58px 60px 34px;
}
.fig__eyebrow {
  position: absolute;
  top: 22px;
  left: 60px;
  right: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}
.fig__chapter {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-sans);
  letter-spacing: 0.08em;
}
.fig__chapter b {
  font-family: var(--font-mono);
  font-weight: 700;
  color: var(--ink);
  letter-spacing: 0.04em;
}
.fig__chapter b::after {
  content: "";
  display: inline-block;
  vertical-align: middle;
  width: 18px;
  height: 1px;
  margin-left: 10px;
  background: var(--line-strong);
}
.fig__page {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
  font-variant-numeric: tabular-nums;
}
.fig__page b {
  font-weight: 400;
  opacity: 0.5;
}
.fig__tag {
  position: absolute;
  top: 56px;
  right: 60px;
  padding: 5px 14px;
  border-radius: 999px;
  border: 1px solid var(--amber);
  background: var(--amber-fill);
  color: var(--amber-ink);
  font-size: 13px;
  font-weight: 700;
}
</style>
