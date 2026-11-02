<script setup lang="ts">
// 所要時間は分。幅があるものは [下限, 上限]
const days = [
  { title: '置き場所を作る', body: 'テンプレート、index.md、このやり方を採用する ADR-0001 を docs/adr/ に置く。', min: [30, 30], label: '30分' },
  { title: '確定済みを3本書く', body: '下書きはエージェント。捨てた案と理由は、自分で直す。', min: [60, 120], label: '1〜2時間' },
  { title: 'つなぐ', body: 'AGENTS.md にポインタと運用ルール。CODEOWNERS と、PR テンプレートの ADR 欄。', min: [30, 30], label: '30分' },
  { title: '判定を skill に', body: '起票するかを3条件と No で判定。不要なら一言で報告させる。', min: [60, 60], label: '1時間' },
  { title: 'CI で確かめる', body: '番号の重複、status、リンク先、索引への掲載を検査。実タスクで参照を確かめる。', min: [60, 120], label: '1〜2時間' },
]
const PX = 0.62
</script>

<template>
  <div class="wk">
    <ol class="wk__days">
      <li v-for="(d, i) in days" :key="d.title">
        <span class="fx-caption">{{ i + 1 }}日目</span>
        <span class="wk__title">{{ d.title }}</span>
        <p>{{ d.body }}</p>
        <div class="wk__time">
          <span class="wk__bar" :style="{ height: `${d.min[1] * PX}px` }">
            <i :style="{ height: `${d.min[0] * PX}px` }" />
          </span>
          <small>{{ d.label }}</small>
        </div>
      </li>
    </ol>
    <p class="wk__month">
      <span class="fx-caption">1か月後に数えるもの</span>
      <span class="wk__line"><span class="wk__good">再提案を止めた件数</span>と、<span class="wk__bad">ADR が古くて邪魔をした件数</span>。書いた本数は数えない。</span>
    </p>
  </div>
</template>

<style scoped>
.wk__days {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0;
}
.wk__days li {
  display: flex;
  flex-direction: column;
  padding: 14px 14px 0;
  border-left: 1px solid var(--line);
  border-top: 1px solid var(--line-strong);
}
.wk__days li:first-child {
  padding-left: 0;
  border-left: 0;
}
.wk__days li .fx-caption {
  font-variant-numeric: tabular-nums;
  color: var(--tone-recommend-ink);
}
.wk__title {
  margin-top: 6px;
  font-size: var(--fs-body);
  font-weight: 500;
  line-height: 1.45;
}
.wk__days p {
  margin: 6px 0 0;
  font-size: var(--fs-note);
  line-height: 1.6;
  color: var(--ink-2);
}
.wk__time {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  height: 84px;
  margin-top: auto;
  padding-top: 12px;
}
.wk__bar {
  position: relative;
  width: 14px;
  border-radius: 4px;
  background: color-mix(in srgb, var(--tone-recommend) 22%, transparent);
}
.wk__bar i {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 4px;
  background: var(--tone-recommend);
}
.wk__time small {
  font-size: var(--fs-note);
  font-variant-numeric: tabular-nums;
  color: var(--ink);
}
.wk__month {
  display: flex;
  align-items: baseline;
  gap: 18px;
  margin: 22px 0 0;
  padding: 14px 22px;
  border-radius: var(--r-box);
  border: 1.5px solid var(--line);
  background: var(--surface);
}
.wk__line {
  font-size: var(--fs-body);
  line-height: 1.6;
}
.wk__good {
  font-weight: 500;
  color: var(--tone-recommend-ink);
}
.wk__bad {
  font-weight: 500;
  color: var(--tone-caution-ink);
}
</style>
