<script setup lang="ts">
withDefaults(defineProps<{ stage?: number }>(), { stage: 0 })

const steps = [
  { at: 0, who: 'エージェント', what: '草案を書く' },
  { at: 1, who: '人間', what: '捨てた案と理由を直す' },
  { at: 2, who: '人間', what: 'Accepted にする' },
]

const options = [
  { name: 'Prisma を入れる', why: '生成される SQL を追えない' },
  { name: 'Drizzle を入れる', why: 'SQL と書き方が変わらない' },
  { name: '生 SQL のまま', adopted: true },
]
</script>

<template>
  <div class="da">
    <div class="da__flow">
      <svg class="da__edges" viewBox="0 0 860 200" width="860" height="200" aria-hidden="true">
        <Edge d="M262 158 H296" :end="[296, 158]" dir="r" :on="stage >= 1" />
        <Edge d="M562 158 H596" :end="[596, 158]" dir="r" tone="recommend" :on="stage >= 2" />
      </svg>

      <div v-for="(s, i) in steps" :key="s.what" class="da__step fx-enter" :class="{ 'is-on': stage >= s.at }" >
        <p class="da__who"><span class="fx-caption">{{ s.who }}</span>{{ s.what }}</p>

        <AdrPaper v-if="i === 0" class="da__paper" no="0012" file="0012-no-orm.md" status="proposed" title="ORM を導入しない。">
          <p class="fx-paper__h">Considered options</p>
          <ul class="da__opts">
            <li v-for="o in options" :key="o.name">{{ o.name }}<span v-if="o.adopted" class="is-adopted">採用</span><span v-else class="is-blank">理由：＿＿＿</span></li>
          </ul>
        </AdrPaper>

        <AdrPaper v-else-if="i === 1" class="da__paper" no="0012" file="0012-no-orm.md" status="proposed" title="ORM を導入しない。">
          <p class="fx-paper__h">Considered options</p>
          <ul class="da__opts">
            <li v-for="o in options" :key="o.name">{{ o.name }}<span v-if="o.adopted" class="is-adopted">採用</span><template v-else><span class="is-rejected">却下</span><em class="is-human">{{ o.why }}</em></template></li>
          </ul>
        </AdrPaper>

        <AdrPaper v-else class="da__paper is-locked" no="0012" file="0012-no-orm.md" status="accepted" title="ORM を導入しない。">
          <p class="fx-paper__h">Decision</p>
          <p class="da__text">クエリは生 SQL で書く。</p>
          <p class="da__lock"><code>CODEOWNERS</code> と CI で、エージェントは書き換えない</p>
        </AdrPaper>
      </div>
    </div>

    <div class="da__inv fx-enter" :class="{ 'is-on': stage >= 2 }">
      <span class="fx-caption">防ぎたい失敗：抽象の逆転（<Ref id="haandol" />）</span>
      <div class="da__chains">
        <p class="da__chain is-ok">
          <span>要件</span><svg class="da__arr" viewBox="0 0 28 12" width="28" height="12" aria-hidden="true"><Edge d="M1 6 H26" :end="[26, 6]" dir="r" tone="recommend" /></svg><span>ADR</span><svg class="da__arr" viewBox="0 0 28 12" width="28" height="12" aria-hidden="true"><Edge d="M1 6 H26" :end="[26, 6]" dir="r" tone="recommend" /></svg><span>コード</span>
          <small>正しい権威の向き</small>
        </p>
        <p class="da__chain is-bad">
          <span>コード</span><svg class="da__arr" viewBox="0 0 28 12" width="28" height="12" aria-hidden="true"><Edge d="M1 6 H26" :end="[26, 6]" dir="r" tone="caution" /></svg><span>ADR</span>
          <small>今の実装に合わせて、ADR が黙って書き換えられる</small>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.da__flow {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 262px);
  justify-content: space-between;
}
.da__edges {
  position: absolute;
  inset: 0;
  overflow: visible;
  z-index: 1;
}
.da__step {
  display: flex;
  flex-direction: column;
}
.da__who {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 0 0 8px;
  font-size: var(--fs-body);
  font-weight: 500;
}
.da__who .fx-caption {
  color: var(--tone-recommend-ink);
}
.da__step:first-child .da__who .fx-caption {
  color: var(--muted);
}
.da__paper {
  flex: 1;
}
.da__opts {
  display: grid;
  gap: 2px;
  font-size: var(--fs-note);
  line-height: 1.5;
}
.da__opts li {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  column-gap: 8px;
}
.da__opts span {
  margin-left: auto;
}
.da__opts .is-blank {
  color: var(--muted);
}
.da__opts .is-adopted {
  color: var(--tone-recommend-ink);
}
.da__opts .is-rejected {
  color: var(--tone-caution-ink);
}
.da__opts .is-human {
  flex-basis: 100%;
  margin-top: 2px;
  padding: 0 8px;
  border-radius: var(--r-mark);
  background: var(--tone-recommend-fill);
  color: var(--tone-recommend-ink);
  font-style: normal;
}
.da__text {
  margin: 0;
  font-size: var(--fs-note);
}
.da__paper.is-locked {
  border-color: var(--tone-recommend-line);
}
.da__lock {
  margin: 14px 0 0;
  padding-top: 10px;
  border-top: 1px dashed var(--line);
  font-size: var(--fs-note);
  line-height: 1.5;
  color: var(--ink-2);
}
.da__inv {
  margin-top: 14px;
  padding-top: 10px;
  border-top: 1px solid var(--line-strong);
}
.da__chains {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  margin-top: 8px;
}
.da__chain {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}
.da__chain span {
  padding: 4px 12px;
  border-radius: var(--r-chip);
  border: 1.5px solid var(--tone-recommend-line);
  background: var(--surface);
  font-size: var(--fs-body);
  font-weight: 500;
  color: var(--tone-recommend-ink);
}
.da__arr {
  overflow: visible;
}
.da__chain small {
  flex-basis: 100%;
  font-size: var(--fs-note);
  color: var(--muted);
}
.da__chain.is-bad span {
  border-color: var(--tone-caution);
  background: var(--tone-caution-fill);
  color: var(--tone-caution-ink);
}
.da__chain.is-bad small {
  color: var(--tone-caution-ink);
}
</style>
