import type { ReactNode } from 'react';
import { Canvas, SafeZone } from '../components/Canvas';
import { LogoMark } from '../components/motifs';
import { SparkPath } from '../components/data';
import { cx } from '../utils';

/* ------------------------------------------------------------------
   Square · 1080 × 1080 — dark statement (light swap available)
   ------------------------------------------------------------------ */

export interface SocialSquareProps {
  mode?: 'dark' | 'light';
  eyebrow: ReactNode;
  /** Seven words or fewer, caps. This is the whole post. */
  title: ReactNode;
  sub?: ReactNode;
  /** The only cyan text. No figure? Omit it rather than filling the block. */
  figure?: { value: ReactNode; label: ReactNode };
  source: ReactNode;
  chip?: ReactNode;
  exportId?: string;
}

export function SocialSquare({ mode = 'dark', eyebrow, title, sub, figure, source, chip = '01', exportId }: SocialSquareProps) {
  return (
    <Canvas width={1080} height={1080} exportId={exportId} className={cx('tpx-sq', mode === 'dark' ? 'tpx-dark tp-dark' : 'tpx-light tp-light')}>
      <span className="tpt-deco" style={{ width: 300, height: 190, top: -40, right: 96 }} />
      <span className="tpt-deco" style={{ width: 150, height: 150, right: -46, top: 250, opacity: 0.55 }} />
      <div className="tpt-pad">
        <span className="tpx-accent" />
        <p className="tpx-sq-eyebrow">{eyebrow}</p>
        <h1 className="tpx-sq-head">{title}</h1>
        {sub && <p className="tpx-sq-sub">{sub}</p>}
        <div className="tpt-fill" />
        {figure && (
          <div className="tpx-sq-figrow">
            <div>
              <div className="tpx-sq-figure">{figure.value}</div>
              <div className="tpx-sq-figlabel">{figure.label}</div>
            </div>
            <div className="tpt-fill" />
          </div>
        )}
        <div className="tpt-hair-dark" />
        <div className="tpx-foot">
          {mode === 'dark' ? (
            <>
              <LogoMark cut="white" height={62} />
              <span className="tpx-sq-src">{source}</span>
            </>
          ) : (
            <>
              <span className="tpx-sq-src">{source}</span>
              <LogoMark cut="black" height={62} />
            </>
          )}
        </div>
      </div>
      {chip && <span className="tpx-chip">{chip}</span>}
    </Canvas>
  );
}

/* ------------------------------------------------------------------
   Portrait · 1080 × 1350 — light insight
   ------------------------------------------------------------------ */

export interface PortraitKpi { value: ReactNode; unit?: ReactNode; label: ReactNode }

export interface SocialPortraitProps {
  eyebrow: ReactNode;
  /** Sentence case, Regular, Bold on the phrase that carries the argument. */
  title: ReactNode;
  body: ReactNode;
  /** Three tiles maximum. */
  kpis: PortraitKpi[];
  /** Polyline points in a 920 × 190 box; one cyan stroke with a terminal dot. */
  spark?: string;
  /** Must state Measured / Modelled. */
  source: ReactNode;
  exportId?: string;
}

export function SocialPortrait({ eyebrow, title, body, kpis, spark, source, exportId }: SocialPortraitProps) {
  return (
    <Canvas width={1080} height={1350} exportId={exportId} className="tpx-pt tpx-light tp-light">
      <div className="tpt-pad">
        <span className="tpx-accent" />
        <p className="tpx-pt-eyebrow">{eyebrow}</p>
        <h1 className="tpx-pt-head">{title}</h1>
        <p className="tpx-pt-body">{body}</p>
        <div className="tpt-fill" />
        <div className="tpx-pt-kpi" style={{ ['--tpx-kpi-cols' as string]: Math.min(kpis.length, 3) }}>
          {kpis.slice(0, 3).map((k, i) => (
            <div key={i}>
              <div className="tpx-pt-kv">{k.value}{k.unit && <small> {k.unit}</small>}</div>
              <div className="tpx-pt-kl">{k.label}</div>
            </div>
          ))}
        </div>
        {spark && (
          <SparkPath className="tpx-pt-spark" points={spark} width={920} height={190} strokeWidth={6} dot={11} baseline />
        )}
        <div className="tpt-hair-light" />
        <div className="tpx-foot">
          <span className="tpx-pt-src">{source}</span>
          <LogoMark cut="black" height={62} />
        </div>
      </div>
    </Canvas>
  );
}

