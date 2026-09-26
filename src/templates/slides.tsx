import type { ReactNode } from 'react';
import { AccentBlock, LogoMark, OutlineCard, OutlineRect, Timeline } from '../components/motifs';
import { Table, Tag, type Column } from '../components/data';
import type { Provenance } from '../tokens';
import { cx } from '../utils';

/*
 * Deck slide masters. Four masters cover a whole deck: cover, split, content,
 * statement. Laid out at 1280 × 720; export at device scale 1.5 for 1920 × 1080.
 */

interface SlideFrameProps {
  exportId?: string;
  className?: string;
  children: ReactNode;
}

function SlideFrame({ exportId, className, children }: SlideFrameProps) {
  return (
    <div className={cx('tps', className)} data-export={exportId} data-export-size="1920x1080" data-export-scale="1.5">
      {children}
    </div>
  );
}

/* ---------------- A · Cover ---------------- */

export interface SlideCoverProps {
  eyebrow: ReactNode;
  /** Caps headline; use <br/> for deliberate breaks. */
  title: ReactNode;
  subtitle?: ReactNode;
  exportId?: string;
}

/** Full charcoal. The accent block is deliberately absent — that is what makes it a cover. */
export function SlideCover({ eyebrow, title, subtitle, exportId }: SlideCoverProps) {
  return (
    <SlideFrame exportId={exportId} className="tps-dark tps-cover tp-dark">
      <OutlineRect width={300} height={200} top={-60} right={150} opacity={0.5} />
      <OutlineRect width={130} height={130} bottom={-40} right={70} opacity={0.3} />
      <div className="tps-pad">
        <div className="tpt-fill" />
        <p className="tps-eyeb">{eyebrow}</p>
        <h1 className="tps-caps">{title}</h1>
        {subtitle && <p className="tp-body-lg tps-cover-sub">{subtitle}</p>}
        <div className="tpt-fill" />
        <LogoMark cut="white" height={44} />
      </div>
    </SlideFrame>
  );
}

/* ---------------- B · Split ---------------- */

export interface SlideSplitStep {
  label: ReactNode;
  title: ReactNode;
  body: ReactNode;
}

export interface SlideSplitProps {
  eyebrow: ReactNode;
  title: ReactNode;
  steps: SlideSplitStep[];
  page: ReactNode;
  exportId?: string;
}

/** Charcoal / blue-gray. No divider line where they meet. The chip inverts on the panel. */
export function SlideSplit({ eyebrow, title, steps, page, exportId }: SlideSplitProps) {
  return (
    <SlideFrame exportId={exportId} className="tps-split">
      <div className="tps-split-l tp-dark">
        <AccentBlock dark className="tps-accent" />
        <div className="tpt-fill" />
        <p className="tps-eyeb">{eyebrow}</p>
        <h2 className="tps-caps">{title}</h2>
        <div className="tpt-fill" />
        <LogoMark cut="white" height={36} />
      </div>
      <div className="tps-split-r tp-panel">
        <Timeline>
          {steps.map((s, i) => (
            <li key={i}>
              <p className="tps-eyeb">{s.label}</p>
              <h3 className="tp-h3">{s.title}</h3>
              <p className="tp-note">{s.body}</p>
            </li>
          ))}
        </Timeline>
        <span className="tps-chip tps-chip--inverse">{page}</span>
      </div>
    </SlideFrame>
  );
}

/* ---------------- C · Content ---------------- */

export interface SlideContentProps<Row extends Record<string, unknown>> {
  eyebrow: ReactNode;
  /** Sentence case; wrap the argument in <b>. */
  title: ReactNode;
  columns: Column<Row>[];
  rows: Row[];
  total?: Partial<Record<string, ReactNode>>;
  soWhat: { eyebrow?: ReactNode; body: ReactNode; provenance: Provenance };
  source: ReactNode;
  page: ReactNode;
  exportId?: string;
}

const provTone = { measured: 'cyan', modelled: 'panel', assumed: 'neutral' } as const;
const provText = { measured: 'Measured', modelled: 'Modelled', assumed: 'Assumed' } as const;

/** White, sentence case, data-forward. The workhorse. */
export function SlideContent<Row extends Record<string, unknown>>({
  eyebrow, title, columns, rows, total, soWhat, source, page, exportId,
}: SlideContentProps<Row>) {
  return (
    <SlideFrame exportId={exportId} className="tps-light tps-content tp-light">
      <div className="tps-pad">
        <AccentBlock className="tps-accent" />
        <p className="tps-eyeb">{eyebrow}</p>
        <h2 className="tps-sent">{title}</h2>
        <div className="tps-content-grid">
          <Table columns={columns} rows={rows} total={total} />
          <div className="tp-card tp-card--accent">
            <p className="tp-eyebrow">{soWhat.eyebrow ?? 'So what'}</p>
            <p className="tp-body">{soWhat.body}</p>
            <Tag tone={provTone[soWhat.provenance]}>{provText[soWhat.provenance]}</Tag>
          </div>
        </div>
        <div className="tps-foot">
          <span className="tp-micro">{source}</span>
          <LogoMark cut="black" height={32} />
        </div>
      </div>
      <span className="tps-chip">{page}</span>
    </SlideFrame>
  );
}

/* ---------------- D · Statement / ask ---------------- */

export interface SlideStatementProps {
  eyebrow: ReactNode;
  statement: ReactNode;
  body?: ReactNode;
  page: ReactNode;
  exportId?: string;
}

/** Dark, outline card, nothing else. No data. */
export function SlideStatement({ eyebrow, statement, body, page, exportId }: SlideStatementProps) {
  return (
    <SlideFrame exportId={exportId} className="tps-dark tps-statement tp-dark">
      <div className="tps-pad">
        <AccentBlock dark className="tps-accent" style={{ position: 'absolute', top: 0, left: 0 }} />
        <OutlineCard className="tps-statement-card">
          <p className="tps-eyeb">{eyebrow}</p>
          <p className="tps-caps">{statement}</p>
          {body && <p className="tp-body-lg">{body}</p>}
        </OutlineCard>
        <LogoMark cut="white" height={36} style={{ position: 'absolute', bottom: 0, left: 0 }} />
      </div>
      <span className="tps-chip">{page}</span>
    </SlideFrame>
  );
}
