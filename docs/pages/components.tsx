import {
  AccentBlock, Arrow, Bars, Button, Card, Delta, HorizontalTimeline, KpiRow, OutlineCard, ProvenanceChip,
  Quote, SparkPath, Stat, Step, Table, Tag, Text, Timeline, type Column,
} from '../../src';
import { DarkBay, DocPage, Lab, Rules, Sec } from '../kit';

const onDarkNote = { color: 'var(--tp-on-dark-muted)' };
const code = (s: string) => <span className="tp-code">{s}</span>;

/* ================================================================
   Buttons
   ================================================================ */

export function ButtonsPage() {
  return (
    <DocPage className="pg-buttons" title="Buttons" lede={<>Four variants, two sizes, square corners, 2px borders. One primary action per
      surface — the rest are ghost.</>}>
      <Sec>
        <Lab>On white</Lab>
        <div className="bay light">
          <Button variant="primary" href="#">Book a diagnostic</Button>
          <Button variant="secondary" href="#">Download the pack</Button>
          <Button variant="solid" href="#">Get in touch</Button>
          <Button variant="ghost" href="#">Read the case note</Button>
        </div>
      </Sec>

      <Sec>
        <Lab>On charcoal</Lab>
        <div className="bay tp-dark">
          <Button variant="primary" href="#">Book a diagnostic</Button>
          <Button variant="secondary" href="#">Download the pack</Button>
          <Button variant="ghost" href="#">Read the case note</Button>
        </div>
        <p className="tp-note" style={{ marginTop: 10 }}>The solid-charcoal variant has no job on a charcoal
          surface — use ghost there.</p>
      </Sec>

      <Sec>
        <Lab>Small · in cards, tables, email footers</Lab>
        <div className="bay light">
          <Button size="sm" variant="primary">View</Button>
          <Button size="sm" variant="solid">Reply</Button>
          <Button size="sm" variant="ghost">Dismiss</Button>
        </div>
      </Sec>

      <Sec>
        <Lab>With a mark</Lab>
        <div className="bay light">
          <Button variant="solid">Continue <Arrow /></Button>
          <Button variant="ghost"><AccentBlock size="sm" width={14} height={14} /> Filter</Button>
        </div>
      </Sec>

      <Sec title="Rules">
        <Rules>
          <li><strong>Cyan and amber buttons take charcoal labels, never white.</strong> White on cyan is
            2.30:1 and fails WCAG; charcoal on cyan is 4.95:1 and passes.</li>
          <li><strong>Padding 13/26 regular, 9/18 small.</strong> Height comes from the padding, not a fixed value.</li>
          <li><strong>Label is sentence case, Medium 500, +.02em.</strong> Never all-caps, never a full stop.</li>
          <li><strong>Verb + object.</strong> “Book a diagnostic”, not “Click here” or “Learn more”.</li>
          <li>Hover: shift the fill one step darker, or on ghost, fill with the border colour. No lift, no shadow, no scale.</li>
          <li>Focus: 2px charcoal outline offset 3px on light; 2px cyan on dark. Never remove it.</li>
        </Rules>
        <p className="tp-note" style={{ marginTop: 12 }}>{code('<Button variant="primary" href="/diagnostic">Book a diagnostic</Button>')}
          {' '}— renders an {code('<a>')} with {code('href')}, otherwise a {code('<button type="button">')}.</p>
      </Sec>
    </DocPage>
  );
}

/* ================================================================
   Cards & panels
   ================================================================ */

