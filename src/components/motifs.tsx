import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx, len, type StyleWithVars } from '../utils';

/* ------------------------------------------------------------------
   The five motifs — TPCL brand DNA. Use two to three per surface.
   ------------------------------------------------------------------ */

export interface AccentBlockProps extends HTMLAttributes<HTMLSpanElement> {
  /** sm 40×14 · md 56×20 (web) · lg 84×30 (1080 canvas). Override with width/height for other canvases. */
  size?: 'sm' | 'md' | 'lg';
  /** Force cyan. Inside a `.tp-dark` surface the block turns cyan automatically. */
  dark?: boolean;
  width?: number | string;
  height?: number | string;
}

/** M1 · Top-left accent block. Amber on white, cyan on charcoal. Absent from covers. */
export function AccentBlock({ size = 'md', dark, width, height, className, style, ...rest }: AccentBlockProps) {
  return (
    <span
      aria-hidden="true"
      {...rest}
      className={cx('tp-accent', size !== 'md' && `tp-accent--${size}`, dark && 'tp-accent--dark', className)}
      style={{ width: len(width), height: len(height), ...style }}
    />
  );
}

export interface IndexChipProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  /** Flush to the right edge, vertically centred. Parent must be positioned. */
  edge?: boolean;
  /** Charcoal chip — use on a blue-gray panel, where blue-gray would vanish. */
  inverse?: boolean;
  /** Square size in px (34 web · 44 slide preview · 66 on a 1080 canvas). */
  size?: number;
  fontSize?: number;
}

/** M2 · Index chip. It bleeds off the edge; it is never inset. */
export function IndexChip({ children, edge, inverse, size, fontSize, className, style, ...rest }: IndexChipProps) {
  return (
    <span
      {...rest}
      className={cx('tp-chip', edge && 'tp-chip--edge', inverse && 'tp-chip--inverse', className)}
      style={{ width: len(size), height: len(size), fontSize: len(fontSize), ...style }}
    >
      {children}
    </span>
  );
}

export interface OutlineRectProps extends HTMLAttributes<HTMLSpanElement> {
  width: number | string;
  height: number | string;
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  opacity?: number;
  /** Stroke weight; 2 at web scale, 3 on 1080+ canvases. */
  stroke?: number;
}

/**
 * M3 · Outline rectangle — texture in the empty half of a dark page.
 * Keep them unequal, unaligned, and bleeding off the margin.
 * Never on the same page as the timeline.
 */
export function OutlineRect({ width, height, top, right, bottom, left, opacity, stroke, className, style, ...rest }: OutlineRectProps) {
  return (
    <span
      aria-hidden="true"
      {...rest}
      className={cx('tp-outline', className)}
      style={{
        position: 'absolute',
        width: len(width), height: len(height),
        top: len(top), right: len(right), bottom: len(bottom), left: len(left),
        opacity, borderWidth: len(stroke),
        ...style,
      }}
    />
  );
}

export interface OutlineCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** M3 · Outline card — frames a single statement, an ask, or a commercial number. */
export function OutlineCard({ children, className, ...rest }: OutlineCardProps) {
  return <div {...rest} className={cx('tp-outline-card', className)}>{children}</div>;
}

export interface TimelineItem {
  /** Time label — weeks, quarters or days. A timeline without dates is just a list. */
  label?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
}

export interface TimelineProps extends HTMLAttributes<HTMLUListElement> {
  /** Structured items. Omit and pass `<li>` children for custom item markup. */
  items?: TimelineItem[];
  /** Colour for the body text; defaults to the surface's muted tone. */
  bodyColor?: string;
  bodyMaxWidth?: string;
}

/** M4 · Vertical cyan timeline. Three to five items. */
export function Timeline({ items, bodyColor, bodyMaxWidth, className, children, ...rest }: TimelineProps) {
  return (
    <ul {...rest} className={cx('tp-timeline', className)}>
      {items ? items.map((item, i) => (
        <li key={i}>
          {item.label != null && <p className="tp-phase">{item.label}</p>}
          <h3 className="tp-h3" style={{ margin: item.label != null ? '6px 0 6px' : 0 }}>{item.title}</h3>
          {item.body != null && (
            <p className="tp-note tp-muted" style={{ color: bodyColor, maxWidth: bodyMaxWidth }}>{item.body}</p>
          )}
        </li>
      )) : children}
    </ul>
  );
}

export interface HorizontalTimelineProps extends Omit<HTMLAttributes<HTMLUListElement>, 'children'> {
  items: TimelineItem[];
  bodyColor?: string;
}

/** M4 · Horizontal timeline — for 16:9 slides and wide web sections. Weights do not change. */
export function HorizontalTimeline({ items, bodyColor, className, style, ...rest }: HorizontalTimelineProps) {
  const s: StyleWithVars = { '--tp-htl-cols': items.length, ...style };
  return (
    <ul {...rest} className={cx('tp-htl', className)} style={s}>
      {items.map((item, i) => (
        <li key={i}>
          {item.label != null && <p className="tp-phase">{item.label}</p>}
          <h3 className="tp-h3" style={{ margin: '6px 0 4px' }}>{item.title}</h3>
          {item.body != null && <p className="tp-note tp-muted" style={{ color: bodyColor }}>{item.body}</p>}
        </li>
      ))}
    </ul>
  );
}

export interface StepProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  /** 40 at web scale; 60–64 on 1080 canvases. */
  size?: number;
  fontSize?: number;
  stroke?: number;
}

/** M5 · Numbered step box. Square — the circle is reserved for the timeline dot. */
export function Step({ children, size, fontSize, stroke, className, style, ...rest }: StepProps) {
  const s: CSSProperties = {
    width: len(size), height: len(size), fontSize: len(fontSize), borderWidth: len(stroke),
    flex: size ? `0 0 ${size}px` : undefined,
    ...style,
  };
  return <span {...rest} className={cx('tp-step', className)} style={s}>{children}</span>;
}

export type LogoCut = 'white' | 'black' | 'colour' | 'tint';

export interface LogoMarkProps extends HTMLAttributes<HTMLSpanElement> {
  /** white on charcoal · black on white · colour only where no cyan accent shares the surface. */
  cut: LogoCut;
  height?: number | string;
  width?: number | string;
}

/**
 * Signature logo. Bottom-LEFT on dark, bottom-RIGHT on light.
 * Ratio locked at 760:395 — set height or width, never both.
 * Clear space: 45% of logo height on all four sides.
 */
export function LogoMark({ cut, height, width, className, style, ...rest }: LogoMarkProps) {
  return (
    <span
      role="img"
      aria-label="Travis Paul Consulting"
      {...rest}
      className={cx('tp-mark', `tp-mark--${cut}`, className)}
      style={{ height: len(height), width: len(width ?? (height != null ? 'auto' : undefined)), ...style }}
    />
  );
}
