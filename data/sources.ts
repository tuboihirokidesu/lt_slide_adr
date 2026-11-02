// 出典レジストリ。スライドのリンクと最後の出典一覧は、すべてここから引く。
export type SourceGroup = 'video' | 'primary' | 'paper' | 'ja' | 'x'

type Base = {
  /** スライドに出す帰属の表示名 */
  who: string
  /** 原典のタイトル（出典一覧に出す） */
  title: string
  /** 原稿に URL がないものは持たない。Ref はプレーンテキストで描く */
  url?: string
}

/** 出典一覧のどれかの群に並ぶ出典か、別の出典の中の1ページ（一覧では親の行にまとめる） */
export type Source = Base & ({ group: SourceGroup } | { partOf: string })

const kody = 'https://github.com/kody-hq/kody/blob/main/docs/contributing'
const kodyAdr = (slug: string) => `${kody}/decisions/${slug}.md`

export const sources = {
  kent: { group: 'video', who: 'Kent C. Dodds', title: 'Turn Your Agent on Auto-Pilot with ADRs', url: 'https://www.youtube.com/watch?v=vRoqBBI51Vo' },
  'kent-slides': { partOf: 'kent', who: 'スライド', title: 'スライド', url: 'https://kcd-slides-bwk-adrs-for-agents.pages.dev/' },
  kody: { group: 'video', who: 'Kody', title: 'docs/contributing/decisions', url: 'https://github.com/kody-hq/kody/tree/main/docs/contributing/decisions' },
  'kody-index': { partOf: 'kody', who: 'index.md', title: 'index.md', url: kodyAdr('index') },
  'kody-template': { partOf: 'kody', who: '0000-template.md', title: '0000-template.md', url: kodyAdr('0000-template') },
  'kody-primitives': { partOf: 'kody', who: 'primitives.yaml', title: 'primitives.yaml', url: `${kody}/architecture/primitives.yaml` },
  'kody-0001': { partOf: 'kody', who: '0001', title: '0001', url: kodyAdr('0001-no-package-versioning') },
  'kody-0006': { partOf: 'kody', who: '0006', title: '0006', url: kodyAdr('0006-no-repo-ci-primitive') },
  'kody-0015': { partOf: 'kody', who: '0015', title: '0015', url: kodyAdr('0015-skills-over-mcp-wait') },
  'kody-0058': { partOf: 'kody', who: '0058', title: '0058', url: kodyAdr('0058-skills-over-mcp-progressive-enhancement') },
  'kody-0041': { partOf: 'kody', who: '0041', title: '0041', url: kodyAdr('0041-no-hardcoded-operator-correspondence') },
  'kody-0025': { partOf: 'kody', who: '0025', title: '0025', url: kodyAdr('0025-no-package-services-primitive') },
  keeling: { group: 'video', who: 'Michael Keeling', title: 'Architecture Decision Records in Action（SATURN 2017）', url: 'https://www.youtube.com/watch?v=41NVge3_cYo' },
  dirzys: { group: 'video', who: 'Vladas Diržys', title: 'Introduction to ADRs（Voxxed Days）', url: 'https://www.youtube.com/watch?v=ue4XxmXheiI' },
  ayers: { group: 'video', who: 'David Ayers', title: 'Communicating and documenting architectural decisions', url: 'https://www.youtube.com/watch?v=rwfXkSjFhzc' },

  nygard: { group: 'primary', who: 'Michael Nygard', title: 'Documenting Architecture Decisions（2011）', url: 'https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions' },
  adr: { group: 'primary', who: 'ADR GitHub organization', title: 'Architectural Decision Records', url: 'https://adr.github.io/' },
  madr: { partOf: 'adr', who: 'MADR', title: 'MADR', url: 'https://adr.github.io/madr/' },
  radar: { group: 'primary', who: 'ThoughtWorks Radar', title: 'Lightweight Architecture Decision Records', url: 'https://www.thoughtworks.com/radar/techniques/lightweight-architecture-decision-records' },
  'radar-advice': { partOf: 'radar', who: 'ThoughtWorks Radar', title: 'Architecture advice process', url: 'https://www.thoughtworks.com/radar/techniques/architecture-advice-process' },
  aws: { group: 'primary', who: 'AWS', title: 'Prescriptive Guidance「ADR process」', url: 'https://docs.aws.amazon.com/prescriptive-guidance/latest/architectural-decision-records/adr-process.html' },
  'aws-practices': { partOf: 'aws', who: 'AWS', title: 'Best practices', url: 'https://docs.aws.amazon.com/prescriptive-guidance/latest/architectural-decision-records/best-practices.html' },
  gcloud: { group: 'primary', who: 'Google Cloud', title: 'Architecture decision records overview', url: 'https://docs.cloud.google.com/architecture/architecture-decision-records' },
  azure: { group: 'primary', who: 'Azure Well-Architected', title: 'Maintain an ADR', url: 'https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record' },
  openai: { group: 'primary', who: 'OpenAI', title: 'Harness engineering', url: 'https://openai.com/index/harness-engineering/' },
  pocock: { group: 'primary', who: 'Matt Pocock', title: 'grill-with-docs', url: 'https://github.com/mattpocock/skills' },

  tang: { group: 'paper', who: 'Tang ほか', title: 'JSS 2006', url: 'https://doi.org/10.1016/j.jss.2006.04.029' },
  buchgeher: { group: 'paper', who: 'Buchgeher ほか', title: 'IEEE Access 2023', url: 'https://doi.org/10.1109/ACCESS.2023.3287654' },
  dhar: { group: 'paper', who: 'Dhar ほか', title: 'ICSA 2024', url: 'https://arxiv.org/abs/2403.01709' },
  gupta: { group: 'paper', who: 'Gupta ほか', title: 'EASE 2026', url: 'https://arxiv.org/abs/2604.03826' },
  eth: { group: 'paper', who: 'ETH Zurich', title: 'arXiv 2026', url: 'https://arxiv.org/abs/2602.11988' },
  'eth-appendix': { partOf: 'eth', who: 'ETH Zurich', title: '付録B', url: 'https://arxiv.org/html/2602.11988v2' },
  lulla: { group: 'paper', who: 'Lulla ほか', title: 'JAWs 2026', url: 'https://arxiv.org/abs/2601.20404' },

  equalexperts: { group: 'ja', who: 'Equal Experts', title: 'Accelerating ADRs with Generative AI', url: 'https://www.equalexperts.com/blog/ai/accelerating-architectural-decision-records-adrs-with-generative-ai/' },
  zozo: { group: 'ja', who: 'ZOZO', title: 'ZOZOFIT における ADR を利用した意思決定を残す文化作り', url: 'https://techblog.zozo.com/entry/adr-culture-of-zozofit' },
  layerx: { group: 'ja', who: 'LayerX', title: '不正検知システムを3日で設計し、3週間で本番リリースした話', url: 'https://tech.layerx.co.jp/entry/fraud-detection-development-accelerated-by-llm' },
  ebbing: { group: 'ja', who: 'Ebbing', title: '設計判断を 64 本の ADR に残している理由と書き方', url: 'https://zenn.dev/kam_labz/articles/ebbing-adr-with-claude-code' },
  'zenn-guide': { group: 'ja', who: 'Zenn', title: 'ADR 完全ガイド', url: 'https://zenn.dev/miyan/articles/adr-format-guide-for-and-against' },
  willhaben: { group: 'ja', who: 'willhaben', title: '8 Learnings from using ADRs', url: 'https://tech.willhaben.at/8-learnings-from-using-architecture-decision-records-adrs-at-willhaben-5b1594ebaffe' },
  nifty: { group: 'ja', who: 'NIFTY engineering', title: '意思決定を記録する ADR の話（X 経由、本文未取得）' },

  huntley: { group: 'x', who: '@GeoffreyHuntley', title: 'ADR がほぼすべて', url: 'https://x.com/GeoffreyHuntley/status/2100502483005325315' },
  haandol: { group: 'x', who: '@haandol', title: '抽象の逆転', url: 'https://x.com/haandol/status/2092989879110209591' },
  kizuno: { group: 'x', who: '@Kizuno18', title: '散文はコンパイルされない', url: 'https://x.com/Kizuno18/status/2114591887172534754' },
  cypherpunk: { group: 'x', who: '@cypherpunkMTL', title: '文脈であり統治でない', url: 'https://x.com/cypherpunkMTL/status/2098228656204067181' },
  konev: { group: 'x', who: '@EvgeniiKonev', title: '古さは欄で表す', url: 'https://x.com/EvgeniiKonev/status/2112873336732864870' },
  roeishous: { group: 'x', who: '@roeishous', title: 'ADR は長すぎる', url: 'https://x.com/roeishous/status/2109932100397027664' },
  prapkim: { group: 'x', who: '@PrapKim', title: 'すぐ古くなる', url: 'https://x.com/PrapKim/status/2112544362811011093' },
  uehra: { group: 'x', who: '@masayoshi_uehra', title: '索引で現役を示す', url: 'https://x.com/masayoshi_uehra/status/2115642202022178862' },
  therobertta: { group: 'x', who: '@therobertta_', title: 'Sean Goedecke の運用', url: 'https://x.com/therobertta_/status/2061350032608293122' },
  ericsoundminds: { group: 'x', who: '@EricSoundMinds', title: 'docs と AGENTS.md', url: 'https://x.com/EricSoundMinds/status/2111498258627609055' },
  gr1m0h: { group: 'x', who: '@gr1m0h', title: 'xDR でよい', url: 'https://x.com/gr1m0h/status/1925142200742236367' },
  msy78: { group: 'x', who: '@msy78', title: '綺麗に残すと億劫', url: 'https://x.com/msy78/status/1888059241220685955' },
  mxissue: { group: 'x', who: '@Mx_Issue', title: '作業記録は消す', url: 'https://x.com/Mx_Issue/status/2012096838036496858' },
} as const satisfies Record<string, Source>

export type SourceId = keyof typeof sources

/** 出典名を含む文。文字列と出典の参照を並べ、RefText が描く */
export type Inline = string | { ref: SourceId; label?: string }
