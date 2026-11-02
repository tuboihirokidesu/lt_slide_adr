<script setup lang="ts">
const props = withDefaults(defineProps<{ stage?: number }>(), { stage: 0 })

const sessions = [
  { no: '01', at: 0 },
  { no: '02', at: 1 },
  { no: '03', at: 2 },
]
const COL = 170
const GAP = 30
const left = (i: number) => i * (COL + GAP)
const loopOn = () => props.stage >= 3
</script>

<template>
  <div class="loop">
    <div class="loop__strip">
      <svg class="loop__edges" viewBox="0 0 570 262" width="570" height="262" aria-hidden="true">
        <Edge
          d="M485 204 V238 Q485 250 473 250 H97 Q85 250 85 238 V206"
          :end="[85, 204]"
          dir="u"
          tone="caution"
          :on="loopOn()"
          :delay="100"
        />
      </svg>
      <span class="fx-label fx-label--caution loop__return" :class="{ 'is-on': loopOn() }">毎回、人間が思い出させる</span>

      <div
        v-for="(s, i) in sessions"
        :key="s.no"
        class="loop__session fx-enter"
        :class="{ 'is-on': stage >= s.at }"
        :style="{ left: `${left(i)}px`, '--d': '0ms' }"
      >
        <span class="fx-label-mono">Session {{ s.no }}</span>
        <div class="loop__card fx-box">
          <p class="loop__who">エージェント</p>
          <p class="loop__msg">キャッシュ層を足しましょう。</p>
          <p class="loop__who loop__who--you">あなた</p>
          <p class="loop__msg loop__msg--you">前に却下した。</p>
        </div>
      </div>
      <span
        v-for="i in 2"
        :key="`reset-${i}`"
        class="loop__reset fx-enter"
        :class="{ 'is-on': stage >= i }"
        :style="{ left: `${left(i) - GAP / 2}px` }"
        aria-hidden="true"
      />
    </div>

    <figure class="loop__quote fx-enter" :class="{ 'is-on': loopOn() }" style="--d: 350ms">
      <blockquote class="fx-quote">now you are<br>the memory</blockquote>
      <figcaption class="fx-cite"><Ref id="kent" /></figcaption>
      <p>新しいセッションは、過去の会話で下した製品判断を知らない。</p>
    </figure>
  </div>
</template>

<style scoped>
.loop {
  display: grid;
  grid-template-columns: 570px 1fr;
  gap: 40px;
  align-items: center;
}
.loop__strip {
  position: relative;
  height: 262px;
}
.loop__edges {
  position: absolute;
  inset: 0;
  overflow: visible;
}
.loop__session {
  position: absolute;
  top: 0;
  width: 170px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.loop__card {
  padding: 14px 14px 16px;
  box-shadow: none;
}
.loop__who {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--fs-label);
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--muted);
}
.loop__who--you {
  margin-top: 12px;
  color: var(--tone-caution-ink);
}
.loop__msg {
  margin: 4px 0 0;
  padding: 8px 10px;
  border-radius: var(--r-chip);
  background: var(--label-bg);
  font-size: var(--fs-note);
  font-weight: 600;
  line-height: 1.55;
}
.loop__msg--you {
  background: var(--tone-caution-fill);
  color: var(--tone-caution-ink);
}
.loop__reset {
  position: absolute;
  top: 30px;
  height: 168px;
  border-left: 1.5px dashed var(--line-strong);
}
.loop__return {
  left: 207px;
  top: 241px;
}
.loop__quote {
  margin: 0;
  padding-left: 22px;
  border-left: 2px solid var(--tone-source);
}
.loop__quote .fx-quote {
  font-size: var(--fs-title);
  line-height: 1.25;
}
.loop__quote p {
  margin: 18px 0 0;
  font-size: var(--fs-note);
  line-height: 1.7;
  color: var(--ink-2);
}
</style>
