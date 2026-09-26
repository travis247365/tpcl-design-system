import type { ReactNode } from 'react';
import { Canvas, KeepOut } from '../components/Canvas';
import { LogoMark } from '../components/motifs';
import { cx } from '../utils';

/* ------------------------------------------------------------------
   Personal banner · 1584 × 396
   ------------------------------------------------------------------ */

export interface LinkedInBannerProps {
  eyebrow?: ReactNode;
  /** Caps, two lines. */
  title: ReactNode;
  line: ReactNode;
  /** Show the avatar keep-out guide (hidden on export regardless). */
  guides?: boolean;
  exportId?: string;
}

/**
 * The avatar covers the lower-left, so the deep-charcoal block on the left is
 * its landing pad. Type starts at x≈640 and stays inside the middle 60%.
 */
export function LinkedInBanner({ eyebrow = 'Travis Paul Consulting', title, line, guides = true, exportId }: LinkedInBannerProps) {
  return (
    <Canvas width={1584} height={396} exportId={exportId} className="tpl-banner tp-dark">
      <span className="tpl-banner-pad" />
      <span className="tpl-banner-rect" />
      <span className="tpl-banner-rect2" />
      <span className="tpl-banner-accent" />
      <p className="tpl-banner-eyebrow">{eyebrow}</p>
      <h1 className="tpl-banner-head">{title}</h1>
      <p className="tpl-banner-line">{line}</p>
      <LogoMark cut="white" height={44} />
      {guides && <KeepOut left={64} top={154} size={340}>Avatar<br />keep-out</KeepOut>}
    </Canvas>
  );
}

/* ------------------------------------------------------------------
   Company page cover · 1128 × 191
   ------------------------------------------------------------------ */

export interface LinkedInCompanyCoverProps {
  eyebrow?: ReactNode;
  /** One line of positioning, sentence case, argument in <b>. */
  title: ReactNode;
  guides?: boolean;
  exportId?: string;
}

/** Light mode — the page surrounds the cover with white chrome. The page logo sits bottom-left. */
export function LinkedInCompanyCover({ eyebrow = 'Travis Paul Consulting Ltd', title, guides = true, exportId }: LinkedInCompanyCoverProps) {
  return (
    <Canvas width={1128} height={191} exportId={exportId} className="tpl-cover">
      <span className="tpl-cover-rule" />
      <p className="tpl-cover-eyebrow">{eyebrow}</p>
      <h2 className="tpl-cover-head">{title}</h2>
      <LogoMark cut="black" height={38} />
      {guides && <KeepOut left={40} top={44} size={200} square>Page logo<br />keep-out</KeepOut>}
    </Canvas>
  );
}

/* ------------------------------------------------------------------
   Single image / link preview · 1200 × 627
   ------------------------------------------------------------------ */

export interface LinkedInSingleProps {
  eyebrow: ReactNode;
  /** 4–8 words, caps. */
  title: ReactNode;
  value: ReactNode;
  unit?: ReactNode;
  label: ReactNode;
  body: ReactNode;
  /** Provenance line — “Measured · Example Co, Jul 2026”. */
  source: ReactNode;
  chip?: ReactNode;
  exportId?: string;
}

/** The split archetype at 1.91:1. Doubles as the Open Graph image. No divider line. */
export function LinkedInSingle({ eyebrow, title, value, unit, label, body, source, chip = '01', exportId }: LinkedInSingleProps) {
  return (
    <Canvas width={1200} height={627} exportId={exportId} className="tpl-single">
      <div className="tpl-single-l">
        <span className="tpl-single-accent" />
        <p className="tpl-single-eyebrow">{eyebrow}</p>
        <h1 className="tpl-single-head">{title}</h1>
        <div className="tpt-fill" />
        <LogoMark cut="white" height={40} />
      </div>
      <div className="tpl-single-r">
        <p className="tpl-single-kv">{value}{unit && <small> {unit}</small>}</p>
        <p className="tpl-single-kl">{label}</p>
        <div className="tpl-single-rule" />
        <p className="tpl-single-body">{body}</p>
        <p className="tpl-single-src">{source}</p>
        {chip && <span className="tpl-single-chip">{chip}</span>}
      </div>
    </Canvas>
  );
}

