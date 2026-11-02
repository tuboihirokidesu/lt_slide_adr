<script setup lang="ts">
const tree = [
  { pre: '', name: 'docs/adr/', note: '' },
  { pre: '├ ', name: '0000-template.md', note: 'テンプレート' },
  { pre: '├ ', name: 'index.md', note: '索引', hit: true },
  { pre: '├ ', name: '0001-adopt-adr.md', note: 'このやり方' },
  { pre: '└ ', name: 'NNNN-kebab-slug.md', note: '4桁、再利用しない' },
  { pre: '', name: 'packages/<x>/docs/adr/', note: 'パッケージ固有', gap: true },
]

const active = [
  { no: '0001', title: 'ADR を docs/adr/ で管理する' },
  { no: '0005', title: '独自のキャッシュ層を作らない' },
  { no: '0012', title: 'ORM を導入しない' },
]
// 状態ピルの位置。矢印の座標（tree__flow の viewBox）と揃える
const states = [
  { kind: 'proposed', label: 'proposed', x: 0, y: 0 },
  { kind: 'accepted', label: 'accepted', x: 0, y: 52 },
  { kind: 'superseded', label: 'superseded by ADR-NNNN', x: 34, y: 104 },
  { kind: 'deprecated', label: 'deprecated', x: 34, y: 140 },
]
const history = [
  { no: '0003', title: 'モノレポを分割しない', status: 'superseded by 0011' },
  { no: '0007', title: '夜間バッチで集計する', status: 'deprecated' },
]
</script>

<template>
  <div class="tree">
    <section class="tree__col">
      <span class="fx-caption">置き場所</span>
      <ul class="tree__files">
        <li v-for="t in tree" :key="t.name" :class="{ 'is-hit': t.hit, 'is-gap': t.gap }">
          <span class="tree__name"><i>{{ t.pre }}</i>{{ t.name }}</span>
          <small v-if="t.note">{{ t.note }}</small>
        </li>
      </ul>
    </section>

    <section class="tree__col">
      <span class="fx-caption">index.md を2つに分ける</span>
      <div class="fx-paper tree__index">
        <div class="fx-paper__head"><span>docs/adr/index.md</span></div>
        <div class="fx-paper__body">
          <p class="fx-paper__h is-recommend">現役</p>
          <p v-for="a in active" :key="a.no" class="tree__row"><span class="tree__no">{{ a.no }}</span>{{ a.title }}</p>
          <p class="fx-paper__h">履歴</p>
          <p v-for="h in history" :key="h.no" class="tree__row is-old">
            <span class="tree__no">{{ h.no }}</span><span>{{ h.title }}<small>{{ h.status }}</small></span>
          </p>
        </div>
      </div>
    </section>

    <section class="tree__col">
      <span class="fx-caption">status の遷移</span>
      <div class="tree__fsm">
        <svg class="tree__flow" viewBox="0 0 250 162" width="250" height="162" aria-hidden="true">
          <g class="tree__edges">
            <Edge d="M14 23 V50" :end="[14, 50]" dir="d" />
            <Edge d="M14 75 V114 H32" :end="[32, 114]" dir="r" />
            <Edge d="M14 75 V150 H32" :end="[32, 150]" dir="r" />
          </g>
        </svg>
        <span v-for="s in states" :key="s.kind" class="fx-status" :class="`fx-status--${s.kind}`" :style="{ left: `${s.x}px`, top: `${s.y}px` }">{{ s.label }}</span>
      </div>
      <p class="tree__rule">Accepted は書き換えない。<br>変えるときは新しい ADR を起こし、<br>旧 ADR に superseded by を付ける。</p>
    </section>
  </div>
  <p class="tree__foot">古さは、推測ではなく欄で表す。<span><Ref id="konev" /></span></p>
</template>

<style scoped>
.tree {
  display: grid;
  grid-template-columns: 250px 1fr 250px;
  gap: 30px;
  align-items: start;
}
.tree__col > .fx-caption {
  margin-bottom: 10px;
}
.tree__files li {
  display: flex;
  flex-direction: column;
  padding: 3px 0;
  font-family: var(--font-mono);
  font-size: var(--fs-label);
  line-height: 1.5;
}
.tree__files li.is-gap {
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px dashed var(--line-strong);
}
.tree__name i {
  font-style: normal;
  color: var(--line-strong);
}
.tree__files small {
  margin-left: 18px;
  font-family: var(--font-sans);
  font-size: var(--fs-note);
  color: var(--muted);
}
.tree__files li:first-child small,
.tree__files li.is-gap small {
  margin-left: 0;
}
.tree__files li.is-hit .tree__name {
  align-self: flex-start;
  margin-left: -6px;
  padding: 0 6px;
  border-radius: var(--r-mark);
  background: var(--tone-recommend-fill);
  color: var(--tone-recommend-ink);
}
.tree__index .fx-paper__body {
  padding-top: 4px;
}
.tree__index .fx-paper__h.is-recommend {
  color: var(--tone-recommend-ink);
}
.tree__row {
  display: flex;
  gap: 10px;
  margin: 0;
  padding: 3px 0;
  font-size: var(--fs-note);
  line-height: 1.5;
}
.tree__no {
  font-family: var(--font-mono);
  font-size: var(--fs-label);
  font-variant-numeric: tabular-nums;
  color: var(--tone-recommend-ink);
}
.tree__row.is-old {
  color: var(--muted);
}
.tree__row.is-old .tree__no {
  color: var(--muted);
}
.tree__row small {
  display: block;
  font-family: var(--font-mono);
  font-size: var(--fs-label);
  color: var(--muted);
}
.tree__fsm {
  position: relative;
  width: 250px;
  height: 162px;
}
.tree__flow {
  position: absolute;
  inset: 0;
  overflow: visible;
}
.tree__fsm .fx-status {
  position: absolute;
}
.tree__rule {
  margin: 18px 0 0;
  font-size: var(--fs-note);
  line-height: 1.7;
  color: var(--ink-2);
}
.tree__foot {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 20px 0 0;
  padding-top: 14px;
  border-top: 1px solid var(--line);
  font-size: var(--fs-body);
  font-weight: 600;
}
.tree__foot span {
  font-size: var(--fs-note);
  font-weight: 400;
  color: var(--tone-source-ink);
}
</style>
