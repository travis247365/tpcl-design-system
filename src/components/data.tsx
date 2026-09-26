import type { CSSProperties, HTMLAttributes, ReactNode, TableHTMLAttributes } from 'react';
import type { Provenance } from '../tokens';
import { cx, type StyleWithVars } from '../utils';

/* ------------------------------------------------------------------
   Data and evidence. TPCL sells evidence, so figures get the largest
   type on the page and nothing decorative around them.
   ------------------------------------------------------------------ */

export interface DeltaProps extends HTMLAttributes<HTMLSpanElement> {
  direction: 'up' | 'down';
  /** Name the comparison (“4.2% vs June”), never a bare percentage. */
  children: ReactNode;
}

/** Green/red appear only on deltas — darkened on white, lightened on charcoal. */
export function Delta({ direction, children, className, ...rest }: DeltaProps) {
  return (
    <span {...rest} className={cx('tp-delta', `tp-delta--${direction}`, className)}>
      {direction === 'up' ? '▲' : '▼'} {children}
    </span>
  );
}

const provLabel: Record<Provenance, string> = { measured: 'Measured', modelled: 'Modelled', assumed: 'Assumed' };

export interface ProvenanceChipProps extends HTMLAttributes<HTMLSpanElement> {
  kind: Provenance;
}

/**
 * Every figure carries one, or the source line under the block does.
 * A modelled number is never presented as measured.
 */
export function ProvenanceChip({ kind, className, ...rest }: ProvenanceChipProps) {
  return <span {...rest} className={cx('tp-prov', `tp-prov--${kind}`, className)}>{provLabel[kind]}</span>;
}

export interface StatProps extends HTMLAttributes<HTMLDivElement> {
  value: ReactNode;
  label: ReactNode;
  delta?: ReactNode;
  /** Cyan hero figure — on charcoal only, and on one tile per row. */
  accent?: boolean;
}

/** Value 44px Bold tabular above a 13px Medium uppercase label. */
export function Stat({ value, label, delta, accent, className, ...rest }: StatProps) {
  return (
    <div {...rest} className={cx('tp-stat', className)}>
      <span className={cx('tp-stat-value', accent && 'tp-stat-value--accent')}>{value}</span>
      <span className="tp-stat-label">{label}</span>
      {delta}
    </div>
  );
}

export interface KpiRowProps extends HTMLAttributes<HTMLDivElement> {
  /** Four tiles maximum. Five means the row is doing a table's job. */
  children: ReactNode;
}

/** One object: hairline separators, not card borders. */
export function KpiRow({ children, className, style, ...rest }: KpiRowProps) {
  const count = Array.isArray(children) ? children.filter(Boolean).length : 1;
  if (count > 4 && typeof console !== 'undefined') {
    console.warn('[tpcl] KpiRow: four tiles maximum per row — use a table.');
  }
  const s: StyleWithVars = { '--tp-kpi-cols': Math.min(count, 4), ...style };
  return <div {...rest} className={cx('tp-kpi', className)} style={s}>{children}</div>;
}

export interface SparklineProps {
  /** Y values; the line is scaled into the viewBox. Higher value = higher on screen. */
  values: number[];
  width?: number;
  height?: number;
  /** Stroke colour — cyan for the series that matters, ink-muted for context. */
  color?: string;
  strokeWidth?: number;
  /** Terminal dot radius (0 = none). */
  dot?: number;
  /** Baseline hairline. */
  baseline?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Pixel padding inside the viewBox (top, bottom). */
  pad?: [number, number];
}

/** One stroke, terminal dot, no gridlines, no legend. */
export function Sparkline({
  values, width = 200, height = 44, color = 'var(--tp-cyan)', strokeWidth = 2.5,
  dot = 0, baseline = false, className, style, pad = [4, 4],
}: SparklineProps) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const step = values.length > 1 ? width / (values.length - 1) : 0;
  const pts = values.map((v, i) => {
    const y = pad[0] + (1 - (v - min) / span) * (height - pad[0] - pad[1]);
    return [+(i * step).toFixed(2), +y.toFixed(2)] as const;
  });
  const last = pts[pts.length - 1];
  return (
    <svg
      className={cx('tp-spark', className)} style={style}
      viewBox={`0 0 ${width} ${height}`} width="100%" height={height}
      preserveAspectRatio="none" aria-hidden="true"
    >
      {baseline && <line x1="0" y1={height - 2} x2={width} y2={height - 2} stroke="var(--tp-rule)" strokeWidth="2" />}
      <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke={color}
        strokeWidth={strokeWidth} strokeLinejoin="round" strokeLinecap={dot ? 'round' : undefined} />
      {dot > 0 && last && <circle cx={last[0]} cy={last[1]} r={dot} fill={color} />}
    </svg>
  );
}

