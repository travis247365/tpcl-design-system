import type { CSSProperties, ReactNode } from 'react';
import {
  AccentBlock, IndexChip, LogoMark, OutlineRect, Step, Table, Text, Timeline, type Column,
} from '../../src';
import { DocPage, Rules, Sec } from '../kit';

const code = (s: string) => <span className="tp-code">{s}</span>;

/* ================================================================
   Colour
   ================================================================ */

const core = [
  { nm: 'Charcoal', hex: '#3A3A3A', v: '--tp-charcoal', role: <>Dark-mode background · light-mode body text. The primary.</> },
  { nm: 'White', hex: '#FFFFFF', v: '--tp-white', role: <>Light-mode background · dark-mode text. Pure white — never off-white.</>, edge: true },
  { nm: 'Blue-gray', hex: '#B8C5D6', v: '--tp-bluegray', role: <>Split-slide right panel, index chips, accent cards. A surface, not a text colour.</> },
  { nm: 'Cyan', hex: '#00BCD4', v: '--tp-cyan', role: <><strong>Dark-mode accent.</strong> Accent block, timeline, outline cards, primary button.</> },
  { nm: 'Amber', hex: '#FFC107', v: '--tp-amber', role: <><strong>Light-mode accent.</strong> Top-left accent block on white. Used sparingly.</> },
  { nm: 'Ink muted', hex: '#6E6E6E', v: '--tp-ink-muted', role: <>Secondary text, captions, table headers on white. 5.10:1 — passes AA.</> },
];
const support = [
  { nm: 'Charcoal deep', hex: '#2B2B2B', v: '--tp-charcoal-deep' },
  { nm: 'Charcoal soft', hex: '#4A4A4A', v: '--tp-charcoal-soft' },
  { nm: 'Surface', hex: '#F5F6F8', v: '--tp-surface', edge: true },
  { nm: 'Rule', hex: '#E4E6EA', v: '--tp-rule' },
];
type Pair = [label: string, bg: string, fg: string, ratio: string, verdict: 'AAA' | 'AA' | 'FAIL', edge?: boolean];
const pairs: Pair[] = [
  ['White on charcoal', '--tp-charcoal', '--tp-white', '11.37:1', 'AAA'],
  ['Charcoal on white', '--tp-white', '--tp-charcoal', '11.37:1', 'AAA', true],
  ['Amber on charcoal', '--tp-charcoal', '--tp-amber', '6.98:1', 'AA'],
  ['Blue-gray on charcoal', '--tp-charcoal', '--tp-bluegray', '6.50:1', 'AA'],
  ['Cyan on charcoal', '--tp-charcoal', '--tp-cyan', '4.95:1', 'AA'],
  ['Ink-muted on white', '--tp-white', '--tp-ink-muted', '5.10:1', 'AA', true],
  ['Charcoal on cyan', '--tp-cyan', '--tp-charcoal', '4.95:1', 'AA'],
  ['Charcoal on amber', '--tp-amber', '--tp-charcoal', '6.98:1', 'AA'],
  ['Charcoal on blue-gray', '--tp-bluegray', '--tp-charcoal', '6.50:1', 'AA'],
  ['White on cyan', '--tp-cyan', '--tp-white', '2.30:1', 'FAIL'],
  ['Cyan on white', '--tp-white', '--tp-cyan', '2.30:1', 'FAIL', true],
  ['Amber on white', '--tp-white', '--tp-amber', '1.63:1', 'FAIL', true],
];
const v = (name: string) => `var(${name})`;
const edgeBorder: CSSProperties = { border: '1px solid var(--tp-rule)' };

