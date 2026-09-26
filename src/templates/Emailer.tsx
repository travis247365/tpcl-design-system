import type { CSSProperties, ReactNode } from 'react';
import { color, emailFont } from '../tokens';

/*
 * Email is the one place the design system bends.
 * Load-bearing rules: tables with role="presentation", every style inline,
 * 600px fixed, one column, no background images, no webfonts (Gmail strips
 * @font-face), 44px+ tap targets, cyan CTA with a CHARCOAL label.
 * Colours come from tokens.ts because email clients cannot read var().
 */

export interface EmailKpi { value: ReactNode; label: ReactNode }

export interface EmailerProps {
  /** Hosted https URL for the white logo cut. Data URIs do not render in Gmail or Outlook. */
  logoUrl: string;
  /** Inbox-preview second line. */
  preheader: string;
  eyebrow: ReactNode;
  /** Sentence case; wrap the argument in <b>. */
  title: ReactNode;
  greeting?: ReactNode;
  paragraphs: ReactNode[];
  /** Three figures on a blue-gray strip. */
  kpis?: [EmailKpi, EmailKpi, EmailKpi];
  /** Required with kpis — states Measured / Modelled. */
  source?: ReactNode;
  quote?: ReactNode;
  cta: { label: ReactNode; href: string };
  signoff: ReactNode;
  signature: ReactNode;
  footerAddress: ReactNode;
  footerReason: ReactNode;
  unsubscribeUrl: string;
  preferencesUrl: string;
}

const table = { borderCollapse: 'collapse' } as const;
const tableAttrs = { role: 'presentation', cellPadding: 0, cellSpacing: 0, border: 0 } as const;

const kpiValue: CSSProperties = { fontSize: 30, fontWeight: 700, lineHeight: 1, color: color.charcoal };
const kpiLabel: CSSProperties = {
  fontSize: 10, fontWeight: 500, letterSpacing: '.09em', textTransform: 'uppercase',
  color: color.charcoal, paddingTop: 8,
};
const kpiDivider = '1px solid rgba(58,58,58,.25)';

export function Emailer(p: EmailerProps) {
  return (
    <table
      {...tableAttrs}
      width="600"
      style={{ width: 600, ...table, background: color.white, fontFamily: emailFont, color: color.charcoal }}
    >
      <tbody>
        {/* Preheader: shows in the inbox list, hidden in the body */}
        <tr><td style={{ display: 'none', fontSize: 1, lineHeight: '1px', maxHeight: 0, maxWidth: 0, opacity: 0, overflow: 'hidden' }}>
          {p.preheader}
        </td></tr>

        {/* Masthead: charcoal band, white logo, cyan accent block */}
        <tr><td style={{ background: color.charcoal, padding: 32 }}>
          <table {...tableAttrs} width="100%" style={table}>
            <tbody><tr>
              <td style={{ verticalAlign: 'middle' }}>
                <img src={p.logoUrl} width="150" alt="Travis Paul Consulting"
                  style={{ display: 'block', width: 150, height: 'auto', border: 0 }} />
              </td>
              <td align="right" style={{ verticalAlign: 'middle' }}>
                <div style={{ width: 44, height: 16, background: color.cyan, fontSize: 0, lineHeight: 0 }}>{' '}</div>
              </td>
            </tr></tbody>
          </table>
        </td></tr>

        {/* Eyebrow + headline */}
        <tr><td style={{ padding: '40px 32px 0' }}>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 500, letterSpacing: '.16em', textTransform: 'uppercase', color: color.inkMuted }}>
            {p.eyebrow}</p>
          <h1 style={{ margin: '14px 0 0', fontSize: 32, lineHeight: 1.15, fontWeight: 400, letterSpacing: '-.01em', color: color.charcoal }}>
            {p.title}</h1>
        </td></tr>

        {/* Body */}
        <tr><td style={{ padding: '24px 32px 0', fontSize: 16, lineHeight: 1.65, color: color.charcoal }}>
          {p.greeting && <p style={{ margin: '0 0 16px' }}>{p.greeting}</p>}
          {p.paragraphs.map((para, i) => (
            <p key={i} style={{ margin: i === p.paragraphs.length - 1 ? 0 : '0 0 16px' }}>{para}</p>
          ))}
        </td></tr>

        {/* KPI strip: blue-gray panel, three columns as table cells */}
        {p.kpis && (
          <tr><td style={{ padding: '28px 32px 0' }}>
            <table {...tableAttrs} width="100%" style={{ ...table, background: color.bluegray }}>
              <tbody><tr>
                {p.kpis.map((k, i) => (
                  <td key={i} width="33.33%" style={{ padding: '24px 16px', textAlign: 'center', borderLeft: i ? kpiDivider : undefined }}>
                    <div style={kpiValue}>{k.value}</div>
                    <div style={kpiLabel}>{k.label}</div>
                  </td>
                ))}
              </tr></tbody>
            </table>
            {p.source && <p style={{ margin: '10px 0 0', fontSize: 12, color: color.inkMuted }}>{p.source}</p>}
          </td></tr>
        )}

        {/* Pull-quote: 3px cyan left rule */}
        {p.quote && (
          <tr><td style={{ padding: '28px 32px 0' }}>
            <table {...tableAttrs} width="100%" style={table}>
              <tbody><tr><td style={{ borderLeft: `3px solid ${color.cyan}`, padding: '4px 0 4px 20px', fontSize: 18, lineHeight: 1.5, color: color.charcoal }}>
                {p.quote}
              </td></tr></tbody>
            </table>
          </td></tr>
        )}

        {/* CTA: padded <a> inside a coloured <td>. Cyan fill, CHARCOAL label (white fails at 2.30:1). */}
        <tr><td style={{ padding: '32px 32px 0' }}>
          <table {...tableAttrs} style={table}>
            <tbody><tr><td style={{ background: color.cyan }}>
              <a href={p.cta.href}
                style={{ display: 'block', padding: '15px 30px', fontSize: 15, fontWeight: 500, letterSpacing: '.02em',
                  color: color.charcoal, textDecoration: 'none', lineHeight: 1.1 }}>{p.cta.label} &rarr;</a>
            </td></tr></tbody>
          </table>
        </td></tr>

        {/* Sign-off */}
        <tr><td style={{ padding: '32px 32px 0', fontSize: 16, lineHeight: 1.65, color: color.charcoal }}>
          <p style={{ margin: 0 }}>{p.signoff}</p>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: color.inkMuted }}>{p.signature}</p>
        </td></tr>

        {/* Footer */}
        <tr><td style={{ padding: '36px 32px 32px' }}>
          <div style={{ height: 1, background: color.rule, fontSize: 0, lineHeight: 0 }}>{' '}</div>
          <p style={{ margin: '20px 0 0', fontSize: 12, lineHeight: 1.6, color: color.inkMuted }}>
            {p.footerAddress}<br />
            {p.footerReason}{' '}
            <a href={p.unsubscribeUrl} style={{ color: color.inkMuted, textDecoration: 'underline' }}>Unsubscribe</a>
            {' · '}
            <a href={p.preferencesUrl} style={{ color: color.inkMuted, textDecoration: 'underline' }}>Update preferences</a>
          </p>
        </td></tr>
      </tbody>
    </table>
  );
}
