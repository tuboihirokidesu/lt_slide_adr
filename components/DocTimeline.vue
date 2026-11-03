<script setup lang="ts">
// 矢印の y 座標。各書類の強調した節の中央に合わせる
const Y = { dd: 217, impl: 126, rej: 177, opt: 204 }

const sections: { h: string; body?: string; hit?: boolean }[] = [
  { h: '背景' },
  { h: '目標' },
  { h: '案の比較' },
  { h: '結論', body: 'ORM は入れない。\n生 SQL と型生成', hit: true },
  { h: '未解決の問い' },
]
</script>

<template>
  <div class="tl">
    <div class="tl__stage">
      <svg class="tl__edges" viewBox="0 0 860 346" width="860" height="346" aria-hidden="true">
        <Edge :d="`M232 ${Y.dd} C 272 ${Y.dd}, 276 ${Y.impl}, 314 ${Y.impl}`" :end="[314, Y.impl]" dir="r" tone="recommend" dashed />
        <Edge :d="`M548 ${Y.rej} C 588 ${Y.rej}, 592 ${Y.opt}, 628 ${Y.opt}`" :end="[628, Y.opt]" dir="r" tone="recommend" dashed />
        <Edge d="M0 330 H856" :end="[856, 330]" dir="r" />
      </svg>
      <span class="fx-label is-on fx-label--recommend tl__cut tl__cut--impl" :style="{ top: `${Y.dd + 8}px` }">実装へ</span>
      <span class="fx-label is-on fx-label--recommend tl__cut tl__cut--adr" :style="{ top: `${Y.rej - 34}px` }">残る決定</span>

      <div class="tl__decision" aria-hidden="true"><span>決定</span></div>
      <span class="tl__axis">時間</span>

      <div class="tl__side tl__side--dd">
        <p class="tl__dir"><span class="tl__name">Design Doc</span><span>作るものを議論する</span></p>
        <div class="fx-paper tl__dd">
          <div class="fx-paper__head"><span>design-doc.md</span><span>数ページ</span></div>
          <div class="fx-paper__body">
            <div v-for="s in sections" :key="s.h" class="tl__sec" :class="{ 'is-hit': s.hit }">
              <p class="fx-paper__h">{{ s.h }}</p>
              <p v-if="s.body" class="tl__body">{{ s.body }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="tl__side tl__side--pr">
        <p class="tl__dir"><span class="tl__name">PR 本文</span><span>この変更のことを書く</span></p>
        <div class="fx-paper tl__pr">
          <div class="fx-paper__head"><span class="tl__head-ja">変更ごとに1つ</span><span>マージまで</span></div>
          <div class="fx-paper__body">
            <div class="tl__sec">
              <p class="fx-paper__h">実装方針</p>
              <p class="tl__body">SQL ファイルから型を生成する</p>
            </div>
            <div class="tl__sec is-hit">
              <p class="fx-paper__h">採らなかった案と理由</p>
              <p class="tl__body">ORM、クエリビルダー</p>
            </div>
            <div class="tl__sec">
              <p class="fx-paper__h">動作確認と結果</p>
            </div>
          </div>
        </div>
      </div>

      <div class="tl__side tl__side--adr">
        <p class="tl__dir"><span class="tl__name">ADR</span><span>決まったことを短く固定する</span></p>
        <AdrPaper class="tl__adr" no="0012" file="0012-no-orm.md" title="ORM を導入しない" status="accepted">
          <p class="fx-paper__h">Considered options</p>
          <p class="tl__opt">ORM を入れる（<span class="tl__rejected">却下</span>）</p>
          <p class="fx-paper__h">Revisit if</p>
          <p class="fx-revisit tl__revisit">CRUD 中心の画面が半分を超えたら</p>
        </AdrPaper>
      </div>
    </div>
    <p class="tl__note"><span><Ref id="layerx" /> も Design Doc と ADR の2本立て。不正検知システムでは、3日で Design Doc 2本と ADR 5本を書いた。</span></p>
  </div>
</template>

<style scoped>
.tl__stage {
  position: relative;
  width: 860px;
  height: 346px;
}
.tl__edges {
  position: absolute;
  inset: 0;
  overflow: visible;
  z-index: 2;
}
.tl__cut {
  z-index: 3;
}
.tl__cut--impl {
  left: 238px;
}
.tl__cut--adr {
  left: 556px;
}
.tl__head-ja {
  font-family: var(--font-sans);
  font-size: var(--fs-note);
}
.tl__decision {
  position: absolute;
  left: 273px;
  top: 22px;
  bottom: 16px;
  border-left: 1.5px dashed var(--line-strong);
}
.tl__decision span {
  position: absolute;
  top: -24px;
  left: 0;
  transform: translateX(-50%);
  padding: 0 8px;
  font-size: var(--fs-note);
  color: var(--ink-2);
  white-space: nowrap;
}
.tl__axis {
  position: absolute;
  right: 0;
  top: 334px;
  font-size: var(--fs-note);
  color: var(--muted);
}
.tl__side {
  position: absolute;
  top: 0;
}
.tl__side--dd {
  left: 0;
  width: 232px;
}
.tl__side--pr {
  left: 316px;
  width: 232px;
}
.tl__side--adr {
  left: 630px;
  width: 230px;
}
.tl__dir {
  margin: 0 0 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.tl__name {
  font-size: var(--fs-body);
  font-weight: 500;
}
.tl__dir span {
  font-size: var(--fs-note);
  color: var(--ink-2);
}
.tl__side--pr .tl__name,
.tl__side--adr .tl__name {
  color: var(--tone-recommend-ink);
}
.tl__dd .fx-paper__body,
.tl__pr .fx-paper__body {
  padding-top: 4px;
  padding-bottom: 10px;
}
.tl__sec .fx-paper__h {
  margin: 6px 0 0;
}
.tl__body {
  margin: 0;
  white-space: pre-line;
  font-size: var(--fs-note);
  line-height: 1.5;
  color: var(--ink-2);
}
.tl__sec.is-hit {
  margin: 4px -8px 0;
  padding: 0 8px 6px;
  border-radius: var(--r-mark);
  border: 1.5px dashed var(--tone-recommend-line);
}
.tl__sec.is-hit .tl__body {
  color: var(--tone-recommend-ink);
}
.tl__opt {
  margin: 0;
  font-size: var(--fs-note);
  color: var(--muted);
}
.tl__rejected {
  color: var(--tone-caution-ink);
}
.tl__revisit {
  margin: 0;
  padding: 3px 10px;
  font-size: var(--fs-note);
  color: var(--ink-2);
}
.tl__note {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 18px 0 0;
  font-size: var(--fs-note);
  color: var(--ink-2);
}
</style>
