<script setup lang="ts">
export type AdrStatus = 'proposed' | 'accepted' | 'superseded' | 'deprecated'

defineProps<{ no: string; title?: string; file?: string; status?: AdrStatus; statusText?: string }>()
</script>

<template>
  <div class="fx-paper">
    <div class="fx-paper__head">
      <span class="paper__file">{{ file ?? `${no}.md` }}</span>
      <span v-if="status" class="fx-status" :class="`fx-status--${status}`">{{ statusText ?? status }}</span>
    </div>
    <div class="fx-paper__body">
      <span class="fx-paper__no">{{ no }}</span>
      <p v-if="title" class="fx-paper__title">{{ title }}</p>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.paper__file {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
