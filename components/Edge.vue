<script setup lang="ts">
import { computed } from 'vue'

type Dir = 'r' | 'l' | 'u' | 'd'

const props = withDefaults(
  defineProps<{
    d: string
    end?: [number, number]
    dir?: Dir
    on?: boolean
    tone?: 'muted' | 'teal' | 'amber' | 'blue'
    dashed?: boolean
    delay?: number
  }>(),
  { on: true, tone: 'muted', dashed: false, delay: 0 },
)

const head = computed(() => {
  if (!props.end || !props.dir) return ''
  const [x, y] = props.end
  const l = 8
  const w = 4.5
  switch (props.dir) {
    case 'r': return `${x - l},${y - w} ${x},${y} ${x - l},${y + w}`
    case 'l': return `${x + l},${y - w} ${x},${y} ${x + l},${y + w}`
    case 'd': return `${x - w},${y - l} ${x},${y} ${x + w},${y - l}`
    case 'u': return `${x - w},${y + l} ${x},${y} ${x + w},${y + l}`
  }
  return ''
})
</script>

<template>
  <g
    :class="[`is-${tone}`, { 'is-on': on, 'is-dashed': dashed }]"
    :style="{ '--d': `${delay}ms` }"
  >
    <path class="fx-edge" fill="none" :d="d" :pathLength="dashed ? undefined : 1" />
    <polygon v-if="head" class="fx-head" :points="head" />
  </g>
</template>