export function ColourPage() {
  return (
    <DocPage className="pg-colour" title="Colour" lede={<>Six tokens, two modes. Charcoal and white do all the work; cyan, amber and blue-gray
      are accents with strict jobs. Nothing outside this list is a TPCL colour.</>}>
      <Sec title="Core tokens">
        <div className="tp-grid" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(210px,1fr))' }}>
          {core.map((c) => (
            <div className="sw" key={c.hex}>
              <div className="chip" style={{ background: v(c.v), borderBottom: c.edge ? '1px solid var(--tp-rule)' : undefined }} />
              <div className="meta"><div className="nm">{c.nm}</div><div className="hex">{c.hex}</div>
                <div className="role">{c.role}</div></div>
            </div>
          ))}
        </div>
      </Sec>

      <Sec title="Support neutrals">
        <div className="tp-grid" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))' }}>
          {support.map((c) => (
            <div className="sw" key={c.hex}>
              <div className="chip" style={{ background: v(c.v), height: 64, borderBottom: c.edge ? '1px solid var(--tp-rule)' : undefined }} />
              <div className="meta"><div className="nm">{c.nm}</div><div className="hex">{c.hex}</div></div>
            </div>
          ))}
        </div>
      </Sec>

      <Sec title="Contrast — measured, not assumed">
        <div className="pairs">
          {pairs.map(([label, bg, fg, ratio, verdict, edge]) => (
            <div className="pair" key={label} style={{ background: v(bg), color: v(fg), ...(edge ? edgeBorder : null) }}>
              {label}
              <div className="r">{ratio} <span className={`verdict ${verdict === 'FAIL' ? 'no' : 'ok'}`}>{verdict}</span></div>
            </div>
          ))}
        </div>
      </Sec>

      <Sec title="Rules that follow from those numbers">
        <Rules ordered spaced>
          <li><strong>Cyan buttons carry charcoal text, never white.</strong> White on cyan is 2.30:1 and fails.</li>
          <li><strong>On white, cyan and amber are graphic-only</strong> — accent blocks, rules, dots, borders, fills behind dark text. Never body copy, never a link colour on white.</li>
          <li><strong>On charcoal, cyan and amber are safe as text</strong> (4.95:1 and 6.98:1). This is why the cyan timeline and cyan numerals live on dark slides.</li>
          <li><strong>Blue-gray is a surface.</strong> It is 1.75:1 on white — it can never be read as text on white.</li>
          <li><strong>One accent per surface.</strong> Cyan and amber do not appear on the same slide or post except where amber is the accent block and cyan is a data mark.</li>
        </Rules>
      </Sec>

      <Sec title="Client-overlay slot">
        <p className="tp-note" style={{ maxWidth: '70ch' }}>Engagement work tints exactly one variable —{' '}
          {code('--tp-client')} — and swaps the co-brand logo. The charcoal/white
          frame, Poppins and the motifs stay TPCL. Precedent: Client A green{' '}
          {code('#28B04C')}, Client B blue {code('#3865B0')}.{' '}
          <strong>Check the client colour against charcoal and white before using it as text.</strong></p>
        <div style={{ display: 'flex', gap: 12, marginTop: 14, flexWrap: 'wrap' }}>
          <ClientSwatch name="Client A green" hex="#28B04C" ink="--tp-white" />
          <ClientSwatch name="Client B blue" hex="#3865B0" ink="--tp-white" />
          <ClientSwatch name="Client B orange" hex="#F47321" ink="--tp-charcoal" />
        </div>
      </Sec>
    </DocPage>
  );
}

/** Client colours live in --tp-client; the swatch sets it locally, as an engagement would. */
function ClientSwatch({ name, hex, ink }: { name: string; hex: string; ink: string }) {
  const style = { ['--tp-client' as string]: hex, background: 'var(--tp-client)', color: v(ink), minWidth: 180 };
  return <div className="pair" style={style}>{name}<div className="r">{hex}</div></div>;
}

/* ================================================================
   Layout & spacing
   ================================================================ */

const scale = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128];
const canvases: Array<Record<string, string>> = [
  { s: 'Deck slide', px: '1920 × 1080', r: '16:9', m: '96' },
  { s: 'Instagram / Facebook square', px: '1080 × 1080', r: '1:1', m: '80' },
  { s: 'Instagram / LinkedIn portrait', px: '1080 × 1350', r: '4:5', m: '80' },
  { s: 'Story / Reel / WhatsApp Status', px: '1080 × 1920', r: '9:16', m: '80' },
  { s: 'LinkedIn single image', px: '1200 × 627', r: '1.91:1', m: '64' },
  { s: 'LinkedIn personal banner', px: '1584 × 396', r: '4:1', m: '64' },
  { s: 'LinkedIn page cover', px: '1128 × 191', r: '5.9:1', m: '40' },
  { s: 'Email body', px: '600 wide', r: '—', m: '32' },
  { s: 'Website frame', px: '1440 / 1200 content', r: '—', m: '48' },
];
const canvasCols: Column<Record<string, string>>[] = [
  { key: 's', header: 'Surface' },
  { key: 'px', header: 'Pixels', numeric: true },
  { key: 'r', header: 'Ratio', numeric: (r) => r.r !== '—' },
  { key: 'm', header: 'Margin', numeric: true },
];

