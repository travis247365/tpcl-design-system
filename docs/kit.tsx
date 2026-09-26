import type { CSSProperties, ReactNode } from 'react';
import { AccentBlock } from '../src';

/* Doc-page chrome shared by the foundation and component pages — mirrors the
   .tp-doc / .tp-sec / .lab scaffolding in the Claude Design cards. */

export function DocPage({ title, lede, className, children }: {
  title: ReactNode; lede: ReactNode; className?: string; children: ReactNode;
}) {
  return (
    <div className={`tp-doc ${className ?? ''}`}>
      <AccentBlock />
      <h1 style={{ marginTop: 20 }}>{title}</h1>
      <p className="tp-lede">{lede}</p>
      {children}
    </div>
  );
}

export function Sec({ title, children, style }: { title?: ReactNode; children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="tp-sec" style={style}>
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
}

/** Small tracked label above a demo bay. */
export function Lab({ children }: { children: ReactNode }) {
  return <p className="doc-lab">{children}</p>;
}

/** Bulleted rules list at the foot of each card. */
export function Rules({ children, ordered, spaced, maxWidth = '70ch' }: {
  children: ReactNode; ordered?: boolean; spaced?: boolean; maxWidth?: string;
}) {
  const Tag = ordered ? 'ol' : 'ul';
  return <Tag className={`tp-note doc-rules${spaced ? ' rules-spaced' : ''}`} style={{ maxWidth }}>{children}</Tag>;
}

/** Dark demo bay (charcoal block inside a light page). */
export function DarkBay({ children, padding = 30, style }: { children: ReactNode; padding?: CSSProperties['padding']; style?: CSSProperties }) {
  return <div className="tp-dark" style={{ padding, ...style }}>{children}</div>;
}

/* ---- Template-page chrome: the grey label above each canvas and the notes below. ---- */

export function TemplateTag({ children, width }: { children: ReactNode; width?: number }) {
  return <p className="tp-noexport doc-ttag" style={{ width }}>{children}</p>;
}

export function TemplateNotes({ title, width, maxWidth = '78ch', children }: {
  title: ReactNode; width: number; maxWidth?: string; children: ReactNode;
}) {
  return (
    <div className="tp-noexport doc-tnotes" style={{ width }}>
      <p className="doc-tnotes-title">{title}</p>
      <p className="doc-tnotes-body" style={{ maxWidth }}>{children}</p>
    </div>
  );
}

export function TemplatePage({ children }: { children: ReactNode }) {
  return <div className="doc-template">{children}</div>;
}
