<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const { $page, $renderContext } = useSlideContext()
// 書き出し（自動操作のブラウザ）や一覧では、ループする光を止めて静止画として整える
const isStatic = computed(
  () => !['slide', 'presenter'].includes($renderContext.value) || (typeof navigator !== 'undefined' && navigator.webdriver),
)
</script>

<template>
  <div class="slidev-layout fig" :class="{ 'is-static': isStatic }">
    <span class="fig__page" aria-hidden="true">{{ $page }}</span>
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
  padding: 44px 60px 34px;
}
.fig__page {
  position: absolute;
  right: 28px;
  bottom: 14px;
  font-size: var(--fs-note);
  font-variant-numeric: tabular-nums;
  color: var(--muted);
}
</style>
