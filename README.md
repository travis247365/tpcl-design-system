# @tpcl/design-system

React implementation of the **TPCL — Travis Paul Consulting** design system (v1.0), built from the
Claude Design handoff in [`project/`](project/). The spec lives in [`project/README.md`](project/README.md);
`src/styles/tokens.css` is that handoff's `tokens.css`, verbatim, and a test keeps it that way.
The handoff's original note for coding agents is kept at [`project/HANDOFF.md`](project/HANDOFF.md).

> **Example content is synthetic.** Client names (Northwind plc, Client A/B, Example Co), portfolio
> figures and contact details in the templates and docs are placeholders, not engagement data. The
> sample figures still reconcile — segment rows sum to their totals — because the system requires it.

## What's here

| Path | What |
|---|---|
| `src/styles/` | `tokens.css` (source of truth) · `fonts.css` (Poppins 400/500/700) · `logo.css` (logo cuts) · `extensions.css` (deltas, provenance chips, KPI row, horizontal timeline, button states, nested-mode fixes) |
| `src/components/` | Motifs (`AccentBlock`, `IndexChip`, `OutlineRect`, `OutlineCard`, `Timeline`, `HorizontalTimeline`, `Step`, `LogoMark`), `Text`, `Surface`/`Split`, `Button`, `Card`, `Stat`/`KpiRow`/`Delta`/`ProvenanceChip`/`Sparkline`, `Table`, `Quote`, `Tag`, `Canvas`/`SafeZone`/`KeepOut` |
| `src/templates/` | Slide masters A–D · website (nav, hero, services, statement, proof, CTA band, footer) · LinkedIn (banner, company cover, single image, carousel cover/content/CTA) · social (square, portrait, story, WhatsApp Status) · `Emailer` |
| `src/email.tsx` | `renderEmail(props)` → paste-ready, table-based, inline-styled HTML |
| `src/assets/` | Fonts and the white / black / colour logo PNGs (760 × 395), extracted from the handoff |
| `docs/` | Vite docs app — rebuilds all 21 design pages from the library |
| `scripts/export.mjs` | Renders every template to its delivery format |

## Use

```tsx
import '@tpcl/design-system/styles.css';
import { Button, KpiRow, Stat, Delta, ProvenanceChip } from '@tpcl/design-system';

<KpiRow>
  <Stat value="USD 105.5m" label="Book reconciled" delta={<Delta direction="up">tied to source</Delta>} />
  <Stat value="41,007" label="Accounts in scope" delta={<Delta direction="up">4.2% vs June</Delta>} />
</KpiRow>
<Button href="/diagnostic">Book a diagnostic</Button>
```

Mode is set by the surface: wrap dark content in `<Surface mode="dark">` (or any `.tp-dark` element) and
the accent block, outline strokes, timeline halo, ghost button and muted text follow it.

```ts
import { renderEmail } from '@tpcl/design-system/email';
const html = renderEmail({ logoUrl: 'https://…/tpc_white.png', /* … */ });
```

`renderEmail` throws on a `data:` logo URL — Gmail and Outlook will not render it.

## Scripts

```sh
npm install
npm run dev         # docs app at http://localhost:5173
npm test            # token sync, component contracts, email rules
npm run typecheck
npm run build       # dist/ (library) + docs-dist/ (static docs site)
npm run export      # exports/: PNG, carousel PDF, WhatsApp JPEG < 1 MB, emailer HTML
```

`export` needs a Chromium for Playwright (`npx playwright install chromium`, or set `CHROMIUM_PATH`).
Set `TPCL_LOGO_URL` to the hosted white logo before exporting the email.

| Output | Size | Format |
|---|---|---|
| `slide-{a..d}-*.png` | 1920 × 1080 (laid out at 1280 × 720, rendered ×1.5) | PNG |
| `social-square-1080.png` · `social-portrait-1080x1350.png` · `social-story-1080x1920.png` | native | PNG |
| `linkedin-banner-1584x396.png` · `linkedin-cover-1128x191.png` · `linkedin-single-1200x627.png` | native, 1× | PNG |
| `linkedin-carousel.pdf` (+ `carousel-*.png`) | 1080 × 1350 per page | PDF |
| `whatsapp-status-1080x1920.jpg` | 1080 × 1920 | JPEG, quality stepped down until < 1 MB |
| `emailer-600.html` | 600 wide | HTML |

Safe-zone and keep-out guides are `.tp-noexport` and are hidden during export.

## Fidelity

Every template canvas and doc page was pixel-diffed against the prototype. Slides, social, LinkedIn,
website sections, carousel, cards/table/typography pages render identically. The remaining
differences are deliberate fixes where the prototype broke its own written rules:

- **Nested modes.** The prototypes put `tp-light` on `<body>`, so tokens.css turned outline strokes
  charcoal and timeline halos white *inside* dark bays, and muted text grey. The spec says cyan
  strokes on charcoal and a halo that matches the background; `extensions.css` makes the nearest
  surface win.
- **Timeline on blue-gray** (slide master B) gets a blue-gray halo, not charcoal.
- **Website hero ghost button** was charcoal-on-charcoal (invisible); it now uses the dark ghost style.
- **Nav CTA label** inherited the nav-link white (fails on cyan); it stays charcoal, at the prototype's 15px.

## Known limits

- The embedded Poppins is a **Latin-1 subset** (≈7.5 kB per weight). `→ ▲ ▼ − ✕` fall back to the
  system stack — the prototypes do the same. Swap in full Poppins files under `src/assets/fonts/`
  if you need wider coverage.
- Logos are the 760 × 395 PNGs from the handoff; vector masters are not in this repo.
- The fluid (below 900px) website layout follows the hero template's written responsive notes; only the
  1440 desktop frame has a prototype to compare against.

## Licence

The **code** — everything under `src/`, `docs/` and `scripts/`, and the configuration files — is released
under the [MIT licence](LICENSE).

Two things in this repository are **not** covered by MIT:

- **TPCL brand assets.** The Travis Paul Consulting name and the logo files (`src/assets/logo/`,
  and the logos embedded in `project/`) are © Travis Paul Consulting Ltd, all rights reserved. They are
  included so the design system renders; they may not be used to represent any other business.
- **Poppins.** The font files in `src/assets/fonts/` are © 2020 The Poppins Project Authors and are
  distributed under the [SIL Open Font License 1.1](src/assets/fonts/OFL.txt).
