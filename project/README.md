# TPCL Design System

**Travis Paul Consulting Ltd · v1.0**

Apply this system to everything TPCL-branded: slides, social posts, LinkedIn, WhatsApp Status,
email, and the website. `tokens.css` is the machine-readable source of truth; the pages in
`foundations/`, `components/` and `templates/` are the worked examples.

---

## The system in one paragraph

TPCL runs a **two-mode** system. **Charcoal `#3A3A3A`** and **white `#FFFFFF`** do all the work.
Dark mode carries openers, section breaks and statements — **Bold, ALL CAPS, cyan accent**. Light
mode carries content, data and bios — **Regular, sentence case, amber accent**. Type is **Poppins**
in exactly three weights. Corners are square, there are no shadows and no gradients, and every
figure states whether it is measured or modelled.

---

## Tokens

| Token | Hex | Job |
|---|---|---|
| `--tp-charcoal` | `#3A3A3A` | Dark background · light-mode body text |
| `--tp-white` | `#FFFFFF` | Light background · dark-mode text. **Pure white, never off-white** |
| `--tp-bluegray` | `#B8C5D6` | Split panel, index chip, accent card. **A surface, not a text colour** |
| `--tp-cyan` | `#00BCD4` | **Dark-mode accent** — accent block, timeline, outline cards, primary button |
| `--tp-amber` | `#FFC107` | **Light-mode accent** — top-left accent block on white. Used sparingly |
| `--tp-ink-muted` | `#6E6E6E` | Secondary text, captions, table headers on white |

Support: `--tp-charcoal-deep #2B2B2B` · `--tp-charcoal-soft #4A4A4A` · `--tp-surface #F5F6F8` ·
`--tp-rule #E4E6EA`.

### Contrast rules — these are measured, not stylistic

- **White on cyan is 2.30:1 and FAILS.** Cyan buttons and cyan fills always carry **charcoal** labels.
- **On white, cyan (2.30:1) and amber (1.63:1) are graphic-only** — blocks, rules, dots, borders,
  fills behind dark text. Never body copy, never a link colour on white.
- **On charcoal, cyan (4.95:1) and amber (6.98:1) are safe as text.** This is why the cyan timeline
  and cyan hero figures live on dark surfaces.
- **Blue-gray is 1.75:1 on white** — it can only ever be a surface.
- Charcoal on white / white on charcoal is 11.37:1.

---

## Typography

**Poppins only**, in **Regular 400 · Medium 500 · Bold 700**. No semibold, no light, no italic.
Fallback stack: `Poppins, "Century Gothic", Futura, "Avenir Next", -apple-system, "Segoe UI", sans-serif`.

| Style | Size / leading / weight | Case |
|---|---|---|
| Display | 60 / 1.02 / 700, +.01em | **UPPERCASE** — dark surfaces only |
| Title | 44 / 1.12 / 400, −.01em | Sentence case — light surfaces |
| H2 | 28 / 1.2 / 700 | Sentence case |
| H3 | 20 / 1.3 / 500 | Sentence case |
| Body | 16 / 1.6 / 400 | — |
| Eyebrow | 12 / 1 / 500, +.16em | **UPPERCASE** |
| Caption | 13 / 1.45 / 400 | — |
| Figures | 700, `tabular-nums`, −.02em | — |

**The case rule is the system.** Caps on charcoal signals a break; sentence case on white signals
substance. Do not enforce one case across a deck. In light mode, set the phrase that carries the
argument in **Bold** inside an otherwise Regular headline — that mixed weight is the light-mode
signature.

Body measure 58–72 characters. Positive tracking only on uppercase; negative only on large titles.

---

## The five motifs (brand DNA)

Use **two to three per surface**, never all five.

1. **Top-left accent block** — filled rectangle at the upper-left margin, ~2.8:1 ratio
   (56×20 web, 84×30 at 1080px, 90×30 on a 1920 slide). **Amber on white, cyan on charcoal.**
   On every internal page; **absent from covers** — its absence is what makes a cover a cover.
2. **Index chip** — 34px blue-gray square, white numeral, **flush to the right edge**, vertically
   centred. It bleeds off the edge; it is never inset. On a blue-gray panel it inverts to charcoal.
3. **Cyan outline rectangles** — 2px stroke, no fill. Texture in the empty half of a dark page, or
   a frame around a single statement. Keep them **unequal, unaligned, and bleeding off the margin**.
   On light pages the stroke turns charcoal.
4. **Cyan timeline** — 2px vertical rule, 12px round dots with a 4px halo in the background colour,
   for anything sequential. Every item carries a time label in cyan Medium uppercase.
5. **Numbered step boxes** — 40px squares, 2px cyan stroke, bold numeral. Square, because the circle
   is reserved for the timeline dot.

**Combination rules.** The accent block is placed first, at the top-left margin intersection, and
everything aligns to that margin. The signature logo sits diagonally opposite it. Outline rectangles
and the timeline never share a page. **In a split layout the dark and light blocks meet directly —
there is no divider line.** That is the most commonly mis-built rule in the system.

---

## Logo

Handwritten **Travis Paul** script with **CONSULTING** in tracked caps. Ratio locked at 1.93:1.
**Four approved treatments** (2021 brand master): full colour, black, tint `#57585A`, reversed white.

- **Dark surface → bottom LEFT. Light surface → bottom RIGHT.**
- **Clear space = 45% of the logo height on all four sides** (= 23.5% of its width; padding is
  uniform). Measured off `travis paul_logo_Clear Space.ai`. This is about double what most people
  leave by eye.
