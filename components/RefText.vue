<script setup lang="ts">
import type { Inline } from '../data/sources'

defineProps<{ text: Inline | Inline[] }>()
</script>

<template><template v-for="(t, i) in [text].flat()" :key="i"><Ref v-if="typeof t === 'object'" :id="t.ref" :label="t.label" /><template v-else>{{ t }}</template></template></template>
