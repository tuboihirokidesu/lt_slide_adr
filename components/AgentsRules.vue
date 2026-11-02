<script setup lang="ts">
type Line = { text: string; add?: boolean; note?: string; rows?: number }

const lines: Line[] = [
  { text: '# Project' },
  { text: '## Commands' },
  { text: 'pnpm test / pnpm lint' },
  { text: '## Decisions' },
  { add: true, text: '新しいプリミティブ、外部サービス、データの保存先、認可の経路を提案・実装する前に docs/adr/index.md の「現役」一覧を確認する。', note: '提案の前に、索引を見る', rows: 2 },
  { add: true, text: '現役 ADR に反する変更が必要だと判断したら、実装せずに「ADR-NNNN の revisit-if に該当するか」を添えて提案する。', note: '反するなら、実装せずに提案', rows: 2 },
  { add: true, text: '戻しにくい決定を含む PR では、status: proposed の ADR 草案を同じ PR に入れる。不要なら PR 本文に「ADR 不要: 理由」と1行書く。', note: '草案は、同じ PR に', rows: 2 },
  { add: true, text: 'accepted の ADR を書き換えない。コードと ADR が食い違ったら報告する。', note: '書き換えず、報告する', rows: 1 },
]
// 追加行は折り返す行数に合わせて高さを揃え、右の注記と同じ行に並べる
const height = (l: Line) => (l.add ? `${12 + (l.rows ?? 1) * 21}px` : undefined)
</script>

<template>
  <div class="ed">
    <div class="ed__win">
      <div class="ed__bar">
        <span class="ed__file">AGENTS.md</span>
        <span class="ed__diff">+4 行</span>
      </div>
      <ol class="ed__code">
        <li v-for="(l, i) in lines" :key="l.text" :class="{ 'is-add': l.add }" :style="{ height: height(l) }">
          <span class="ed__no">{{ i + 1 }}</span>
          <span class="ed__mark">{{ l.add ? '+' : '' }}</span>
          <span class="ed__text">{{ l.text }}</span>
        </li>
      </ol>
    </div>
    <ol class="ed__notes">
      <li v-for="(l, i) in lines" :key="`n-${i}`" :class="{ 'is-note': l.note }" :style="{ height: height(l) }">
        <template v-if="l.note">{{ l.note }}</template>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.ed {
  display: grid;
  grid-template-columns: 604px 1fr;
  gap: 0;
  align-items: end;
}
.ed__win {
  overflow: hidden;
  border-radius: var(--r-doc);
  border: 1px solid var(--line);
  background: var(--surface);
  box-shadow: var(--shadow-1);
}
.ed__bar {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 34px;
  padding: 0 14px;
  border-bottom: 1px solid var(--line);
  background: var(--legacy-fill);
  font-family: var(--font-mono);
  font-size: var(--fs-label);
}
.ed__file {
  color: var(--ink);
}
.ed__diff {
  margin-left: auto;
  color: var(--tone-recommend-ink);
}
.ed__code {
  padding: 8px 0 10px;
}
.ed__code li,
.ed__notes li {
  box-sizing: border-box;
  height: 26px;
}
.ed__code li {
  display: grid;
  grid-template-columns: 34px 18px 1fr;
  align-items: baseline;
  padding: 2px 16px 2px 0;
  font-family: var(--font-mono);
  font-size: var(--fs-label);
  line-height: 1.65;
  color: var(--muted);
}
.ed__no {
  text-align: right;
  padding-right: 8px;
  font-variant-numeric: tabular-nums;
  color: var(--muted);
}
.ed__mark {
  text-align: center;
  color: var(--tone-recommend);
}
.ed__code li.is-add {
  padding-top: 5px;
  background: var(--tone-recommend-fill);
  box-shadow: inset 2px 0 0 var(--tone-recommend);
}
.ed__code li.is-add .ed__text {
  font-family: var(--font-sans);
  font-size: var(--fs-note);
  line-height: 21px;
  color: var(--ink);
}
.ed__notes {
  padding: 0 0 11px;
}
.ed__notes li {
  display: flex;
  align-items: center;
  padding: 2px 0;
}
.ed__notes li.is-note {
  position: relative;
  align-items: flex-start;
  padding-top: 5px;
  padding-left: 28px;
  line-height: 21px;
  font-size: var(--fs-body);
  font-weight: 500;
  color: var(--tone-recommend-ink);
}
.ed__notes li.is-note::before {
  content: "";
  position: absolute;
  left: 0;
  top: 15px;
  width: 20px;
  height: 1px;
  background: var(--tone-recommend-line);
}
</style>
