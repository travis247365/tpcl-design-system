import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import {
  AccentBlock, Button, Delta, IndexChip, KpiRow, LogoMark, ProvenanceChip, Split, Stat, Table, Tag, tokens,
} from './index';
import { renderEmail, type EmailerProps } from './email';

const tokensCss = readFileSync(resolve(import.meta.dirname, 'styles/tokens.css'), 'utf8');
const handoffTokens = readFileSync(resolve(import.meta.dirname, '../project/tokens.css'), 'utf8');

describe('tokens', () => {
  it('tokens.css is the handoff source of truth, verbatim', () => {
    expect(tokensCss).toBe(handoffTokens);
  });

  it('tokens.ts mirrors every colour in tokens.css', () => {
    for (const [key, name] of Object.entries(tokens.cssVar)) {
      const m = tokensCss.match(new RegExp(`${name}:\\s*(#[0-9A-Fa-f]{6})`));
      expect(m, name).not.toBeNull();
      expect(tokens.color[key as keyof typeof tokens.color].toUpperCase()).toBe(m![1].toUpperCase());
    }
  });

  it('spacing scale matches --tp-1 … --tp-10', () => {
    tokens.space.forEach((v, i) => {
      expect(tokensCss).toMatch(new RegExp(`--tp-${i + 1}:\\s*${v}px`));
    });
  });
});

describe('motifs', () => {
  it('accent block turns cyan with dark, sizes by modifier', () => {
    const html = renderToStaticMarkup(<AccentBlock dark size="lg" />);
    expect(html).toContain('tp-accent tp-accent--lg tp-accent--dark');
    expect(html).toContain('aria-hidden="true"');
  });

  it('index chip bleeds to the edge and inverts on a panel', () => {
    expect(renderToStaticMarkup(<IndexChip edge inverse>07</IndexChip>)).toContain('tp-chip tp-chip--edge tp-chip--inverse');
  });

  it('logo is an accessible image with the locked ratio class', () => {
    const html = renderToStaticMarkup(<LogoMark cut="white" height={34} />);
    expect(html).toContain('role="img"');
    expect(html).toContain('aria-label="Travis Paul Consulting"');
    expect(html).toContain('tp-mark tp-mark--white');
    expect(html).toContain('height:34px;width:auto');
  });

  it('split has no divider element between dark and panel', () => {
    const html = renderToStaticMarkup(<Split dark="a" panel="b" />);
    expect(html).toBe('<div class="tp-split"><div class="tp-split-dark tp-dark">a</div><div class="tp-split-panel">b</div></div>');
  });
});

describe('components', () => {
  it('button renders <a> with href, <button type="button"> without', () => {
    expect(renderToStaticMarkup(<Button href="/x">Book a diagnostic</Button>))
      .toBe('<a href="/x" class="tp-btn tp-btn--primary">Book a diagnostic</a>');
    expect(renderToStaticMarkup(<Button variant="ghost" size="sm">Dismiss</Button>))
      .toBe('<button type="button" class="tp-btn tp-btn--ghost tp-btn--sm">Dismiss</button>');
  });

  it('delta names direction with an arrow glyph', () => {
    expect(renderToStaticMarkup(<Delta direction="down">1.8 pts</Delta>)).toContain('tp-delta tp-delta--down');
  });

  it('provenance chip labels the three kinds', () => {
    expect(renderToStaticMarkup(<ProvenanceChip kind="modelled" />)).toContain('>Modelled<');
  });

  it('table right-aligns numeric cells and bolds the total', () => {
    const html = renderToStaticMarkup(
      <Table
        columns={[{ key: 'seg', header: 'Segment' }, { key: 'n', header: 'Accounts', numeric: true }]}
        rows={[{ seg: 'Champions', n: '5,231' }]}
        total={{ seg: 'Total', n: '5,231' }}
      />,
    );
    expect(html).toContain('<td class="tp-n">5,231</td>');
    expect(html).toContain('<tr class="tp-total"><td><strong>Total</strong></td><td class="tp-n"><strong>5,231</strong></td></tr>');
    expect(html).not.toMatch(/<th class="tp-n"/);
  });

  it('KPI row warns past four tiles', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    renderToStaticMarkup(<KpiRow>{[1, 2, 3, 4, 5].map((i) => <Stat key={i} value={i} label="x" />)}</KpiRow>);
    expect(warn).toHaveBeenCalledOnce();
    warn.mockRestore();
  });

  it('coloured tags use modifier classes', () => {
    expect(renderToStaticMarkup(<Tag tone="cyan">Measured</Tag>)).toBe('<span class="tp-tag tp-tag--cyan">Measured</span>');
  });
});

describe('renderEmail', () => {
  const base: EmailerProps = {
    logoUrl: 'https://cdn.example.com/tpc_white.png',
    preheader: 'Preheader',
    eyebrow: 'Field note',
    title: 'Title',
    paragraphs: ['One', 'Two'],
    kpis: [{ value: '+5.4', label: 'A' }, { value: '−15%', label: 'B' }, { value: '41,007', label: 'C' }],
    source: 'Measured · test.',
    quote: 'Quote',
    cta: { label: 'Read the full field note', href: 'https://example.com' },
    signoff: 'Travis',
    signature: 'Travis Mulenga',
    footerAddress: 'Lusaka',
    footerReason: 'Because.',
    unsubscribeUrl: '{{UNSUBSCRIBE_URL}}',
    preferencesUrl: '{{PREFERENCES_URL}}',
  };

  it('rejects data: logo URLs', () => {
    expect(() => renderEmail({ ...base, logoUrl: 'data:image/png;base64,AAA' })).toThrow(/data: URI/);
  });

  it('is table-based, inline-styled, 600px, with a charcoal label on the cyan CTA', () => {
    const html = renderEmail(base);
    expect(html.startsWith('<!doctype html>')).toBe(true);
    expect(html).toContain('role="presentation"');
    expect(html).toContain('width="600"');
    expect(html).not.toMatch(/<style|class=|display:\s*flex|display:\s*grid|background-image|@font-face|var\(--/);
    expect(html).toMatch(/<td style="background:#00BCD4"><a href="https:\/\/example.com" style="[^"]*color:#3A3A3A/);
    expect(html).toContain('{{UNSUBSCRIBE_URL}}');
  });

  it('can return the bare table', () => {
    expect(renderEmail(base, { document: false }).startsWith('<table')).toBe(true);
  });
});
