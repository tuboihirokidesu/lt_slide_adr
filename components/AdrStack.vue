<script setup lang="ts">
import { computed } from 'vue'
import { useIsSlideActive, useSlideContext } from '@slidev/client'

// cover: 3枚の紙面が重なって現れる。rejected: 結びで、捨てた案の行だけが光る
const props = withDefaults(defineProps<{ focus?: 'cover' | 'rejected' }>(), { focus: 'cover' })

const active = useIsSlideActive()
const { $renderContext } = useSlideContext()
const isStatic = computed(
  () => !['slide', 'presenter'].includes($renderContext.value) || (typeof navigator !== 'undefined' && navigator.webdriver),
)
const shown = computed(() => active.value || isStatic.value)

const back = [
  { no: '0003', file: '0003-keep-monorepo.md', title: 'モノレポを分割しない。', x: 96, y: 0 },
  { no: '0004', file: '0004-no-graphql.md', title: 'GraphQL を導入しない。', x: 48, y: 34 },
]
const options = [
  { text: 'CDN のキャッシュに任せる', kept: true },
  { text: 'Redis を前段に置く', kept: false },
  { text: 'アプリ内にメモリキャッシュを持つ', kept: false },
]
const rejectedFocus = computed(() => props.focus === 'rejected')
</script>

<template>
  <div class="stack-x" :class="{ 'is-static': isStatic, 'is-focus': rejectedFocus }" aria-label="ADR ファイルの紙面が3枚重なっている">
    <AdrPaper
      v-for="(p, i) in back"
      :key="p.no"
      class="stack-x__back fx-enter"
      :class="{ 'is-on': shown }"
      :style="{ left: `${p.x}px`, top: `${p.y}px`, '--d': `${200 + i * 120}ms` }"
      :no="p.no"
      :file="p.file"
      :title="p.title"
      status="accepted"
    />
    <AdrPaper
      class="stack-x__front fx-enter"
      :class="{ 'is-on': shown }"
      style="--d: 440ms"
      no="0005"
      file="0005-no-cache-layer.md"
      title="独自のキャッシュ層を作らない。"
      status="accepted"
    >
      <p class="fx-paper__h">Considered options</p>
      <ul class="stack-x__opts">
        <li v-for="(o, i) in options" :key="o.text" :class="o.kept ? 'is-kept' : 'is-cut'">
          <span v-if="o.kept">{{ o.text }}</span>
          <span v-else class="fx-no fx-no--draw" :class="{ 'is-on': shown }" :style="{ '--d': `${780 + i * 140}ms` }">{{ o.text }}</span>
          <small>{{ o.kept ? '採用' : '却下' }}</small>
        </li>
      </ul>
      <p class="fx-paper__h">Revisit if</p>
      <p class="fx-revisit stack-x__revisit">p95 のレイテンシが 800ms を超えたら</p>
    </AdrPaper>
  </div>
</template>

<style scoped>
.stack-x {
  position: relative;
  width: 400px;
  height: 330px;
}
.stack-x__back,
.stack-x__front {
  position: absolute;
  width: 304px;
}
.stack-x__back {
  height: 150px;
}
.stack-x__back :deep(:is(.fx-paper__head, .fx-paper__body)) {
  opacity: 0.45;
}
.stack-x__back :deep(.fx-paper__title) {
  color: var(--ink-2);
}
.stack-x__front {
  left: 0;
  top: 68px;
}
.stack-x__opts {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 4px;
}
.stack-x__opts li {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  font-size: 13px;
  line-height: 1.55;
}
.stack-x__opts li.is-kept {
  font-weight: 600;
  color: var(--teal-ink);
}
.stack-x__opts small {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  color: var(--muted);
}
.is-cut small {
  color: var(--amber-ink);
}
.stack-x__revisit {
  margin: 0;
  font-size: 12.5px;
  color: var(--ink-2);
}

/* 結び：捨てた案の行だけを残し、ほかは沈める */
.is-focus .stack-x__back :deep(:is(.fx-paper__head, .fx-paper__body)) {
  opacity: 0.2;
}
.is-focus .stack-x__front :deep(:is(.fx-paper__head, .fx-paper__no, .fx-paper__title)),
.is-focus .fx-paper__h,
.is-focus .is-kept,
.is-focus .stack-x__revisit {
  opacity: 0.3;
}
.is-focus .is-cut .fx-no {
  color: var(--amber-ink);
  filter: drop-shadow(0 0 6px rgba(240, 164, 43, 0.55));
}
.is-focus .stack-x__front {
  border-color: rgba(240, 164, 43, 0.28);
}
</style>