/* ------------------------------------------------------------------
   Carousel · 1080 × 1350 — dark cover → light content → dark CTA
   ------------------------------------------------------------------ */

const CAROUSEL = { width: 1080, height: 1350 } as const;

export interface CarouselCoverProps {
  eyebrow: ReactNode;
  title: ReactNode;
  page: ReactNode;
  exportId?: string;
}

/** Cover — dark, caps, no body copy. */
export function CarouselCover({ eyebrow, title, page, exportId }: CarouselCoverProps) {
  return (
    <Canvas {...CAROUSEL} exportId={exportId} className="tpl-car-dark tp-dark">
      <span className="tpl-car-cover-rect" />
      <div className="tpt-pad">
        <span className="tpl-car-accent" />
        <p className="tpl-car-eyebrow">{eyebrow}</p>
        <h1 className="tpl-car-caps">{title}</h1>
        <div className="tpt-fill" />
        <p className="tpl-car-swipe">Swipe <span>→</span></p>
        <div className="tpt-hair-dark" style={{ marginBottom: 32 }} />
        <LogoMark cut="white" height={60} />
      </div>
      <span className="tpl-car-chip">{page}</span>
    </Canvas>
  );
}

export interface CarouselFigure { value: ReactNode; label: ReactNode }

export interface CarouselContentProps {
  eyebrow: ReactNode;
  /** Sentence case; bold the argument. */
  title: ReactNode;
  body: ReactNode;
  figures?: [CarouselFigure, CarouselFigure];
  /** Required whenever figures appear: Measured / Modelled + scope. */
  source?: ReactNode;
  page: ReactNode;
  exportId?: string;
}

/** Content — light, sentence case, one idea per page. */
export function CarouselContent({ eyebrow, title, body, figures, source, page, exportId }: CarouselContentProps) {
  return (
    <Canvas {...CAROUSEL} exportId={exportId} className="tpl-car-light">
      <div className="tpt-pad">
        <span className="tpl-car-accent" />
        <p className="tpl-car-eyebrow">{eyebrow}</p>
        <h2 className="tpl-car-sent">{title}</h2>
        <p className="tpl-car-body">{body}</p>
        <div className="tpt-fill" />
        {figures && (
          <div className="tpl-car-pair">
            {figures.map((f, i) => (
              <div key={i}>
                <div className="tpl-car-kv">{f.value}</div>
                <div className="tpl-car-kl">{f.label}</div>
              </div>
            ))}
          </div>
        )}
        {source && <p className="tpl-car-src">{source}</p>}
        <div className="tpt-hair-light tpl-car-hair" />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <LogoMark cut="black" height={52} />
        </div>
      </div>
      <span className="tpl-car-chip">{page}</span>
    </Canvas>
  );
}

export interface CarouselCtaProps {
  eyebrow: ReactNode;
  title: ReactNode;
  steps: ReactNode[];
  contactName: ReactNode;
  contactLine: ReactNode;
  page: ReactNode;
  exportId?: string;
}

/** CTA — dark, one ask, contact line. No data. */
export function CarouselCta({ eyebrow, title, steps, contactName, contactLine, page, exportId }: CarouselCtaProps) {
  return (
    <Canvas {...CAROUSEL} exportId={exportId} className={cx('tpl-car-dark', 'tpl-car-cta', 'tp-dark')}>
      <div className="tpt-pad">
        <span className="tpl-car-accent" />
        <p className="tpl-car-eyebrow">{eyebrow}</p>
        <h2 className="tpl-car-caps">{title}</h2>
        <div className="tpl-car-steps">
          {steps.map((s, i) => (
            <div className="tpl-car-li" key={i}>
              <span className="tp-step" style={{ width: 60, height: 60, borderWidth: 3, flex: '0 0 60px', fontSize: 24 }}>{i + 1}</span>
              <p>{s}</p>
            </div>
          ))}
        </div>
        <div className="tpt-fill" />
        <div className="tpl-car-contact">
          <p>{contactName}<br /><span>{contactLine}</span></p>
        </div>
        <div className="tpt-hair-dark tpl-car-hair" />
        <LogoMark cut="white" height={60} />
      </div>
      <span className="tpl-car-chip">{page}</span>
    </Canvas>
  );
}