function Ab({ style }: { style: CSSProperties }) {
  return <span className="ab" style={style} />;
}

export function LayoutPage() {
  return (
    <DocPage className="pg-layout" title="Layout & spacing" lede={<>An 8px scale, a 12-column grid, and six page archetypes. TPCL layouts are
      square-cornered, generously margined and asymmetric — content sits off-centre far more often
      than it is centred.</>}>
      <Sec title="Spacing scale — multiples of 8">
        {scale.map((n, i) => (
          <div className="sp" key={n}><span className="lbl">--tp-{i + 1} · {n}</span><span className="bar" style={{ width: `var(--tp-${i + 1})` }} /></div>
        ))}
        <p className="tp-note" style={{ marginTop: 12 }}><strong>Between a heading and its body: 16.
          Between blocks: 32. Between sections: 64.</strong> Margins are 48 on web, 64 on a 16:9 slide,
          80 on a 1080px social canvas.</p>
      </Sec>

      <Sec title="Grid">
        <div className="cols">{Array.from({ length: 12 }, (_, i) => <div key={i} />)}</div>
        <p className="tp-note" style={{ marginTop: 12 }}><strong>12 columns, 24px gutter, 1200px max content
          inside a 1440px frame.</strong> Preferred splits are <strong>7/5</strong> and <strong>5/7</strong>
          {' '}— not 6/6. The half-and-half split is reserved for the dark/light mode split, where the asymmetry
          comes from the colour instead.</p>
      </Sec>

      <Sec title="Corners & strokes">
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ width: 80, height: 52, background: 'var(--tp-bluegray)' }} />
          <span style={{ width: 80, height: 52, border: '2px solid var(--tp-charcoal)' }} />
          <span style={{ width: 80, height: 52, borderLeft: '3px solid var(--tp-cyan)', background: 'var(--tp-surface)' }} />
          <p className="tp-note" style={{ maxWidth: '52ch', margin: 0 }}>
            <strong>Radius is 0.</strong> Every card, chip, button, image crop and accent block is square.
            The only round things in the system are the timeline dot and, where a UI genuinely needs one,
            a pill-shaped filter. Stroke weights: <strong>1px hairline rule, 2px outline, 3px accent rule</strong>.
            No shadows, no gradients, no glassmorphism.</p>
        </div>
      </Sec>

      <Sec title="The six page archetypes">
        <div className="tp-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
          <div className="mini tp-dark">
            <AccentBlock dark style={{ position: 'absolute', top: 14, left: 14, width: 34, height: 12 }} />
            <Ab style={{ left: 14, top: 52, width: '58%', height: 9, background: 'var(--tp-white)' }} />
            <Ab style={{ left: 14, top: 68, width: '40%', height: 9, background: 'var(--tp-white)' }} />
            <span className="cap">01 · Full dark opener</span></div>
          <div className="mini" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <span style={{ background: 'var(--tp-charcoal)' }} /><span className="bl" />
            <span className="cap">02 · Split dark / blue-gray</span></div>
          <div className="mini">
            <AccentBlock style={{ position: 'absolute', top: 14, left: 14, width: 34, height: 12 }} />
            <Ab style={{ left: 14, top: 48, width: '64%', height: 7, background: 'var(--tp-charcoal)' }} />
            <Ab style={{ left: 14, top: 64, width: '80%', height: 4, background: 'var(--tp-rule)' }} />
            <Ab style={{ left: 14, top: 74, width: '72%', height: 4, background: 'var(--tp-rule)' }} />
            <span className="cap">03 · White content</span></div>
          <div className="mini tp-dark">
            <Ab style={{ left: 20, top: 20, bottom: 20, width: 2, background: 'var(--tp-cyan)' }} />
            {[28, 56, 84].map((t) => <Ab key={t} style={{ left: 15, top: t, width: 12, height: 12, borderRadius: '50%', background: 'var(--tp-cyan)' }} />)}
            <span className="cap">04 · Dark timeline</span></div>
          <div className="mini tp-dark" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="tp-outline" style={{ width: '68%', height: '52%' }} />
            <span className="cap">05 · Dark statement / ask</span></div>
          <div className="mini" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            {/* Photo placeholder — the only gradient on the page, standing in for an image. */}
            <span style={{ background: 'linear-gradient(135deg,#DDE3EA,var(--tp-bluegray))' }} />
            <span style={{ padding: 14 }}>
              <span style={{ display: 'block', width: '70%', height: 6, background: 'var(--tp-charcoal)' }} />
              <span style={{ display: 'block', width: '88%', height: 4, background: 'var(--tp-rule)', marginTop: 8 }} />
              <span style={{ display: 'block', width: '80%', height: 4, background: 'var(--tp-rule)', marginTop: 6 }} /></span>
            <span className="cap">06 · Half-bleed photo + bio</span></div>
        </div>
      </Sec>

      <Sec title="Canvas sizes TPCL builds to">
        <Table columns={canvasCols} rows={canvases} />
      </Sec>
    </DocPage>
  );
}

