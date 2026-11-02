<script setup lang="ts">
const unseen = ['Slack での合意', 'Google Docs の議論']
const confluence = ['非エンジニアも読める', '複数リポジトリにまたがる決定も置ける']
</script>

<template>
  <div class="where">
    <figure class="where__quote">
      <blockquote class="fx-quote">anything it can't access in-context while running effectively doesn't exist</blockquote>
      <figcaption class="fx-cite"><Ref id="openai" label="OpenAI の記事「Harness engineering」" /></figcaption>
    </figure>

    <div class="where__map">
      <div class="where__seen">
        <span class="fx-caption">エージェントから届く範囲</span>
        <div class="fx-box fx-box--recommend where__repo">
          <strong>リポジトリ</strong>
          <code>docs/adr/</code>
          <span class="fx-tag">正本</span>
        </div>
      </div>

      <svg class="where__edge" viewBox="0 0 90 20" width="90" height="20" aria-hidden="true">
        <Edge d="M2 10 H86" :end="[86, 10]" dir="r" />
      </svg>
      <span class="where__edge-label">一方向に公開</span>

      <div class="fx-box where__wiki">
        <span class="where__wiki-name">wiki・社内サイト</span>
        <span>非エンジニア向けの写し</span>
      </div>

      <div class="where__unseen">
        <span class="fx-caption">見えない ＝ 存在しない</span>
        <p v-for="u in unseen" :key="u">{{ u }}</p>
      </div>
    </div>

    <p class="where__alt">
      <span><span class="where__alt-who"><Ref id="willhaben" /> と <Ref id="zozo" /> は Confluence を選んだ。</span>{{ confluence.join('。') }}。</span>
    </p>
  </div>
</template>

<style scoped>
.where__quote {
  margin: 0 0 40px;
}
.where__quote .fx-quote {
  font-size: var(--fs-title);
  line-height: 1.3;
  letter-spacing: var(--ls-display);
}
.where__map {
  position: relative;
  display: grid;
  grid-template-columns: 320px 96px 230px 1fr;
  align-items: center;
  gap: 0;
}
.where__seen {
  padding: 12px 16px 16px;
  border-radius: var(--r-box);
  border: 1.5px dashed var(--tone-recommend-line);
}
.where__seen .fx-caption {
  color: var(--tone-recommend-ink);
}
.where__repo {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 26px 20px;
  box-shadow: none;
}
.where__repo strong {
  font-size: var(--fs-body);
}
.where__repo code {
  font-size: var(--fs-label);
  color: var(--tone-recommend-ink);
}
.where__repo .fx-tag {
  margin-left: auto;
}
.where__edge {
  justify-self: center;
}
.where__edge-label {
  position: absolute;
  left: 320px;
  width: 96px;
  top: calc(50% + 8px);
  text-align: center;
  font-size: var(--fs-note);
  color: var(--muted);
}
.where__wiki {
  padding: 26px 20px;
  box-shadow: none;
}
.where__wiki-name {
  display: block;
  font-size: var(--fs-body);
  font-weight: 500;
}
.where__wiki span:not(.where__wiki-name) {
  display: block;
  margin-top: 2px;
  font-size: var(--fs-note);
  color: var(--muted);
}
.where__unseen {
  margin-left: 32px;
  padding-left: 20px;
  border-left: 1px solid var(--line);
}
.where__unseen p {
  margin: 8px 0 0;
  font-size: var(--fs-body);
  color: var(--muted);
}
.where__alt {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 40px 0 0;
  padding-top: 16px;
  border-top: 1px solid var(--line);
  font-size: var(--fs-note);
  line-height: 1.6;
  color: var(--ink-2);
}
.where__alt-who {
  font-weight: 500;
  color: var(--ink);
}
</style>
