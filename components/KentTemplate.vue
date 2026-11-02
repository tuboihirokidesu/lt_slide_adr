<script setup lang="ts">
// 紙面の文は Kody の 0000-template.md の原文。revisit-if は Consequences の段落の中にある
type Row = { kind: 'title' | 'meta' | 'section'; head?: string; text?: string; revisit?: boolean; note: string; strong?: boolean }

const rows: Row[] = [
  { kind: 'title', note: '何に No と言ったかを、一文で。', strong: true },
  { kind: 'meta', note: '状態と日付。置き換えたら superseded にする。' },
  { kind: 'section', head: 'Context', text: 'What proposal or situation forced the decision.', note: '何がこの決定を迫ったか。' },
  { kind: 'section', head: 'Decision', text: 'What was decided, in one or two sentences.', note: '何を決めたか。' },
  { kind: 'section', head: 'Consequences', text: 'What stays simple, what gets harder, and the', note: '良くなること、悪くなること。' },
  { kind: 'section', text: 'revisit-if — the concrete condition that would reopen this.', revisit: true, note: 'どうなったら、この No を見直すか。' },
]
</script>

<template>
  <div class="kt">
    <div class="kt__grid">
      <div class="fx-paper kt__paper" aria-hidden="true" />
      <div class="fx-paper__head kt__file"><Ref id="kody-template" /><span><Ref id="kent" /> の型</span></div>
      <template v-for="(r, i) in rows" :key="r.note">
        <div class="kt__cell" :style="{ gridRow: i + 2 }">
          <p v-if="r.kind === 'title'" class="kt__title"><code>NNNN:</code> Short decision title (the no)</p>
          <p v-else-if="r.kind === 'meta'" class="kt__meta">
            <span class="fx-status fx-status--accepted">accepted</span><span>YYYY-MM-DD</span>
          </p>
          <template v-else>
            <p v-if="r.head" class="fx-paper__h">{{ r.head }}</p>
            <p :class="r.revisit ? 'fx-revisit kt__revisit' : 'kt__text'">{{ r.text }}</p>
          </template>
        </div>
        <i class="kt__leader" :class="{ 'is-recommend': r.revisit }" :style="{ gridRow: i + 2 }" aria-hidden="true" />
        <p class="kt__note" :class="{ 'is-strong': r.strong, 'is-revisit': r.revisit }" :style="{ gridRow: i + 2 }">{{ r.note }}</p>
      </template>
    </div>
    <p class="kt__aside">
      <span class="kt__dont">“We use TypeScript” のような、コードを見れば分かることは書かない。</span>書くのは、エージェントがやりかねないが、製品に有害なこと。
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
  grid-template-columns: 430px 48px 1fr;
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
  padding: 4px 18px;
}
.kt__cell .fx-paper__h {
  margin: 0 0 2px;
}
.kt__title {
  margin: 4px 0 0;
  font-size: var(--fs-body);
  font-weight: 500;
}
.kt__title code {
  color: var(--tone-recommend-ink);
}
.kt__meta {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: var(--fs-label);
  font-variant-numeric: tabular-nums;
  color: var(--muted);
}
.kt__text {
  margin: 0;
  font-size: var(--fs-note);
  line-height: 1.5;
  color: var(--ink-2);
}
.kt__revisit {
  margin: 0 0 8px;
  padding: 4px 10px;
  font-size: var(--fs-note);
  line-height: 1.5;
  color: var(--tone-recommend-ink);
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
.kt__leader.is-recommend,
.kt__leader.is-recommend::before {
  background: var(--tone-recommend);
}
.kt__note {
  grid-column: 3;
  margin: 0;
  padding: 0 14px;
  font-size: var(--fs-note);
  color: var(--ink-2);
}
.kt__note.is-strong {
  font-size: var(--fs-body);
  font-weight: 700;
  color: var(--ink);
}
.kt__note.is-revisit {
  align-self: center;
  display: flex;
  align-items: center;
  height: 40px;
  border-radius: var(--r-chip);
  background: var(--tone-recommend-fill);
  border: 1.5px dashed var(--tone-recommend-line);
  color: var(--tone-recommend-ink);
}
.kt__aside {
  margin: 0;
  padding: 10px 22px;
  border-radius: var(--r-box);
  border: 1.5px solid var(--line);
  background: var(--surface);
  font-size: var(--fs-body);
  line-height: 1.6;
}
.kt__dont {
  display: block;
  font-size: var(--fs-note);
  color: var(--muted);
}
</style>
