/**
 * TPCL tokens as values, for contexts that cannot read CSS custom properties —
 * chiefly the email renderer (every style inline, no var()). tokens.css is the
 * source of truth; `tokens.test.ts` fails if these drift from it.
 */
export const color = {
  charcoal: '#3A3A3A',
  charcoalDeep: '#2B2B2B',
  charcoalSoft: '#4A4A4A',
  white: '#FFFFFF',
  bluegray: '#B8C5D6',
  cyan: '#00BCD4',
  amber: '#FFC107',
  ink: '#3A3A3A',
  inkMuted: '#6E6E6E',
  inkFaint: '#9A9A9A',
  rule: '#E4E6EA',
  surface: '#F5F6F8',
} as const;

/** Maps each `color` key to its CSS custom property. */
export const cssVar = {
  charcoal: '--tp-charcoal',
  charcoalDeep: '--tp-charcoal-deep',
  charcoalSoft: '--tp-charcoal-soft',
  white: '--tp-white',
  bluegray: '--tp-bluegray',
  cyan: '--tp-cyan',
  amber: '--tp-amber',
  ink: '--tp-ink',
  inkMuted: '--tp-ink-muted',
  inkFaint: '--tp-ink-faint',
  rule: '--tp-rule',
  surface: '--tp-surface',
} as const satisfies Record<keyof typeof color, string>;

/** 8px scale: --tp-1 … --tp-10. */
export const space = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128] as const;

export const font =
  '"Poppins", "Century Gothic", "Futura", "Avenir Next", -apple-system, "Segoe UI", sans-serif';

/** Email stack: Helvetica/Arial replace the system-ui tail, per the emailer template. */
export const emailFont = "'Poppins','Century Gothic',Futura,Helvetica,Arial,sans-serif";

/** Canvas sizes TPCL builds to (foundations/layout-grid). */
export const canvas = {
  slide: { width: 1920, height: 1080, margin: 96 },
  square: { width: 1080, height: 1080, margin: 80 },
  portrait: { width: 1080, height: 1350, margin: 80 },
  story: { width: 1080, height: 1920, margin: 80 },
  linkedinSingle: { width: 1200, height: 627, margin: 64 },
  linkedinBanner: { width: 1584, height: 396, margin: 64 },
  linkedinCover: { width: 1128, height: 191, margin: 40 },
  email: { width: 600, margin: 32 },
  website: { width: 1440, content: 1200, margin: 48 },
} as const;

export type Tone = 'light' | 'dark';
export type Provenance = 'measured' | 'modelled' | 'assumed';