/* ================================================================
   Logo & lockups
   ================================================================ */

export function LogoPage() {
  return (
    <DocPage className="pg-logo" title="Logo & lockups" lede={<>The mark is the handwritten <em>Travis Paul</em> script with{' '}
      <strong>CONSULTING</strong> in tracked caps beneath it. Aspect ratio 1.93:1. Three cuts —
      white, black, full colour. Consulting is the default on every client-facing artefact;
      Holdings only appears on parent-entity material.</>}>
      <Sec title="The three cuts">
        <div className="tp-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
          <div className="frame tp-dark center">
            <span className="cap">White — on charcoal</span>
            <LogoMark cut="white" width="64%" />
          </div>
          <div className="frame center">
            <span className="cap">Black — on white</span>
            <LogoMark cut="black" width="64%" />
          </div>
          <div className="frame center" style={{ background: 'var(--tp-surface)' }}>
            <span className="cap">Full colour</span>
            <LogoMark cut="colour" width="64%" />
          </div>
        </div>
        <p className="tp-note" style={{ marginTop: 12 }}>Full colour is for light backgrounds with no competing
          colour — covers, letterheads, the website footer. On any slide that already carries cyan or amber,
          use black or white so the accent stays the only colour event.</p>
      </Sec>

      <Sec title="A fourth approved treatment — tint">
        <div style={{ display: 'flex', gap: 36, alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="frame center" style={{ height: 150, width: 340, flex: '0 0 auto' }}>
            <LogoMark cut="tint" width="62%" />
          </div>
          <div style={{ maxWidth: '48ch' }}>
            <p className="tp-note">The 2021 brand master approves <strong>four</strong> treatments, not three:
              full colour, black, <strong>tint</strong>, and reversed white. The tint sets the script at{' '}
              {code('#57585A')} with the tracked caps at a lighter step —
              for watermarks, document backgrounds, and partner walls where the mark must be present but
              must not compete. <strong>Never use tint below 40% or the caps disappear.</strong></p>
          </div>
        </div>
      </Sec>

      <Sec title="The logo's own colours vs the layout palette">
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
          <div className="swatch" style={{ background: '#085F89', color: 'var(--tp-white)' }}>Logo deep blue<div>#085F89</div></div>
          <div className="swatch" style={{ background: '#59D1E2', color: 'var(--tp-charcoal)' }}>Logo caps cyan<div>#59D1E2</div></div>
          <div className="swatch" style={{ background: 'var(--tp-logo-tint)', color: 'var(--tp-white)' }}>Logo tint grey<div>#57585A</div></div>
          <div className="swatch" style={{ background: 'var(--tp-cyan)', color: 'var(--tp-charcoal)' }}>System cyan<div>#00BCD4</div></div>
        </div>
        <p className="tp-note" style={{ maxWidth: '72ch' }}><strong>These are two different eras and they do not
          match.</strong> The 2021 logo master is built on deep blue {code('#085F89')},
          light cyan {code('#59D1E2')} and pure black{' '}
          {code('#000000')}. The layout system derived from the business-profile deck
          uses charcoal {code('#3A3A3A')} and cyan{' '}
          {code('#00BCD4')}.
          <br /><br />
          <strong>The ruling:</strong> the logo is a fixed asset and keeps its own colours — do not recolour
          it to match the palette. The layout keeps charcoal and system cyan. But because{' '}
          {code('#59D1E2')} and {code('#00BCD4')} are close without
          being equal, <strong>never place the full-colour logo on the same surface as a cyan accent
          block</strong> — the near-miss reads as a mistake. Use the black or white cut there instead.
          That is why the deck templates use black-on-white and white-on-charcoal everywhere.</p>
      </Sec>

      <Sec title="Placement">
        <div className="tp-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="frame tp-dark">
            <span className="cap">Dark surface → bottom LEFT</span>
            <AccentBlock dark style={{ position: 'absolute', top: 34, left: 34 }} />
            <LogoMark cut="white" height={32} style={{ position: 'absolute', left: 34, bottom: 28 }} />
            <IndexChip edge>04</IndexChip>
          </div>
          <div className="frame">
            <span className="cap">Light surface → bottom RIGHT</span>
            <AccentBlock style={{ position: 'absolute', top: 34, left: 34 }} />
            <LogoMark cut="black" height={32} style={{ position: 'absolute', right: 34, bottom: 28 }} />
            <IndexChip edge>05</IndexChip>
          </div>
        </div>
        <p className="tp-note" style={{ marginTop: 12 }}>The logo sits diagonally opposite the top-left accent
          block. That diagonal — accent up-left, signature down-opposite, index chip on the right edge —
          is the TPCL page frame.</p>
      </Sec>

      <Sec title="Clear space & minimum size">
        <div style={{ display: 'flex', gap: 36, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div className="clear">
            <LogoMark cut="black" height={60} />
            <span className="guide" />
          </div>
          <div style={{ maxWidth: '44ch' }}>
            <p className="tp-note"><strong>Clear space = 45% of the logo height on all four sides</strong>
              {' '}(equivalently 23.5% of its width — the padding is uniform, not proportional to the side).
              Measured off the 2021 brand master {code('travis paul_logo_Clear Space.ai')}:
              logo bbox 232 × 121, padding 54–55px on every side. Nothing enters it — no text, no rule,
              no accent block, no photo edge.</p>
            <p className="tp-note" style={{ marginTop: 12 }}>This is roughly <strong>double</strong> the clear
              space most people leave by eye. At a 34px slide-footer logo that is 15px of protected space
              all round; at 120px wide (62px tall) it is 28px.</p>
            <p className="tp-note" style={{ marginTop: 12 }}><strong>Minimum sizes.</strong>{' '}
              Screen / social: <strong>120px wide</strong>. Slide footer: <strong>34px tall</strong>.
              Print: <strong>28mm wide</strong>. Below that the script closes up and the caps disappear —
              use the initials-free charcoal wordmark instead, or drop the logo entirely.</p>
          </div>
        </div>
      </Sec>

      <Sec title="Don't">
        <div className="tp-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          <Dont box={{ background: 'var(--tp-cyan)' }} logo={<LogoMark cut="white" width="70%" />}>
            Place on cyan or amber. The accent is not a background.</Dont>
          <Dont logo={<LogoMark cut="black" width="70%" style={{ transform: 'scaleX(1.35)' }} />}>
            Stretch or condense. Ratio is locked at 1.93:1.</Dont>
          <Dont box={{ background: '#8A8A8A' }} logo={<LogoMark cut="black" width="70%" />}>
            Use black on a mid-tone. Below ~4.5:1, switch to white.</Dont>
          <Dont box={{ background: 'linear-gradient(90deg,var(--tp-charcoal),var(--tp-bluegray))' }} logo={<LogoMark cut="white" width="70%" />}>
            Straddle two tones or sit on a busy photo. Add a solid pad.</Dont>
        </div>
      </Sec>

      <Sec title="Co-branding with a client">
        <div className="frame center" style={{ height: 150, gap: 34 }}>
          <LogoMark cut="black" height={38} />
          <span style={{ width: 1, height: 44, background: 'var(--tp-rule)' }} />
          <span style={{ fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--tp-ink-muted)' }}>Client mark</span>
        </div>
        <p className="tp-note" style={{ marginTop: 12 }}>Horizontal lockup, <strong>TPCL left, client right</strong>,
          separated by a 1px rule at 44px tall. Optically match heights — do not match bounding boxes.
          On proposals the client mark leads instead; TPCL never sits larger than the client's on the client's own document.</p>
      </Sec>

      <Sec title="Where the files live">
        <p className="tp-note">In this package: {code('src/assets/logo/tpc_{white,black,colour}.png')} (760 × 395,
          extracted from the design handoff) — import them, or use {code('<LogoMark cut="…" />')}.
          Durable masters: {code('memory/assets/tpcl_logos/')} —{' '}
          {code('tpc_{white,black,colour}.png')} for Consulting,{' '}
          {code('pthl_*')} for Holdings.
          Full library incl. .ai / .eps / .svg masters:{' '}
          {code('the brand master archive (TPCL PTHL LOGOS.zip)')}.
          python-pptx embeds PNG/JPG only — rasterise vector masters before a deck build.</p>
      </Sec>
    </DocPage>
  );
}

function Dont({ box, logo, children }: { box?: CSSProperties; logo: ReactNode; children: ReactNode }) {
  return (
    <div className="dont">
      <div className="box" style={box}>{logo}</div>
      <div className="lbl"><span className="x">✕</span> {children}</div>
    </div>
  );
}

/* ================================================================
   Motifs
   ================================================================ */

function Motif({ n, title, demo, demoClass, demoStyle, children, last }: {
  n: string; title: string; demo: ReactNode; demoClass?: string; demoStyle?: CSSProperties; children: ReactNode; last?: boolean;
}) {
  return (
    <div className="m" style={last ? { borderBottom: 0 } : undefined}>
      <div className={`demo ${demoClass ?? ''}`} style={demoStyle}>{demo}</div>
      <div><p className="n">Motif {n}</p><Text variant="h2" as="h3">{title}</Text>{children}</div>
    </div>
  );
}

export function MotifsPage() {
  return (
    <DocPage className="pg-motifs" title="Motifs — the brand DNA" lede={<>Five repeated elements. They are what make a page read as TPCL when the logo is
      small and the colours are borrowed from a client. Use at least two on any branded surface;
      never all five at once.</>}>
      <Motif n="01" title="Top-left accent block" demo={<>
        <AccentBlock style={{ position: 'absolute', top: 26, left: 26 }} />
        <AccentBlock dark style={{ position: 'absolute', bottom: 26, right: 26 }} />
        <span className="tp-note" style={{ fontSize: 12 }}>amber on light · cyan on dark</span>
      </>}>
        <p className="tp-note">A filled rectangle in the upper-left corner, roughly <strong>56 × 20px</strong>
          {' '}at web scale (2.8:1). <strong>Amber on white, cyan on charcoal.</strong> It appears on every
          internal page and is <em>absent</em> from the cover — its absence is what makes the cover a cover.
          Scale it with the canvas: 40×14 on an email, 84×30 on a 1080px social frame,
          ~1.4% of canvas width as a rule of thumb.</p>
        <p className="tp-note" style={{ marginTop: 8 }}>{code('<AccentBlock />')}</p>
      </Motif>

      <Motif n="02" title="Index chip" demo={<>
        <IndexChip edge>07</IndexChip>
        <span className="tp-note" style={{ fontSize: 12 }}>flush to the right edge</span>
      </>}>
        <p className="tp-note">A <strong>34px blue-gray square</strong> with a white numeral, flush to the
          right edge and vertically centred on the content area. Page numbers in decks; step counters in
          carousels; item numbers in a website section list. It bleeds off the edge — it is never inset.</p>
        <p className="tp-note" style={{ marginTop: 8 }}>{code('<IndexChip edge>07</IndexChip>')}</p>
      </Motif>

      <Motif n="03" title="Cyan outline rectangles" demoClass="tp-dark" demo={<>
        <OutlineRect width={120} height={80} top={18} right={24} />
        <OutlineRect width={74} height={74} bottom={16} left={22} />
        <OutlineRect width={52} height={34} bottom={44} right={64} opacity={0.5} />
        <span className="tp-note" style={{ fontSize: 12, color: 'rgba(255,255,255,.6)', position: 'relative' }}>negative-space texture</span>
      </>}>
        <p className="tp-note"><strong>2px cyan strokes, no fill.</strong> Two jobs: quiet texture in the
          empty half of a dark page, and a frame around a single statement or commercial ask.
          Keep them <strong>unequal in size, never aligned to each other</strong>, and always partly
          overlapping the margin so they read as texture rather than as content boxes.
          On light pages the stroke turns charcoal — cyan strokes disappear at 2.30:1 on white.</p>
        <p className="tp-note" style={{ marginTop: 8 }}>{code('<OutlineRect />')} · {code('<OutlineCard />')}</p>
      </Motif>

      <Motif n="04" title="Cyan timeline" demoClass="tp-dark" demoStyle={{ justifyContent: 'flex-start', padding: 26 }} demo={
        <Timeline style={{ margin: 0 }}>
          {[['Diagnose', 'Weeks 1–2'], ['Model', 'Weeks 3–5'], ['Embed', 'Weeks 6–9']].map(([t, w]) => (
            <li key={t}><strong style={{ fontSize: 14 }}>{t}</strong><br /><span style={{ fontSize: 12, color: 'rgba(255,255,255,.6)' }}>{w}</span></li>
          ))}
        </Timeline>
      }>
        <p className="tp-note">A <strong>2px vertical cyan rule</strong> with <strong>12px rounded dots</strong>,
          each dot ringed by a 4px halo in the background colour so it punches through the line.
          This is the standard TPCL treatment for anything sequential — phases, roadmap, methodology,
          a three-day arc. Horizontal variants are allowed on 16:9; the dot and rule weights do not change.</p>
        <p className="tp-note" style={{ marginTop: 8 }}>{code('<Timeline items={…} />')}</p>
      </Motif>

      <Motif n="05" title="Numbered step boxes" last demoClass="tp-dark" demoStyle={{ gap: 14 }} demo={<>
        <Step>1</Step><Step>2</Step><Step>3</Step>
      </>}>
        <p className="tp-note"><strong>40px squares, 2px cyan stroke, bold numeral.</strong> Used where the
          timeline would be too heavy — a three-across process row, a carousel page counter, the numbered
          list on a services page. Square, not circular: the circle is reserved for the timeline dot.</p>
        <p className="tp-note" style={{ marginTop: 8 }}>{code('<Step>1</Step>')}</p>
      </Motif>

      <Sec title="Combination rules" style={{ marginTop: 40 }}>
        <Rules maxWidth="72ch">
          <li><strong>Two motifs minimum, three maximum, per surface.</strong> Accent block + logo + one more.</li>
          <li><strong>There is no divider line</strong> between the dark and light blocks of a split layout. They meet directly. Adding a rule there is the single most common mis-build.</li>
          <li><strong>Outline rectangles and the timeline never share a page</strong> — both are cyan stroke work and they compete.</li>
          <li><strong>The accent block is always the first thing placed</strong>, at the top-left margin intersection. Everything else aligns to that margin.</li>
        </Rules>
      </Sec>
    </DocPage>
  );
}

/* ================================================================
   Typography
   ================================================================ */

function Row({ spec, children, last }: { spec: ReactNode; children: ReactNode; last?: boolean }) {
  return <div className="row" style={last ? { borderBottom: 0 } : undefined}><div className="spec">{spec}</div>{children}</div>;
}

export function TypographyPage() {
  return (
    <DocPage className="pg-type" title="Typography" lede={<>Poppins, and only Poppins — set in the three weights TPCL owns and has licensed
      locally: Regular&nbsp;400, Medium&nbsp;500, Bold&nbsp;700. No semibold, no light, no italic.
      The scale below is the whole system.</>}>
      <Sec title="The three weights">
        <div className="wt">
          <div><div className="big" style={{ fontWeight: 400 }}>Aa</div><div className="tp-h3" style={{ fontWeight: 400 }}>Regular · 400</div>
            <p className="tp-note" style={{ marginTop: 6 }}>Body, light-mode titles, long-form. The default.</p></div>
          <div><div className="big" style={{ fontWeight: 500 }}>Aa</div><div className="tp-h3">Medium · 500</div>
            <p className="tp-note" style={{ marginTop: 6 }}>Eyebrows, labels, buttons, sub-heads. Carries tracking.</p></div>
          <div><div className="big" style={{ fontWeight: 700 }}>Aa</div><div className="tp-h3" style={{ fontWeight: 700 }}>Bold · 700</div>
            <p className="tp-note" style={{ marginTop: 6 }}>Display, H2, stat figures, chip numerals. Nothing else.</p></div>
        </div>
        <p className="tp-note" style={{ marginTop: 14 }}><strong>Fallback stack:</strong>{' '}
          {code('Poppins → Century Gothic → Futura → Avenir Next → system-ui')}.
          All geometric sans — the layout holds if Poppins is unavailable. Email is the exception; see the emailer template.</p>
      </Sec>

      <Sec title="Scale">
        <Row spec={<>tp-display<br />60 / 1.02 / 700<br />UPPERCASE · +.01em</>}>
          <Text variant="display" as="div" style={{ fontSize: 52 }}>Evidence before<br />advice</Text></Row>
        <Row spec={<>tp-title<br />44 / 1.12 / 400<br />Sentence case · −.01em</>}>
          <Text variant="title" as="div">Turning a group mandate into a defensible country plan</Text></Row>
        <Row spec={<>tp-h2<br />28 / 1.2 / 700</>}><Text variant="h2" as="div">What we found in the collections book</Text></Row>
        <Row spec={<>tp-h3<br />20 / 1.3 / 500</>}><Text variant="h3" as="div">Three drivers, ranked by contribution</Text></Row>
        <Row spec={<>tp-body-lg<br />18 / 1.6 / 400</>}><Text variant="body-lg" as="div">Lead paragraphs and pull-outs on content slides. Comfortable at roughly 60–75 characters a line.</Text></Row>
        <Row spec={<>tp-body<br />16 / 1.6 / 400</>}><Text variant="body" as="div">The working size for every body block, table cell and email paragraph. Set measure to 62 characters and let it breathe.</Text></Row>
        <Row spec={<>tp-eyebrow<br />12 / 1 / 500<br />UPPERCASE · +.16em</>}><Text variant="eyebrow" as="div">Customer value management</Text></Row>
        <Row spec={<>tp-caption<br />13 / 1.45 / 400</>}><Text variant="caption" as="div" muted>Source: Example portfolio extract, July 2026. Measured, not modelled.</Text></Row>
        <Row last spec={<>tp-num<br />700 · tabular</>}><Text variant="num" as="div" style={{ fontSize: 44 }}>USD&nbsp;105,500,028</Text></Row>
      </Sec>

      <Sec title="The case rule — this is the one people get wrong">
        <div className="cmp">
          <div className="tp-dark">
            <AccentBlock dark />
            <p className="tp-eyebrow" style={{ margin: '20px 0 12px', color: 'var(--tp-cyan)' }}>Dark mode</p>
            <h3 className="tp-display" style={{ fontSize: 34 }}>The mandate<br />is the easy part</h3>
            <p className="tp-note" style={{ color: 'var(--tp-on-dark-muted)', marginTop: 16 }}>Bold · <strong style={{ color: 'var(--tp-white)' }}>ALL CAPS</strong> · white.
              Openers, section breaks, statement slides.</p>
          </div>
          <div>
            <AccentBlock />
            <p className="tp-eyebrow" style={{ margin: '20px 0 12px', color: 'var(--tp-ink-muted)' }}>Light mode</p>
            <h3 className="tp-title" style={{ fontSize: 34 }}>The mandate is the easy part</h3>
            <p className="tp-note" style={{ marginTop: 16 }}>Regular · <strong>Sentence case</strong> · charcoal.
              Content slides, bios, tables, everything else.</p>
          </div>
        </div>
        <p className="tp-note" style={{ marginTop: 14 }}>Do not enforce one case across the deck. The split{' '}
          <em>is</em> the system — caps signals a break, sentence case signals substance.</p>
      </Sec>

      <Sec title="Measure & rhythm">
        <Rules>
          <li>Body measure: <strong>58–72 characters</strong>. On a 1080px social canvas that is roughly 820px at 32px type.</li>
          <li>Line height: <strong>1.6 body · 1.2 headings · 1.02 display</strong>. Never tighter than 1.0.</li>
          <li>Tracking: positive only on uppercase (<strong>+.16em eyebrow, +.01em display</strong>); negative only on large sentence-case titles (<strong>−.01em</strong>).</li>
          <li>Figures in any column or KPI row use {code('font-variant-numeric: tabular-nums')} so they align.</li>
          <li>Never stretch, condense, outline or add a shadow to Poppins.</li>
        </Rules>
      </Sec>
    </DocPage>
  );
}

