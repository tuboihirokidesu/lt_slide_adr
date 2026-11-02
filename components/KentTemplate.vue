<script setup lang="ts">
type Row = { kind: 'title' | 'meta' | 'section'; head?: string; bars?: number[]; revisit?: boolean; note: string; sub?: string; strong?: boolean }

const rows: Row[] = [
  { kind: 'title', note: '番号と決定タイトル', sub: '何に No と言ったかを、一文で。', strong: true },
  { kind: 'meta', note: 'Status と日付', sub: 'proposed / accepted / superseded' },
  { kind: 'section', head: 'Context', bars: [92, 64], note: 'Context', sub: '何がこの決定を迫ったか。' },
  { kind: 'section', head: 'Decision', bars: [74], note: 'Decision', sub: '何を決めたか。' },
  { kind: 'section', head: 'Consequences', bars: [86, 52], note: 'Consequences', sub: '良くなること、悪くなること。' },
  { kind: 'section', head: 'Revisit if', bars: [70], revisit: true, note: 'Revisit if', sub: 'どうなったら、この No を見直すか。' },
]
</script>

<template>
  <div class="kt">
    <div class="kt__grid">
      <div class="fx-paper kt__paper" aria-hidden="true" />
      <div class="fx-paper__head kt__file"><span>0000-template.md</span><span>Kent C. Dodds の型</span></div>
      <template v-for="(r, i) in rows" :key="r.note">
        <div class="kt__cell" :style="{ gridRow: i + 2 }">
          <p v-if="r.kind === 'title'" class="kt__title"><b>NNNN:</b> ◯◯ はしない。</p>
          <p v-else-if="r.kind === 'meta'" class="kt__meta">
            <span class="fx-status fx-status--accepted">accepted</span><span>2026-MM-DD</span>
          </p>
          <template v-else>
            <p class="fx-paper__h">{{ r.head }}</p>
            <div :class="r.revisit ? 'fx-revisit kt__revisit' : 'kt__bars'">
              <i v-for="(w, j) in r.bars" :key="j" :style="{ width: `${w}%` }" />
            </div>
          </template>
        </div>
        <i class="kt__leader" :class="{ 'is-teal': r.revisit }" :style="{ gridRow: i + 2 }" aria-hidden="true" />
        <div class="kt__note" :class="{ 'is-strong': r.strong, 'is-revisit': r.revisit }" :style="{ gridRow: i + 2 }">
          <strong>{{ r.note }}</strong>
          <span>{{ r.sub }}</span>
        </div>
      </template>
    </div>
    <p class="kt__aside">
      書くのは <span class="fx-no">We use TypeScript</span> ではなく、<br>エージェントがやりかねないが、製品に有害なこと。
    </p>
  </div>
</template>

<style scoped>
.kt {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}
.kt__grid {
  display: grid;
  grid-template-columns: 392px 56px 1fr;
  grid-auto-rows: auto;
  align-items: center;
}
.kt__paper {
  grid-column: 1;
  grid-row: 1 / 8;
  align-self: stretch;
}
.kt__file {
  grid-column: 1;
  grid-row: 1;
  position: relative;
}
.kt__cell {
  grid-column: 1;
  position: relative;
  padding: 5px 18px;
}
.kt__cell .fx-paper__h {
  margin: 0 0 5px;
}
.kt__title {
  margin: 4px 0 0;
  font-size: 16px;
  font-weight: 700;
}
.kt__title b {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--teal-ink);
}
.kt__meta {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--muted);
}
.kt__bars,
.kt__revisit {
  display: grid;
  gap: 5px;
}
.kt__bars i,
.kt__revisit i {
  display: block;
  height: 6px;
  border-radius: 3px;
  background: var(--line);
}
.kt__revisit {
  padding: 7px 10px;
  margin-bottom: 8px;
}
.kt__revisit i {
  background: var(--teal-line);
  opacity: 0.6;
}
.kt__leader {
  grid-column: 2;
  position: relative;
  height: 1px;
  background: var(--line-strong);
}
.kt__leader::before {
  content: "";
  position: absolute;
  left: -3px;
  top: -3px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--line-strong);
}
.kt__leader.is-teal,
.kt__leader.is-teal::before {
  background: var(--teal);
}
.kt__note {
  grid-column: 3;
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 0 14px;
}
.kt__note strong {
  flex: none;
  width: 116px;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  color: var(--ink-2);
}
.kt__note span {
  font-size: 13.5px;
  color: var(--ink-2);
}
.kt__note.is-strong strong {
  font-family: var(--font-sans);
  color: var(--ink);
}
.kt__note.is-strong span {
  font-weight: 700;
  color: var(--ink);
}
.kt__note.is-revisit {
  align-self: center;
  height: 46px;
  align-items: center;
  border-radius: var(--r-chip);
  background: var(--teal-fill);
  border: 1.5px dashed var(--teal-line);
}
.kt__note.is-revisit strong,
.kt__note.is-revisit span {
  color: var(--teal-ink);
  font-weight: 700;
}
.kt__aside {
  margin: 0;
  padding: 10px 22px;
  border-radius: var(--r-box);
  border: 1.5px solid var(--line);
  background: var(--surface);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.6;
}
</style>
