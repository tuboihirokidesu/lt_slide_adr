<script setup lang="ts">
const nos = [
  { subject: 'ユーザー向けのパッケージバージョニング', verdict: 'しない' },
  { subject: 'repo・package 向けの CI プリミティブ', verdict: '作らない' },
  { subject: 'skills-over-MCP への対応', verdict: '仕様が固まるまで待つ' },
  { subject: 'イベント購読の使い捨てコード', verdict: 'パッケージに統一する' },
  { subject: 'パッケージサービスというプリミティブ', verdict: '削除する', key: true },
]
const no = (i: number) => String(i + 1).padStart(2, '0')
</script>

<template>
  <div class="kody">
    <div class="fx-paper kody__list">
      <div class="fx-paper__head"><span>kentcdodds/kody · docs/contributing/decisions</span><span>動画で挙がった例</span></div>
      <ol>
        <li v-for="(n, i) in nos" :key="n.subject" :class="{ 'is-key': n.key }">
          <b>{{ no(i) }}</b>
          <span class="fx-no">{{ n.subject }}</span>
          <em>{{ n.verdict }}</em>
        </li>
      </ol>
    </div>

    <div class="kody__note">
      <p class="kody__kicker">05 で起きたこと</p>
      <p class="kody__push">エージェントは「それは有用だ」と、何度も押し返してきた。</p>
      <p class="kody__big">ADR は、あるものが<br>もう存在しないことを<br>確かめる回帰テスト。</p>
      <p class="fx-cite">Kent C. Dodds の言葉から</p>
    </div>
  </div>
</template>

<style scoped>
.kody {
  display: grid;
  grid-template-columns: 1fr 290px;
  align-items: center;
  gap: 0 44px;
}
.kody__list ol {
  padding: 6px 18px 8px;
}
.kody__list li {
  display: grid;
  grid-template-columns: 30px 1fr auto;
  align-items: baseline;
  gap: 12px;
  padding: 13px 0;
  border-top: 1px solid var(--line);
  font-size: 15px;
  font-weight: 600;
}
.kody__list li:first-child {
  border-top: 0;
}
.kody__list b {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  color: var(--muted);
}
.kody__list em {
  font-style: normal;
  font-size: 13.5px;
  font-weight: 700;
  color: var(--amber-ink);
  white-space: nowrap;
}
.kody__list li.is-key {
  margin: 0 -10px;
  padding: 13px 10px;
  border-radius: var(--r-mark);
  border-top-color: transparent;
  background: var(--amber-fill);
}
.kody__list li.is-key .fx-no {
  color: var(--ink);
}
.kody__list li.is-key b {
  color: var(--amber-ink);
}
.kody__note {
  padding: 8px 0 8px 24px;
  border-left: 2px solid var(--amber);
}
.kody__kicker {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--amber-ink);
}
.kody__push {
  margin: 8px 0 0;
  font-size: 13.5px;
  line-height: 1.7;
  color: var(--ink-2);
}
.kody__big {
  margin: 16px 0 0;
  font-size: 21px;
  font-weight: 700;
  line-height: 1.5;
}
</style>
