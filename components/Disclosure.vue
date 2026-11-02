<script setup lang="ts">
const crammed = [
  'キャッシュ層を作らない',
  'ORM を導入しない',
  'GraphQL にしない',
  'キューを自作しない',
  '認証は外部に任せる',
  'モノレポを分けない',
  '依存を固定しない',
]

// Kody の decisions/index.md「Steering list」の並び順のまま、0025 の前後だけを抜き出す
const steering = [
  { no: '0024', title: 'Packages outrank synthesized providers; …' },
  { no: '0025', title: 'No package services primitive', hit: true },
  { no: '0032', title: 'No unattached jobs; …' },
]
</script>

<template>
  <div class="disc">
    <div class="disc__bad">
      <span class="fx-caption">全部入りにした場合</span>
      <div class="fx-paper disc__crammed">
        <div class="fx-paper__head"><span>AGENTS.md</span></div>
        <div class="fx-paper__body">
          <p class="fx-paper__h">Commands</p>
          <p class="disc__cmd">pnpm test · pnpm lint</p>
          <p class="fx-paper__h">Decisions</p>
          <ul class="disc__lines">
            <li v-for="l in crammed" :key="l">- {{ l }}</li>
            <li class="is-more">…</li>
          </ul>
        </div>
      </div>
      <p class="disc__sub">全部が毎回、エージェントの文脈に載る。</p>
    </div>

    <div class="disc__good">
      <span class="fx-caption"><Ref id="kody" label="Kody" /> の場合（抜粋）</span>
      <div class="disc__top">
        <div class="fx-paper disc__card">
          <div class="fx-paper__head"><span>AGENTS.md</span><span class="disc__step">1段目　毎回読む</span></div>
          <div class="disc__body">
            <p class="is-dim">Open the page that owns the task:</p>
            <p>- Docs map: <mark>contributing</mark> · principles · skills</p>
          </div>
        </div>
        <figure class="disc__quote">
          <blockquote class="fx-quote">progressively<br>disclosed way</blockquote>
          <figcaption class="fx-cite"><Ref id="kent" /></figcaption>
        </figure>
      </div>

      <div class="fx-paper disc__card disc__hop is-2">
        <div class="fx-paper__head">
          <span><Ref id="kody-index" label="decisions/index.md" /></span>
          <span class="disc__step">2段目　contributor map 経由で開く</span>
        </div>
        <div class="disc__body">
          <p class="fx-paper__h">Steering list</p>
          <p>Open these before proposing a new primitive, surface, or storage home.</p>
          <ul class="disc__index">
            <li v-for="r in steering" :key="r.no" :class="{ 'is-hit': r.hit }"><code>{{ r.no }}</code> — {{ r.title }}</li>
          </ul>
        </div>
      </div>

      <div class="fx-paper disc__card disc__hop is-3">
        <div class="fx-paper__head">
          <span><Ref id="kody-0025" label="0025-no-package-services-primitive.md" /></span>
          <span class="disc__step">3段目　該当する1本だけ</span>
        </div>
        <div class="disc__body">
          <p class="fx-paper__h">Decision</p>
          <p>Delete the package services primitive, including <code>kody.services</code>, the services MCP domain, and <code>PackageServiceInstance</code>.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.disc {
  display: grid;
  grid-template-columns: 214px 1fr;
  gap: 28px;
  align-items: start;
}
.disc__bad,
.disc__good {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.disc__crammed {
  box-shadow: none;
  background: var(--legacy-fill);
}
.disc__crammed .fx-paper__body {
  padding: 4px 12px 10px;
}
.disc__crammed .fx-paper__h {
  margin: 6px 0 2px;
}
.disc__cmd {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--fs-label);
  color: var(--ink-2);
}
.disc__lines li {
  font-size: var(--fs-note);
  line-height: 1.5;
  white-space: nowrap;
  color: var(--ink-2);
}
.disc__lines .is-more {
  color: var(--muted);
}
.disc__sub {
  margin: 0;
  font-size: var(--fs-note);
  line-height: 1.6;
  color: var(--ink-2);
}
.disc__top {
  display: grid;
  grid-template-columns: 372px 1fr;
  gap: 22px;
  align-items: start;
}
.disc__card {
  position: relative;
  box-shadow: none;
}
.disc__card .fx-paper__head {
  padding: 5px 12px;
}
.disc__step {
  font-family: var(--font-sans);
  font-size: var(--fs-note);
  color: var(--tone-recommend-ink);
}
.disc__body {
  padding: 5px 12px 6px;
}
.disc__body p {
  margin: 0;
  font-size: var(--fs-note);
  line-height: 1.5;
  color: var(--ink);
}
.disc__body .is-dim {
  color: var(--muted);
}
.disc__body .fx-paper__h {
  margin: 0 0 2px;
  font-size: var(--fs-label);
  color: var(--muted);
}
.disc__body p + .fx-paper__h {
  margin-top: 4px;
}
.disc__body mark,
.disc__index .is-hit {
  background: var(--tone-recommend-fill);
  color: var(--tone-recommend-ink);
  border-radius: var(--r-mark);
}
.disc__body mark {
  padding: 0 4px;
}
.disc__index {
  margin-top: 4px;
}
.disc__index li {
  margin: 0 -6px;
  padding: 0 6px;
  font-size: var(--fs-note);
  line-height: 1.55;
  white-space: nowrap;
  color: var(--ink-2);
}
.disc__index code {
  font-size: var(--fs-label);
}
/* 段を下りるごとに右へずらし、前の段から L 字の矢印でつなぐ */
.disc__hop.is-2 { margin: 12px 0 0 36px; }
.disc__hop.is-3 { margin: 12px 0 0 72px; }
.disc__hop::before {
  content: "";
  position: absolute;
  left: -24px;
  top: -13px;
  width: 20px;
  height: 34px;
  border-left: var(--w-em) solid var(--tone-recommend);
  border-bottom: var(--w-em) solid var(--tone-recommend);
  border-bottom-left-radius: var(--r-mark);
}
.disc__hop::after {
  content: "";
  position: absolute;
  left: -7px;
  top: 14px;
  border-left: 7px solid var(--tone-recommend);
  border-top: 4.5px solid transparent;
  border-bottom: 4.5px solid transparent;
}
.disc__quote {
  margin: 2px 0 0;
  padding-left: 12px;
  border-left: 2px solid var(--tone-source);
}
.disc__quote .fx-quote {
  font-size: var(--fs-title);
  white-space: nowrap;
  line-height: 1.15;
}
.disc__quote .fx-cite {
  margin-top: 2px;
}
</style>
