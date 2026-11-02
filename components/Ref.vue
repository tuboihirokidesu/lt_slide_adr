<script setup lang="ts">
import { sources, type Source, type SourceId } from '../data/sources'

const props = defineProps<{ id: SourceId; label?: string }>()
const src: Source = sources[props.id]
</script>

<template>
  <a v-if="src.url" :href="src.url" target="_blank" rel="noopener">{{ label ?? src.who }}</a>
  <span v-else>{{ label ?? src.who }}</span>
</template>