- Minimum: 120px wide on screen, 34px tall in a slide footer, 28mm in print.
- Never on cyan or amber, never stretched, never on a mid-tone or a busy photo.
- Co-branding: TPCL left, client right, 1px rule between, optically matched heights. On a client's
  own document the client mark leads and TPCL is never larger.

Files: `memory/assets/tpcl_logos/tpc_{white,black,colour}.png`. Use **Consulting** by default;
Holdings (`pthl_*`) only for parent-entity material.

**The logo's colours are not the layout palette.** The 2021 master is deep blue `#085F89`, caps cyan
`#59D1E2`, pure black `#000000`. The layout system is charcoal `#3A3A3A` + cyan `#00BCD4`. The logo
keeps its own colours — never recolour it. But `#59D1E2` and `#00BCD4` are close without matching, so
**never put the full-colour logo on a surface that carries a cyan accent block**; use black or white
there. This is why every template uses black-on-white and white-on-charcoal.

---

## Layout

8px spacing scale. **Heading→body 16 · block→block 32 · section→section 64.**
Margins: 48 web · 64 on a 16:9 slide (96 at 1920) · 80 on a 1080px social canvas · 32 in email.

12-column grid, 24px gutter, 1200px content in a 1440px frame. **Prefer 7/5 or 5/7 splits, not
6/6** — 50/50 is reserved for the dark/light mode split, where the colour supplies the asymmetry.

**Radius is 0.** Every card, chip, button, crop and accent block is square. Strokes: 1px hairline,
2px outline, 3px accent rule. **No shadows, no gradients, no glassmorphism.** Depth comes from tone
(white → surface → blue-gray → charcoal-soft), never from elevation.

### Canvas sizes

| Surface | Pixels | Margin |
|---|---|---|
| Deck slide | 1920 × 1080 | 96 |
| Instagram / Facebook square | 1080 × 1080 | 80 |
| Instagram / LinkedIn portrait | 1080 × 1350 | 80 |
| Story / Reel / WhatsApp Status | 1080 × 1920 | 80 |
| LinkedIn single image + link preview | 1200 × 627 | 64 |
| LinkedIn personal banner | 1584 × 396 | 64 |
| LinkedIn company page cover | 1128 × 191 | 40 |
| Email body | 600 wide | 32 |
| Website | 1440 frame / 1200 content | 48 |

---

## Data and evidence

TPCL sells evidence, so the figures get the largest type on the page and nothing decorative around
them.

- **Every figure carries a provenance chip or a source line: Measured · Modelled · Assumed.**
  A modelled number is never presented as measured. This rule overrides visual preference — if the
  chip crowds the layout, change the layout.
- Tables: **no vertical rules, no zebra stripes, no fills.** One 2px charcoal rule under the header,
  1px hairlines between rows. Numbers right-aligned and tabular; text left-aligned; never centred.
  Totals bold and unfilled — **and they must reconcile to source**.
- KPI rows: max four tiles, value 44px Bold above a 13px Medium uppercase label, hairline
  separators. Deltas name the comparison ("vs June"), never a bare percentage.
- Charts: one cyan stroke, terminal dot, no gridlines, no legend when the KPI row already carries
  the numbers. Green `#1E7A46` / red `#B00020` appear **only** on deltas, lightened on charcoal.

---

## Per-surface notes that change the build

- **WhatsApp Status** — WhatsApp overlays the top ~260px (progress bar, contact, timestamp) and the
  bottom ~320px (caption strip, "Reply" swipe-up). Content lives in the middle 1340px; background
  still fills the full 1920. URLs are not tappable on a Status. Export JPEG under 1 MB.
- **Instagram / Facebook Story** — safe zones are ~250px top and bottom. A Reel cover is cropped to
  1:1 in the profile grid, so anything that must survive lives in the centre square.
- **LinkedIn carousel** — 7–10 pages, ingested as a **PDF**. Rhythm: dark cover → light content →
  dark CTA. One idea per page. Cover carries no body copy; CTA carries no data.
- **LinkedIn banners** — the avatar covers the lower-left of the 1584×396, and the page logo covers
  the lower-left of the 1128×191. Keep type inside the middle 60% horizontally.
- **Email** — the one place the system bends. Gmail strips `@font-face`, so Poppins only renders for
  recipients who have it; the fallback stack is expected and must not be worked around with images
  of text. **Data-URI images do not render in Gmail or Outlook — host the logo and reference an
  https URL before sending.** Tables not flexbox (Outlook renders through Word), all styles inline,
  600px fixed, one column, no background images, 44px+ tap targets.

---

## Client overlay

Engagement work tints exactly one variable — `--tp-client` — and swaps the co-brand logo. The
charcoal/white frame, Poppins and the five motifs stay TPCL. Precedents: Client A green `#28B04C`,
Client B blue `#3865B0` / orange `#F47321`. **Check any client colour against charcoal and white
before using it as text.**

---

## Quick checklist before anything ships

1. Two to three motifs present, accent block at the top-left, logo diagonally opposite.
2. Case rule respected — caps on charcoal, sentence case on white.
3. No divider line where a dark and light block meet.
4. Cyan/amber used as text only on charcoal; charcoal labels on cyan/amber fills.
5. Square corners, no shadows, no gradients.
6. Every figure has provenance, and every total reconciles.
7. Signature bottom-left on dark, bottom-right on light.