export function CardsPage() {
  return (
    <DocPage title="Cards & panels" lede={<>Four surfaces. Hairline on white for content, blue-gray for framing,
      charcoal-soft for dark pages, and a 3px cyan rule when a card is the point of the section.</>}>
      <Sec>
        <Lab>Content cards — hairline on white</Lab>
        <div className="doc-g3">
          {[
            ['Diagnose', 'Reconcile the book against source totals before a single recommendation is written.'],
            ['Model', 'Build the country instance of the group template, with the assumptions named on the page.'],
            ['Embed', "Hand over a monthly review the client's own team can run without us."],
          ].map(([t, b]) => (
            <Card key={t}>
              <AccentBlock size="sm" />
              <h3 className="tp-h3" style={{ margin: '14px 0 8px' }}>{t}</h3>
              <p className="tp-note">{b}</p>
            </Card>
          ))}
        </div>
      </Sec>

      <Sec>
        <Lab>Accent-rule card — for the one that matters</Lab>
        <div className="doc-g2">
          <Card variant="accent">
            <p className="tp-eyebrow" style={{ color: 'var(--tp-ink-muted)' }}>Acceptance test</p>
            <h3 className="tp-h2" style={{ margin: '10px 0 8px' }}>Reconciliation, not review</h3>
            <p className="tp-note">A model ships when it ties back to the source total. USD 105,500,028, to the cent.</p>
          </Card>
          <Card variant="panel">
            <p className="tp-eyebrow">Blue-gray panel</p>
            <h3 className="tp-h2" style={{ margin: '10px 0 8px' }}>Framing surface</h3>
            <p className="tp-body" style={{ fontSize: 15 }}>Pull-quotes, contact blocks, the right half of a split.
              Charcoal text only — blue-gray is 6.50:1 against charcoal and 1.75:1 against white.</p>
          </Card>
        </div>
      </Sec>

      <Sec>
        <Lab>On charcoal</Lab>
        <DarkBay>
          <div className="doc-g3">
            <Card variant="dark">
              <Step size={32} fontSize={13}>1</Step>
              <h3 className="tp-h3" style={{ margin: '14px 0 8px' }}>Raised panel</h3>
              <p className="tp-note" style={onDarkNote}>Charcoal-soft #4A4A4A. No border — the tone shift does the work.</p>
            </Card>
            <OutlineCard style={{ padding: 24 }}>
              <h3 className="tp-h3" style={{ margin: '0 0 8px' }}>Outline card</h3>
              <p className="tp-note" style={onDarkNote}>2px cyan. Reserved for a statement, an ask, or a commercial number.</p>
            </OutlineCard>
            <Card variant="panel">
              <h3 className="tp-h3" style={{ margin: '0 0 8px' }}>Panel on dark</h3>
              <p className="tp-note" style={{ color: 'var(--tp-charcoal)' }}>Blue-gray still carries charcoal text. It inverts the page, so use one per slide.</p>
            </Card>
          </div>
        </DarkBay>
      </Sec>

      <Sec title="Rules">
        <Rules>
          <li><strong>Padding 24; 32 when the card holds a heading and more than three lines.</strong></li>
          <li><strong>Square corners, no shadow.</strong> Depth comes from tone (white → surface → blue-gray → charcoal-soft), never from elevation.</li>
          <li><strong>One accent-rule card per section.</strong> If everything is emphasised, nothing is.</li>
          <li>Cards in a row are equal height. Let the shortest set the height and pad the rest — do not let content set it.</li>
          <li>A card never carries both an accent block and a step number. Pick the one that matches the section.</li>
        </Rules>
      </Sec>
    </DocPage>
  );
}

/* ================================================================
   Stat tiles & KPI row
   ================================================================ */