/* ------------------------------------------------------------------
   Story / Reel cover · 1080 × 1920 — safe zones 250 top & bottom
   ------------------------------------------------------------------ */

export interface SocialStoryProps {
  eyebrow: ReactNode;
  /** Three to six words, caps. */
  title: ReactNode;
  sub?: ReactNode;
  /** Omit for a single-statement story or a Reel cover. */
  steps?: ReactNode[];
  guides?: boolean;
  exportId?: string;
}

export function SocialStory({ eyebrow, title, sub, steps, guides = true, exportId }: SocialStoryProps) {
  return (
    <Canvas width={1080} height={1920} exportId={exportId} className="tpx-st tpx-dark tp-dark">
      <div className="tpx-st-pad">
        <span className="tpx-accent" />
        <p className="tpx-st-eyebrow">{eyebrow}</p>
        <h1 className="tpx-st-head">{title}</h1>
        {sub && <p className="tpx-st-sub">{sub}</p>}
        <div className="tpt-fill" />
        {steps && steps.length > 0 && (
          <div>
            {steps.map((s, i) => (
              <div className="tpx-st-li" key={i}>
                <span className="tp-step" style={{ width: 64, height: 64, borderWidth: 3, fontSize: 26 }}>{i + 1}</span>
                <p>{s}</p>
              </div>
            ))}
          </div>
        )}
        <div className="tpt-hair-dark" />
        <LogoMark cut="white" height={66} />
      </div>
      {guides && (
        <>
          <SafeZone onDark edge="top" size={250} label="Top 250px — profile, progress bar" />
          <SafeZone onDark edge="bottom" size={250} label="Bottom 250px — reply bar, CTA sticker" />
        </>
      )}
    </Canvas>
  );
}

/* ------------------------------------------------------------------
   WhatsApp Status · 1080 × 1920 — top 260 / bottom 320 overlaid
   ------------------------------------------------------------------ */

export interface WhatsAppStatusProps {
  eyebrow?: ReactNode;
  /** One idea. Status is read in under three seconds. */
  title: ReactNode;
  figure: ReactNode;
  figureUnit?: ReactNode;
  figureLabel: ReactNode;
  /** Point somewhere the viewer already is — URLs are not tappable on a Status. */
  cta: ReactNode;
  guides?: boolean;
  exportId?: string;
}

export function WhatsAppStatus({ eyebrow = 'Travis Paul Consulting', title, figure, figureUnit, figureLabel, cta, guides = true, exportId }: WhatsAppStatusProps) {
  return (
    <Canvas width={1080} height={1920} exportId={exportId} className="tpx-wa tpx-light tp-light">
      <span className="tpx-wa-band" />
      <span className="tpx-wa-corner" />
      <div className="tpx-wa-pad">
        <span className="tpx-accent" />
        <p className="tpx-wa-eyebrow">{eyebrow}</p>
        <h1 className="tpx-wa-head">{title}</h1>
        <div className="tpt-fill" />
        <div>
          <div className="tpx-wa-figure">{figure}{figureUnit && <small>{figureUnit}</small>}</div>
          <div className="tpx-wa-figlabel">{figureLabel}</div>
        </div>
        <div className="tpx-wa-rule" />
        <span className="tpx-wa-cta">{cta} <span>→</span></span>
        <div className="tpx-wa-gap" />
        <LogoMark cut="black" height={60} />
      </div>
      {guides && (
        <>
          <SafeZone edge="top" size={260} label="Top 260px — progress bar, contact name, timestamp" />
          <SafeZone edge="bottom" size={320} label="Bottom 320px — caption strip & “Reply” swipe-up" />
        </>
      )}
    </Canvas>
  );
}
