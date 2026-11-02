<script setup lang="ts">
import type { SourceId } from '../data/sources'

const nos: { adr: SourceId; subject: string; verdict: string; later?: SourceId; key?: boolean }[] = [
  { adr: 'kody-0001', subject: 'ユーザー向けのパッケージバージョニング', verdict: 'しない' },
  { adr: 'kody-0006', subject: 'repo・package 向けの CI プリミティブ', verdict: '作らない' },
  { adr: 'kody-0015', subject: 'skills-over-MCP への対応', verdict: '仕様が固まるまで待つ', later: 'kody-0058' },
  { adr: 'kody-0041', subject: 'イベント購読の使い捨てコード', verdict: 'パッケージに統一する' },
  { adr: 'kody-0025', subject: 'パッケージサービスというプリミティブ', verdict: '削除する', key: true },
]
</script>

<template>
  <div class="kody">
    <div class="fx-paper kody__list">
      <div class="fx-paper__head"><Ref id="kody" label="kody-hq/kody · docs/contributing/decisions" /><span>動画で挙がった例</span></div>
      <ol>
        <li v-for="n in nos" :key="n.adr" :class="{ 'is-key': n.key }">
          <Ref :id="n.adr" class="kody__no" />
          <span class="kody__subject"><span class="fx-no">{{ n.subject }}</span><small v-if="n.later">のちに <Ref :id="n.later" /> で置き換え</small></span>
          <em>{{ n.verdict }}</em>
        </li>
      </ol>
    </div>

    <div class="kody__note">
      <p class="kody__kicker">0025 で起きたこと</p>
      <p class="kody__push">エージェントは「それは有用だ」と、何度も押し返してきた。</p>
      <p class="kody__big">ADR は、あるものが<br>もう存在しないことを<br>確かめる回帰テスト。</p>
      <p class="fx-cite"><Ref id="kent" /> の言葉から</p>
    </div>
  </div>
</template>

<style scoped>
.kody {
  display: grid;
  grid-template-columns: 1fr 300px;
  align-items: center;
  gap: 0 40px;
}
.kody__list ol {
  padding: 6px 18px 8px;
}
.kody__list li {
  display: grid;
  grid-template-columns: 40px 1fr auto;
  align-items: baseline;
  gap: 12px;
  padding: 13px 0;
  border-top: 1px solid var(--line);
  font-size: var(--fs-body);
  font-weight: 600;
}
.kody__list li:first-child {
  border-top: 0;
}
.kody__no {
  font-family: var(--font-mono);
  font-size: var(--fs-label);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.kody__subject small {
  display: block;
  margin-top: 4px;
  white-space: nowrap;
  font-family: var(--font-mono);
  font-size: var(--fs-label);
  font-weight: 500;
  color: var(--muted);
}
.kody__list em {
  font-style: normal;
  font-size: var(--fs-note);
  font-weight: 700;
  color: var(--tone-caution-ink);
  white-space: nowrap;
}
.kody__list li.is-key {
  margin: 0 -10px;
  padding: 13px 10px;
  border-radius: var(--r-mark);
  border-top-color: transparent;
  background: var(--tone-emphasis-fill);
}
.kody__list li.is-key .fx-no {
  color: var(--tone-emphasis-ink);
}
.kody__note {
  padding: 8px 0 8px 24px;
  border-left: var(--w-em) solid var(--tone-emphasis);
}
.kody__kicker {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--fs-label);
  font-weight: 600;
  letter-spacing: var(--ls-label);
  color: var(--tone-emphasis-ink);
}
.kody__push {
  margin: 8px 0 0;
  font-size: var(--fs-note);
  line-height: 1.7;
  color: var(--ink-2);
}
.kody__big {
  margin: 16px 0 0;
  font-size: var(--fs-title);
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: var(--ls-display);
}
</style>