export function StatTilesPage() {
  return (
    <DocPage title="Stat tiles & KPI row" lede={<>Figures are the argument, so they get the largest type on the page and nothing
      decorative around them. Tabular numerals, hairline separators, and a stated provenance.</>}>
      <Sec>
        <Lab>KPI row — light</Lab>
        <KpiRow>
          <Stat value="USD 105.5m" label="Book reconciled" delta={<Delta direction="up">tied to source</Delta>} />
          <Stat value="41,007" label="Accounts in scope" delta={<Delta direction="up">4.2% vs June</Delta>} />
          <Stat value="24.7%" label="PAR 30+" delta={<Delta direction="down">1.8 pts</Delta>} />
          <Stat value="0" label="Failed card checks" delta={<Delta direction="up">96 of 96</Delta>} />
        </KpiRow>
      </Sec>

      <Sec>
        <Lab>KPI row — charcoal</Lab>
        <DarkBay>
          <KpiRow>
            <Stat accent value="60" label="Months of history" />
            <Stat value="7" label="Consulting personas" />
            <Stat value="20" label="Dashboard tabs" />
            <Stat value="64" label="Cards QA'd" />
          </KpiRow>
        </DarkBay>
        <p className="tp-note" style={{ marginTop: 10 }}>Cyan is available as a figure colour on charcoal
          (4.95:1). Use it on <strong>one</strong> tile — the hero number — never on all four.</p>
      </Sec>

      <Sec>
        <Lab>Single tile with trend</Lab>
        <div className="doc-g3">
          <Card variant="accent">
            <span className="tp-stat-label" style={{ color: 'var(--tp-ink-muted)' }}>Collection rate</span>
            <div className="tp-stat-value" style={{ marginTop: 6 }}>68.2%</div>
            <SparkPath points="0,34 25,31 50,33 75,26 100,24 125,19 150,20 175,12 200,9" width={200} height={44} />
            <Delta direction="up" style={{ marginTop: 8 }}>5.4 pts over 8 months</Delta>
          </Card>
          <Card>
            <span className="tp-stat-label" style={{ color: 'var(--tp-ink-muted)' }}>Contact rate</span>
            <div className="tp-stat-value" style={{ marginTop: 6 }}>39.7%</div>
            <SparkPath points="0,14 25,18 50,16 75,22 100,25 125,23 150,29 175,31 200,33" width={200} height={44} color="var(--tp-ink-muted)" />
            <Delta direction="down" style={{ marginTop: 8 }}>4.4 pts over 8 months</Delta>
          </Card>
          <Card variant="panel">
            <span className="tp-stat-label">Forecast · FY27</span>
            <div className="tp-stat-value" style={{ marginTop: 6 }}>USD 36.0m</div>
            <p className="tp-note" style={{ color: 'var(--tp-charcoal)', marginTop: 10 }}>
              <ProvenanceChip kind="modelled" /> Base roll-forward, downside overlay. Not a measured figure.</p>
          </Card>
        </div>
      </Sec>

      <Sec title="Provenance chips — non-negotiable">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
          <ProvenanceChip kind="measured" />
          <ProvenanceChip kind="modelled" />
          <ProvenanceChip kind="assumed" />
        </div>
        <p className="tp-note" style={{ maxWidth: '70ch' }}>Every figure carries one, or the source line under the
          block does. <strong>A modelled number is never presented as measured.</strong> This is the single
          rule in the system that overrides visual preference — if the chip crowds the layout, change the
          layout.</p>
      </Sec>

      <Sec title="Rules">
        <Rules>
          <li><strong>Four tiles maximum per row.</strong> Five means the row is doing a table's job.</li>
          <li><strong>Value 44px Bold tabular · label 13px Medium uppercase +.06em.</strong> Label sits under the value, never above.</li>
          <li><strong>Separators are 1px hairlines, not card borders.</strong> A KPI row is one object.</li>
          <li>Round to the precision the decision needs — {code('USD 105.5m')} on a slide, the exact cent in the appendix.</li>
          <li>Deltas name the comparison (“vs June”), never a bare percentage.</li>
          <li>Green/red deltas are the <em>only</em> non-brand colours in the system, and only on deltas. They are darkened on white (#1E7A46 / #B00020) and lightened on charcoal so both pass AA.</li>
        </Rules>
      </Sec>
    </DocPage>
  );
}

/* ================================================================
   Tables, quotes & tags
   ================================================================ */

type SegmentRow = { segment: string; accounts: string; book: string; par: string; trend: number[]; prov: 'measured' | 'assumed' };
export const segments: SegmentRow[] = [
  { segment: 'Champions', accounts: '5,231', book: '24,815,612', par: '3.8%', trend: [6, 9, 8, 13, 17], prov: 'measured' },
  { segment: 'Loyal payers', accounts: '9,472', book: '35,120,457', par: '10.2%', trend: [11, 12, 10, 14, 13], prov: 'measured' },
  { segment: 'At risk', accounts: '12,861', book: '30,544,388', par: '36.9%', trend: [17, 15, 12, 9, 6], prov: 'measured' },
  { segment: 'Dormant', accounts: '13,443', book: '15,019,571', par: '68.5%', trend: [14, 11, 8, 5, 3], prov: 'assumed' },
];
export const segmentTotal = { segment: 'Total', accounts: '41,007', book: '105,500,028', par: '24.7%' };

const segmentCols: Column<SegmentRow>[] = [
  { key: 'segment', header: 'Segment' },
  { key: 'accounts', header: 'Accounts', numeric: true },
  { key: 'book', header: 'Book (USD)', numeric: true },
  { key: 'par', header: 'PAR 30+', numeric: true },
  { key: 'trend', header: 'Trend', render: (r) => <Bars heights={r.trend} /> },
  { key: 'prov', header: 'Provenance', render: (r) => r.prov === 'measured' ? <Tag tone="cyan">Measured</Tag> : <Tag>Assumed</Tag> },
];

type PersonaRow = { persona: string; buyer: string; drop: string };
const personaCols: Column<PersonaRow>[] = [
  { key: 'persona', header: 'Persona' },
  { key: 'buyer', header: 'Buyer' },
  { key: 'drop', header: 'Drop it when' },
];
const personas: PersonaRow[] = [
  { persona: 'Country / Market Operator', buyer: 'Group Exec, Country MD', drop: 'Single-jurisdiction client' },
  { persona: 'Data & AI Product Builder', buyer: 'CIO, Head of Data', drop: 'No system deliverable' },
  { persona: 'Mentor / Coach', buyer: 'CHRO, Head of L&D', drop: 'No capability transfer in scope' },
];

export function TableQuotePage() {
  return (
    <DocPage title="Tables, quotes & tags" lede={<>The workhorses. A TPCL table has no vertical rules, no zebra stripes and no fill —
      alignment and one heavy header rule do all the structuring.</>}>
      <Sec>
        <Lab>Data table</Lab>
        <div className="tp-table-scroll">
          <Table columns={segmentCols} rows={segments} total={segmentTotal} />
        </div>
        <p className="tp-note" style={{ marginTop: 12 }}>Source: Example portfolio extract, July 2026.
          Total ties to the source ledger to the cent.</p>
      </Sec>

      <Sec>
        <Lab>Table on charcoal</Lab>
        <DarkBay padding="28px 32px">
          <Table columns={personaCols} rows={personas} />
        </DarkBay>
      </Sec>

      <Sec>
        <Lab>Quote &amp; statement</Lab>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
          <Quote name="Travis Mulenga" position="Principal Consultant">
            The mandate was never the hard part. Making it defensible in a market the model has never seen — that is the work.
          </Quote>
          <DarkBay padding={34}>
            <AccentBlock dark />
            <Text variant="display" as="p" style={{ fontSize: 28, marginTop: 20 }}>Evidence<br />before advice</Text>
            <p className="tp-note" style={{ ...onDarkNote, marginTop: 14 }}>
              The statement page: accent block, three to six words in caps, nothing else. No body copy.</p>
          </DarkBay>
        </div>
      </Sec>

      <Sec>
        <Lab>Tags</Lab>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Tag>Neutral</Tag>
          <Tag tone="cyan">Measured</Tag>
          <Tag tone="amber">Action required</Tag>
          <Tag tone="panel">Phase 2</Tag>
        </div>
      </Sec>

      <Sec title="Rules">
        <Rules>
          <li><strong>No vertical rules, no zebra stripes, no cell fills.</strong> One 2px charcoal rule under the header, 1px hairlines between rows.</li>
          <li><strong>Numbers right-aligned and tabular</strong>; text left-aligned. Never centre a column.</li>
          <li><strong>Header labels are 12px Medium uppercase +.1em muted</strong> — quieter than the data, because the data is the point.</li>
          <li><strong>Totals row is bold, no fill</strong>, and it must reconcile. A total that does not tie to source does not ship.</li>
          <li>A source line sits under every table. If the data is modelled, the line says so.</li>
          <li>Quotes take a 3px cyan left rule and no quotation marks. Attribution below, name in Medium.</li>
        </Rules>
      </Sec>
    </DocPage>
  );
}

/* ================================================================
   Timeline & steps
   ================================================================ */

export function TimelinePage() {
  return (
    <DocPage className="pg-timeline" title="Timeline & steps" lede={<>Anything sequential — phases, methodology, a roadmap, a three-day arc — uses the
      cyan timeline. Weights never change: 2px rule, 12px dot, 4px halo, 40px step box.</>}>
      <Sec>
        <Lab>Vertical — the default, on charcoal</Lab>
        <DarkBay padding="36px 40px">
          <Timeline bodyMaxWidth="56ch" items={[
            { label: 'Weeks 1–2', title: 'Diagnose', body: 'Reconcile the book against source totals. Name what could not be recovered. No recommendation is written before this closes.' },
            { label: 'Weeks 3–5', title: 'Model', body: 'Build the country instance of the group template. Assumptions sit on the page, not in an appendix.' },
            { label: 'Weeks 6–9', title: 'Embed', body: "Hand over the monthly review the client's own team runs without us. Capability, not dependency." },
          ]} />
        </DarkBay>
      </Sec>

      <Sec>
        <Lab>Vertical on white — rule and dot stay cyan, halo turns white</Lab>
        <div className="tp-light" style={{ border: '1px solid var(--tp-rule)', padding: '32px 36px' }}>
          <Timeline items={[
            { title: 'Intake', body: 'Six clusters, one brief, no slides built yet.' },
            { title: 'Design brief', body: 'Surface the system. Wait for sign-off.' },
            { title: 'Build', body: 'Two reference pages first, then the full set.' },
          ]} />
        </div>
      </Sec>

      <Sec>
        <Lab>Horizontal — for 16:9 slides and wide web sections</Lab>
        <DarkBay padding="36px 40px 30px">
          <HorizontalTimeline bodyColor="rgba(255,255,255,.62)" items={[
            { label: 'Q3 2026', title: 'Scope', body: 'Mandate and data boundary agreed.' },
            { label: 'Q4 2026', title: 'Build', body: 'Lake, ETL and scoring engine live.' },
            { label: 'Q1 2027', title: 'Prove', body: 'Test-vs-control on two segments.' },
            { label: 'Q2 2027', title: 'Hand over', body: 'Client team owns the monthly cycle.' },
          ]} />
        </DarkBay>
      </Sec>

      <Sec>
        <Lab>Step boxes — where a timeline would be too heavy</Lab>
        <DarkBay padding="34px 40px">
          <div className="steprow">
            {[
              ['Build', 'Syndicates draft the case in the war room.'],
              ['Model', 'Numbers stress-tested against three lenses.'],
              ['Defend', 'Live panel challenge, then certification.'],
            ].map(([t, b], i) => (
              <div key={t}><Step>{i + 1}</Step>
                <h3 className="tp-h3" style={{ margin: '16px 0 6px' }}>{t}</h3>
                <p className="tp-note" style={onDarkNote}>{b}</p></div>
            ))}
          </div>
        </DarkBay>
      </Sec>

      <Sec title="Rules">
        <Rules>
          <li><strong>Three to five items.</strong> Six or more is a table, not a timeline.</li>
          <li><strong>Every item carries a time label</strong> in cyan Medium uppercase — weeks, quarters or days. A timeline without dates is just a list.</li>
          <li><strong>Dot halo matches the background</strong>, so the dot punches through the rule. On white it is a white halo; on charcoal, charcoal.</li>
          <li><strong>Never combine the timeline with outline rectangles</strong> on the same page — both are cyan stroke work.</li>
          <li>Steps are square; the timeline dot is the only circle in the system.</li>
        </Rules>
      </Sec>
    </DocPage>
  );
}
