---
name: slide-review
description: Review this Slidev deck against AGENTS.md. Use when asked to review, check, or polish the slides, or before committing a change to slides.md, components/, layouts/, or styles/.
---

# Slide review

1. Run `node scripts/check.mjs --lint`. Fix every design-rule break before looking at pixels. Each message names the rule and why it exists.
2. Start the dev server with `pnpm dev` if port 3030 is not already serving, then run `node scripts/check.mjs shots [slideNo...]`. It exits non-zero on text overflowing the slide, clipped content, sentences under 14px, and links hidden under overlays.
3. Look at every changed slide's PNG in `shots/` (open `shots/sheet.html` for the contact sheet). The script cannot judge these, so check them by eye:
   - The slide makes one point, and the heading states it as a sentence.
   - `--tone-caution` marks only No, rejection, skepticism, or failure. Emphasis without judgment uses `--tone-emphasis`.
   - Nothing was made smaller to fit. Content that does not fit is cut or moved to an appendix slide.
4. Read the notes report. A slide over 500 characters usually needs a better figure, not a faster speaker.
5. Report each finding as slide number, rule, and the concrete fix.