/** Polyline from explicit points, for figures lifted verbatim from a source chart. */
export function SparkPath({
  points, width, height, color = 'var(--tp-cyan)', strokeWidth = 2.5, dot = 0, baseline = false, className, style,
}: { points: string; width: number; height: number; color?: string; strokeWidth?: number; dot?: number;
     baseline?: boolean; className?: string; style?: CSSProperties }) {
  const coords = points.trim().split(/\s+/).map((p) => p.split(',').map(Number));
  const last = coords[coords.length - 1];
  return (
    <svg className={cx('tp-spark', className)} style={style} viewBox={`0 0 ${width} ${height}`}
      width="100%" height={height} preserveAspectRatio="none" aria-hidden="true">
      {baseline && <line x1="0" y1={height - 2} x2={width} y2={height - 2} stroke="var(--tp-rule)" strokeWidth="2" />}
      <polyline points={points} fill="none" stroke={color} strokeWidth={strokeWidth}
        strokeLinejoin="round" strokeLinecap={dot ? 'round' : undefined} />
      {dot > 0 && last && <circle cx={last[0]} cy={last[1]} r={dot} fill={color} />}
    </svg>
  );
}

/** In-cell trend bars (px heights, max 20). */
export function Bars({ heights }: { heights: number[] }) {
  return (
    <span className="tp-bars" aria-hidden="true">
      {heights.map((h, i) => <i key={i} style={{ height: h }} />)}
    </span>
  );
}

/* ---------------- Table ---------------- */

export interface Column<Row> {
  key: string;
  header: ReactNode;
  /** Numbers right-aligned and tabular; text left-aligned; never centred. Per-row when a column mixes both. */
  numeric?: boolean | ((row: Row) => boolean);
  render?: (row: Row) => ReactNode;
}

export interface TableProps<Row extends Record<string, unknown>> extends Omit<TableHTMLAttributes<HTMLTableElement>, 'children'> {
  columns: Column<Row>[];
  rows: Row[];
  /** Totals row — bold, unfilled, and it must reconcile to source. */
  total?: Partial<Record<string, ReactNode>>;
  /** Right-align numeric headers too (the prototypes leave headers left). */
  alignNumericHeaders?: boolean;
}

/**
 * No vertical rules, no zebra stripes, no fills. One 2px charcoal rule under
 * the header, 1px hairlines between rows. A source line sits under every table.
 */
export function Table<Row extends Record<string, unknown>>({
  columns, rows, total, alignNumericHeaders, className, ...rest
}: TableProps<Row>) {
  return (
    <table {...rest} className={cx('tp-table', className)}>
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key} className={alignNumericHeaders && c.numeric === true ? 'tp-n' : undefined}>{c.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {columns.map((c) => (
              <td key={c.key} className={isNumeric(c, row) ? 'tp-n' : undefined}>
                {c.render ? c.render(row) : (row[c.key] as ReactNode)}
              </td>
            ))}
          </tr>
        ))}
        {total && (
          <tr className="tp-total">
            {columns.map((c) => (
              <td key={c.key} className={c.numeric === true ? 'tp-n' : undefined}>
                {total[c.key] != null ? <strong>{total[c.key]}</strong> : null}
              </td>
            ))}
          </tr>
        )}
      </tbody>
    </table>
  );
}

function isNumeric<Row>(c: Column<Row>, row: Row): boolean {
  return typeof c.numeric === 'function' ? c.numeric(row) : !!c.numeric;
}

/* ---------------- Quote & Tag ---------------- */

export interface QuoteProps extends HTMLAttributes<HTMLQuoteElement> {
  children: ReactNode;
  name?: ReactNode;
  /** Job title shown after the name. */
  position?: ReactNode;
}

/** 3px cyan left rule, no quotation marks. Attribution below, name in Medium. */
export function Quote({ children, name, position, className, ...rest }: QuoteProps) {
  return (
    <blockquote {...rest} className={cx('tp-quote', className)}>
      {children}
      {(name || position) && (
        <footer>
          {name && <strong>{name}</strong>}
          {name && position && ' · '}
          {position}
        </footer>
      )}
    </blockquote>
  );
}

export type TagTone = 'neutral' | 'cyan' | 'amber' | 'panel';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: TagTone;
  children: ReactNode;
}

/** Square tag. Coloured tags carry charcoal labels. */
export function Tag({ tone = 'neutral', className, children, ...rest }: TagProps) {
  return (
    <span {...rest} className={cx('tp-tag', tone !== 'neutral' && `tp-tag--${tone}`, className)}>{children}</span>
  );
}

/** 1px hairline rule; charcoal-soft on dark. */
export function Rule({ className, ...rest }: HTMLAttributes<HTMLHRElement>) {
  return <hr {...rest} className={cx('tp-rule', className)} />;
}
