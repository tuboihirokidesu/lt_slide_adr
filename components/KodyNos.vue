<script setup lang="ts">
const repo = 'https://github.com/kody-hq/kody/tree/main/docs/contributing/decisions'
const file = (slug: string) => `https://github.com/kody-hq/kody/blob/main/docs/contributing/decisions/${slug}.md`

const nos = [
  { adr: '0001', slug: '0001-no-package-versioning', subject: 'ユーザー向けのパッケージバージョニング', verdict: 'しない' },
  { adr: '0006', slug: '0006-no-repo-ci-primitive', subject: 'repo・package 向けの CI プリミティブ', verdict: '作らない' },
  { adr: '0015', slug: '0015-skills-over-mcp-wait', subject: 'skills-over-MCP への対応', verdict: '仕様が固まるまで待つ', later: 'のちに 0058 で置き換え' },
  { adr: '0041', slug: '0041-no-hardcoded-operator-correspondence', subject: 'イベント購読の使い捨てコード', verdict: 'パッケージに統一する' },
  { adr: '0025', slug: '0025-no-package-services-primitive', subject: 'パッケージサービスというプリミティブ', verdict: '削除する', key: true },
]
</script>

<template>
  <div class="kody">
    <div class="fx-paper kody__list">
      <div class="fx-paper__head"><a :href="repo" target="_blank" rel="noopener">kody-hq/kody · docs/contributing/decisions</a><span>動画で挙がった例</span></div>
      <ol>
        <li v-for="n in nos" :key="n.adr" :class="{ 'is-key': n.key }">
          <a :href="file(n.slug)" target="_blank" rel="noopener">{{ n.adr }}</a>
          <span class="kody__subject"><span class="fx-no">{{ n.subject }}</span><small v-if="n.later">{{ n.later }}</small></span>
          <em>{{ n.verdict }}</em>
        </li>
      </ol>
      <a class="kody__repo" :href="repo" target="_blank" rel="noopener">
        <span>github.com/kody-hq/kody/tree/main/docs/contributing/decisions</span><i aria-hidden="true">↗</i>
      </a>
    </div>

    <div class="kody__note">
      <p class="kody__kicker">0025 で起きたこと</p>
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
  grid-template-columns: 40px 1fr auto;
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
.kody__list li > a {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  color: var(--muted);
  text-decoration: underline;
  text-decoration-color: var(--line-strong);
  text-underline-offset: 3px;
}
.kody__subject small {
  display: block;
  margin-top: 4px;
  white-space: nowrap;
  font-family: var(--font-mono);
  font-size: 11.5px;
  font-weight: 500;
  color: var(--muted);
}
.fx-paper__head a {
  color: inherit;
  text-decoration: none;
}
.kody__repo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 18px 12px;
  border-top: 1px dashed var(--line-strong);
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  color: var(--ext-ink);
  text-decoration: none;
}
.kody__repo i {
  font-style: normal;
}
:is(.kody__list li > a, .kody__repo, .fx-paper__head a) {
  border-bottom: 0;
}
:is(.kody__list li > a, .kody__repo, .fx-paper__head a):hover {
  color: var(--ext-ink);
  text-decoration-color: currentColor;
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
.kody__list li.is-key > a {
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
