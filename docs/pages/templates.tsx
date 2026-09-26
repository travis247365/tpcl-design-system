import {
  CarouselContent, CarouselCover, CarouselCta, CtaBand, Emailer, LinkedInBanner, LinkedInCompanyCover,
  LinkedInSingle, ProofSection, ServicesSection, SiteFooter, SiteFrame, SiteNav, SlideContent, SlideCover,
  SlideSplit, SlideStatement, SocialPortrait, SocialSquare, SocialStory, StatementSection, WebsiteHero,
  WhatsAppStatus, type Column,
} from '../../src';
import logoWhite from '../../src/assets/logo/tpc_white.png';
import { TemplateNotes, TemplatePage, TemplateTag } from '../kit';

const code = (s: string) => <span className="tp-code">{s}</span>;

/* ================================================================
   Deck · slide masters 16:9
   ================================================================ */

type Seg = { segment: string; accounts: string; book: string; par: string };
const segCols: Column<Seg>[] = [
  { key: 'segment', header: 'Segment' },
  { key: 'accounts', header: 'Accounts', numeric: true },
  { key: 'book', header: 'Book (USD)', numeric: true },
  { key: 'par', header: 'PAR 30+', numeric: true },
];
const segRows: Seg[] = [
  { segment: 'Champions', accounts: '5,231', book: '24,815,612', par: '3.8%' },
  { segment: 'Loyal payers', accounts: '9,472', book: '35,120,457', par: '10.2%' },
  { segment: 'At risk', accounts: '12,861', book: '30,544,388', par: '36.9%' },
  { segment: 'Dormant', accounts: '13,443', book: '15,019,571', par: '68.5%' },
];

export function SlidesPage() {
  return (
    <TemplatePage>
      <TemplateTag>Master A · Cover — full charcoal. The accent block is deliberately absent.</TemplateTag>
      <SlideCover exportId="slide-a-cover"
        eyebrow="Prepared for Northwind plc · August 2026"
        title={<>Business case<br />development lab</>}
        subtitle="A three-day arc that leaves the capability inside the business." />

      <TemplateTag>Master B · Split — charcoal / blue-gray. No divider line where they meet.</TemplateTag>
      <SlideSplit exportId="slide-b-split" page="07"
        eyebrow="The mandate"
        title={<>Six functions,<br />five syndicates,<br />three days</>}
        steps={[
          { label: 'Day 1', title: 'Build', body: 'Syndicates draft the case in the war room.' },
          { label: 'Day 2', title: 'Model', body: 'Numbers stress-tested against three lenses.' },
          { label: 'Day 3', title: 'Defend', body: 'Live panel challenge, then certification.' },
        ]} />

      <TemplateTag>Master C · Content — white, sentence case, data-forward. The workhorse.</TemplateTag>
      <SlideContent exportId="slide-c-content" page="12"
        eyebrow="Portfolio diagnostic"
        title={<>The book is not evenly distressed — <b>two segments carry 83% of the arrears.</b></>}
        columns={segCols} rows={segRows}
        total={{ segment: 'Total', accounts: '41,007', book: '105,500,028', par: '24.7%' }}
        soWhat={{ provenance: 'measured', body: <>At-risk and dormant are 64% of accounts but only
          43% of the book. Chasing them evenly is what makes contact rate rise while recovery falls.</> }}
        source="Source: Example portfolio extract, July 2026. Total ties to source ledger." />

      <TemplateTag>Master D · Statement or commercial ask — dark, outline card, nothing else.</TemplateTag>
      <SlideStatement exportId="slide-d-statement" page="28"
        eyebrow="The ask"
        statement={<>USD 1.2m<br />over nine weeks</>}
        body="Fixed fee. Two-week diagnostic gate at week 2 — stop there at no further cost if the number does not hold." />

      <TemplateNotes title="Slide masters · 16:9" width={1280} maxWidth="92ch">
        <strong>Shown at 1280 × 720; build at 1920 × 1080.</strong> Everything scales
        ×1.5 — margins 64 → 96, cover headline 64 → 96, content headline 40 → 60, body 16 → 24, the accent
        block 60×20 → 90×30, the index chip 44 → 66. {code('npm run export')} renders at device scale 1.5.
        <br /><br />
        <strong>Four masters cover a whole deck.</strong> Cover, split, content,
        statement. A fifth — half-bleed photo plus bio — is only for the principal-consultant page.
        If a slide does not fit one of these, the slide is trying to say two things.
        <br /><br />
        <strong>Case rule:</strong> caps on charcoal, sentence case on white. Cover
        and statement carry no index chip and no accent block respectively — the cover has no accent block,
        the statement has no data. Those absences are what mark them as breaks in the deck.
        <br /><br />
        <strong>Building in PowerPoint:</strong> python-pptx embeds PNG/JPG only, so
        rasterise the logo before use — {code('tpc_white.png')} on charcoal,{' '}
        {code('tpc_black.png')} on white, from{' '}
        {code('src/assets/logo/')}. Set Poppins on the slide master.
      </TemplateNotes>
    </TemplatePage>
  );
}

/* ================================================================
   Website
   ================================================================ */

const nav = (
  <SiteNav
    links={[
      { label: 'Practice', href: '#', current: true },
      { label: 'Field notes', href: '#' },
      { label: 'Engagements', href: '#' },
      { label: 'About', href: '#' },
    ]}
    cta={{ label: 'Book a diagnostic', href: '#' }}
  />
);

export function WebsiteHeroPage() {
  return (
    <TemplatePage>
      <TemplateTag>Desktop · 1440 frame, 1200 content</TemplateTag>
      <SiteFrame fixed>
        {nav}
        <WebsiteHero
          eyebrow="Travis Paul Consulting Ltd · Lusaka"
          title={<>Evidence<br />before advice</>}
          lede={<>We take a group mandate, a book of accounts or a KPI cascade, and hand back the
            country instance your team can defend — and then run without us.</>}
          primary={{ label: 'Book a diagnostic', href: '#' }}
          secondary={{ label: 'Read a field note', href: '#' }}
          proof={[
            { value: 'USD 105.5m', label: 'Book reconciled to source' },
            { value: '+5.4 pts', label: 'Collection rate, 8 months' },
            { value: '64 / 64', label: 'Dashboard cards, zero failures' },
          ]}
        />
      </SiteFrame>
      <TemplateNotes title="Website hero" width={1440} maxWidth="92ch">
        <strong>7/5 split, not 6/6.</strong> The asymmetry is the point — a 50/50
        hero reads as a template. Charcoal carries the claim, blue-gray carries the proof, and the two
        blocks meet directly with no rule between them.
        <br /><br />
        <strong>Responsive behaviour:</strong> below 900px the split stacks —
        charcoal block first at full width, blue-gray proof block beneath it. The index chip and the
        outline rectangle both drop out on mobile; they are texture, and texture costs vertical space
        that a phone does not have. Hero headline scales{' '}
        {code('clamp(38px, 6vw, 64px)')}, lede stays 17–20px. Drop {code('fixed')} from{' '}
        {code('<SiteFrame>')} to get the fluid build.
        <br /><br />
        <strong>One primary action on the page.</strong> “Book a diagnostic”
        appears in the nav and in the hero; every other link is ghost or plain text. The nav bar is
        charcoal so the hero's dark block runs into it as one mass — do not put a border between them.
        <br /><br />
        <strong>Proof block is measured figures only.</strong> If a number on the
        home page is modelled, it belongs on the engagement page with its assumptions, not in the hero.
      </TemplateNotes>
    </TemplatePage>
  );
}

export function WebsiteSectionsPage() {
  return (
    <TemplatePage>
      <TemplateTag>Sections stack in this order under the hero</TemplateTag>
      <SiteFrame fixed>
        <ServicesSection
          eyebrow="What we do"
          title={<>Three ways in, and <b>one way out — capability you keep.</b></>}
          services={[
            { title: 'Portfolio diagnostic', body: <>Reconcile the book, rank every
              account, find where the recovery actually sits. Two weeks, one deliverable, no slideware.</> },
            { title: 'Country instance', body: <>A group canvas, forecast template
              or KPI cascade, translated into the market plan the country MD can defend upward.</> },
            { title: 'Data & AI products', body: <>Lakes, ETL, scoring engines, BI and
              conversational AI — built to reconcile, and handed over documented.</> },
          ]}
        />
        <StatementSection
          statement="A model ships when it ties back to source"
          body={<>Reconciliation is the acceptance test — not review, not sign-off. If the total does not tie,
            the work is not finished, whatever the deadline says.</>}
        />
        <ProofSection
          eyebrow="Engagements"
          title="Operators, not audiences."
          clients={Array.from({ length: 5 }, () => ({ name: 'Client mark' }))}
          engagements={[
            { engagement: 'Collections portfolio', lens: 'CVM / Growth Architect', outcome: '+5.4 pts collection rate', provenance: 'measured' },
            { engagement: 'Group-to-market translation', lens: 'Country / Market Operator', outcome: '60 months rebuilt', provenance: 'measured' },
            { engagement: 'Business case capability lab', lens: 'Mentor / Coach', outcome: '5 syndicates certified', provenance: 'measured' },
          ]}
        />
        <CtaBand
          title="Start with two weeks and a reconciled number."
          body={<>No proposal deck until the diagnostic
            says there is something to propose.</>}
          cta={{ label: 'Book a diagnostic', href: '#' }}
        />
        <SiteFooter
          blurb={<>Travis Paul Consulting Ltd · Lusaka, Zambia. Registered with the Zambia Data Protection
            Commission as Controller and Processor.</>}
          columns={[
            { heading: 'Practice', links: [
              { label: 'Portfolio diagnostic', href: '#' }, { label: 'Country instance', href: '#' }, { label: 'Data & AI products', href: '#' }] },
            { heading: 'Writing', links: [
              { label: 'Field notes', href: '#' }, { label: 'Method', href: '#' }, { label: 'Provenance policy', href: '#' }] },
            { heading: 'Contact', links: [
              { label: 'hello@example.com', href: 'mailto:hello@example.com' }, { label: 'LinkedIn', href: '#' }, { label: 'Book a call', href: '#' }] },
          ]}
          legal="© 2026 Travis Paul Consulting Ltd. All rights reserved."
        />
      </SiteFrame>
      <TemplateNotes title="Website sections" width={1440} maxWidth="92ch">
        <strong>The page alternates mode.</strong> light → dark → light → blue-gray →
        charcoal. That rhythm is the site's structure; a page of all-white sections loses the brand entirely.
        Section padding is 96px vertical on desktop, 56px on mobile.
        <br /><br />
        <strong>The statement section is the only place caps appear on the site</strong>
        {' '}— and it carries no data, no buttons and no links. One idea, twenty words, texture in the negative
        space. Everything else on the site is sentence case.
        <br /><br />
        <strong>Service cards use a 3px cyan top rule</strong> rather than a box.
        A bordered card grid reads as a SaaS template; a top rule reads as a document. Client marks sit in
        a 1px-gap grid so the whole block is one object — set them all to a single grey tone, never full
        colour, unless a client's brand guidelines require otherwise.
        <br /><br />
        <strong>Every outcome figure carries a provenance tag.</strong> On a public
        site that rule matters more, not less — a modelled result presented as measured is the one
        reputational mistake that cannot be walked back.
      </TemplateNotes>
    </TemplatePage>
  );
}

/* ================================================================
   LinkedIn
   ================================================================ */

export function LinkedInBannersPage() {
  return (
    <TemplatePage>
      <TemplateTag>Personal profile banner · 1584 × 396</TemplateTag>
      <LinkedInBanner exportId="linkedin-banner-1584x396"
        title={<>Evidence<br />before advice</>}
        line="CVM · Collections · Data & AI products · Lusaka, Zambia" />

      <TemplateTag>Company page cover · 1128 × 191</TemplateTag>
      <LinkedInCompanyCover exportId="linkedin-cover-1128x191"
        title={<>Turning group mandates into <b>defensible country plans</b></>} />

      <TemplateNotes title="LinkedIn banners" width={1584} maxWidth="92ch">
        <strong>Both banners get cropped, and the crop is the whole design problem.</strong>
        {' '}The dashed keep-outs mark where LinkedIn drops your avatar and page logo — they are hidden on export.
        <br /><br />
        <strong>Personal · 1584 × 396.</strong> The profile photo overlaps the
        lower-left, so the deep-charcoal block on the left is deliberate: it is a landing pad for the
        avatar, and nothing legible goes there. Type starts at x≈640. On mobile LinkedIn crops the banner
        in from both sides and shortens it — keep every word inside the middle 60% horizontally and the
        top 70% vertically, which is where the headline sits here.
        <br /><br />
        <strong>Company page · 1128 × 191.</strong> Very shallow, and the square page
        logo sits bottom-left. One line of positioning, nothing else — a second line will collide with the
        logo on a phone. Light mode, because the company page surrounds the cover with white chrome and a
        charcoal band reads as a bar rather than a banner.
        <br /><br />
        Export PNG at 1× for both. LinkedIn re-encodes uploads, and flat colour with a 2px stroke survives
        that far better than a photograph or a gradient.
      </TemplateNotes>
    </TemplatePage>
  );
}

export function LinkedInCarouselPage() {
  return (
    <TemplatePage>
      <TemplateTag width={1080}>Page 1 · Cover — dark, caps, no body copy</TemplateTag>
      <CarouselCover exportId="carousel-01" page="1"
        eyebrow="Collections · Portfolio"
        title={<>Why your<br />contact rate<br />is the wrong<br />KPI</>} />

      <TemplateTag width={1080}>Pages 2–8 · Content — light, sentence case, one idea per page</TemplateTag>
      <CarouselContent exportId="carousel-04" page="4"
        eyebrow="The problem"
        title={<>You can reach everyone<br />and still <b>recover nothing.</b></>}
        body={<>Contact rate measures effort. It moves when
          you add dialler capacity. It does not move when the book gets healthier — and it goes{' '}
          <em>up</em> when your worst accounts need chasing five times each.</>}
        figures={[
          { value: '39.7%', label: 'Contact rate — falling' },
          { value: '68.2%', label: 'Collection rate — rising' },
        ]}
        source="Measured · same book, same 8 months." />

      <TemplateTag width={1080}>Final page · CTA — dark, one ask, contact line</TemplateTag>
      <CarouselCta exportId="carousel-09" page="9"
        eyebrow="What we'd do first"
        title={<>A two-week<br />diagnostic</>}
        steps={[
          'Reconcile the book against source totals.',
          'Rank every account by recency, frequency, size.',
          'Re-sequence the queue. Measure against control.',
        ]}
        contactName="Travis Mulenga · Principal Consultant"
        contactLine="hello@example.com" />

      <TemplateNotes title="1080 × 1350 (4:5) · LinkedIn carousel / document post" width={1080}>
        <strong>Three page types, one rhythm: dark cover → light content → dark CTA.</strong>
        {' '}The mode flip is what makes the deck feel like a deck rather than a slideshow of posts.
        <br /><br />
        <strong>Length: 7–10 pages.</strong> One idea per page — if a page needs a
        second paragraph, it is two pages. Every page carries the index chip so a reader who lands mid-deck
        knows where they are. The cover has <em>no</em> body copy and the CTA has <em>no</em> data; both
        rules exist because the middle pages already do that work.
        <br /><br />
        LinkedIn ingests carousels as <strong>PDF documents</strong>, so export the pages at 1080 × 1350
        and combine them into a single PDF in page order — {code('npm run export')} writes{' '}
        {code('exports/linkedin-carousel.pdf')}, one image per page, no bleed, no crop marks.
        Keep the file under 100 MB and under 300 pages (never a real constraint at ten pages).
        Text stays inside the 80px margin; LinkedIn's own page-turn control overlays the bottom-centre of
        the frame in the mobile viewer.
      </TemplateNotes>
    </TemplatePage>
  );
}

export function LinkedInSinglePage() {
  return (
    <TemplatePage>
      <div style={{ height: 8 }} />
      <LinkedInSingle exportId="linkedin-single-1200x627"
        eyebrow="Portfolio diagnostic"
        title={<>Order the<br />book before<br />you call it</>}
        value="+5.4" unit="pts"
        label="Collection rate · 8 months"
        body="Same agents. Same script. 41,007 accounts re-sequenced by recency, frequency and size."
        source="Measured · Example Co, Jul 2026" />
      <TemplateNotes title="1200 × 627 (1.91:1) · LinkedIn single image post & link preview" width={1200} maxWidth="82ch">
        <strong>The split archetype, at its most useful ratio.</strong> Charcoal
        left carries the claim, blue-gray right carries the proof — and the two blocks meet directly with{' '}
        <em>no divider line</em>. That is the most-broken rule in the system, so check it before export.
        <br /><br />
        1.91:1 is also LinkedIn's link-preview crop, so this template does double duty: post it as an
        image, or use it as the Open Graph image on a TPCL page and the feed card looks identical.
        Note the index chip inverts here — on a blue-gray panel it becomes charcoal, because blue-gray on
        blue-gray would disappear. Keep the headline to eight words; LinkedIn renders this card small in
        the feed and anything longer is unreadable on a phone.
      </TemplateNotes>
    </TemplatePage>
  );
}

/* ================================================================
   Social
   ================================================================ */

export function SocialSquarePage() {
  return (
    <TemplatePage>
      <div style={{ height: 8 }} />
      <SocialSquare exportId="social-square-1080"
        eyebrow="Collections · Portfolio"
        title={<>Three in ten<br />accounts carry<br />the arrears</>}
        sub="And the other seven are paying for the cost of chasing them."
        figure={{ value: '24.7%', label: 'PAR 30+ · July 2026' }}
        source="Measured · portfolio extract" />
      <TemplateNotes title="1080 × 1080 · Instagram & Facebook feed square" width={1080}>
        <strong>Dark statement layout.</strong> 80px margin. Headline 82px caps —
        keep it to <strong>seven words or fewer</strong> and let it break onto three lines.
        The hero figure is the only cyan text; if there is no figure, delete the block rather than
        filling it. Outline rectangles bleed off the top and right edges — they are texture, so never
        align them to each other or to the margin.
        Signature bottom-left, index chip flush to the right edge at mid-height.{' '}
        <strong>Swap to light mode</strong> with {code('mode="light"')}: canvas #FFFFFF,
        text #3A3A3A, accent block #FFC107, the figure #3A3A3A, and the outline strokes
        charcoal — cyan strokes vanish on white at 2.30:1.
      </TemplateNotes>
    </TemplatePage>
  );
}

export function SocialPortraitPage() {
  return (
    <TemplatePage>
      <div style={{ height: 8 }} />
      <SocialPortrait exportId="social-portrait-1080x1350"
        eyebrow="Field note · 04"
        title={<>A collections book does not have<br />a contact problem.<br /><b>It has a sequencing problem.</b></>}
        body={<>We ranked 41,007 accounts by recency, frequency and
          size before a single call was placed. The same agents, the same script, a different order.</>}
        kpis={[
          { value: '+5.4', unit: 'pts', label: 'Collection rate' },
          { value: '−15%', label: 'Calls per recovery' },
          { value: '8', label: 'Months measured' },
        ]}
        spark="0,150 115,142 230,148 345,116 460,104 575,80 690,84 805,44 920,28"
        source="Measured · Example Co, Nov 2025 – Jul 2026" />
      <TemplateNotes title="1080 × 1350 (4:5) · Instagram / Facebook portrait & LinkedIn image post" width={1080}>
        <strong>Light insight layout</strong> — the counterpart to the dark square.
        Portrait is the highest-reach ratio on both Instagram and LinkedIn, so this is the default for
        anything with data in it. Headline is <strong>sentence case, Regular</strong>, with Bold on the
        single phrase that carries the argument — that mixed weight is the light-mode signature.
        Three KPI tiles maximum, hairline separators, tabular figures. The sparkline is one cyan stroke
        with a terminal dot; no axis labels, no grid, no legend — the KPI row above already carries the
        numbers. Source line bottom-left, signature bottom-right, and the source line always states
        whether the figures are measured or modelled.
      </TemplateNotes>
    </TemplatePage>
  );
}

export function SocialStoryPage() {
  return (
    <TemplatePage>
      <div style={{ height: 8 }} />
      <SocialStory exportId="social-story-1080x1920"
        eyebrow="Three lenses"
        title={<>Build.<br />Model.<br />Defend.</>}
        sub="The three-day arc every business case runs through before it reaches a board."
        steps={[
          'Syndicates draft the case in the war room.',
          'Numbers stress-tested against three lenses.',
          'Live panel challenge, then certification.',
        ]} />
      <TemplateNotes title="1080 × 1920 (9:16) · Instagram / Facebook Story · Reel cover" width={1080}>
        <strong>The dashed bands are guides, not artwork — they are hidden on export.</strong>
        {' '}Instagram overlays your profile row and progress bar in the top ~250px and the reply bar in the
        bottom ~250px, so all type and the signature live inside the middle 1420px. Background colour
        still fills the full 1920 — only <em>content</em> respects the safe area.
        Headline 94px caps, three to six words. Step boxes carry the sequence; if the story is a single
        statement, drop them and let the headline take the whole frame. A Reel cover uses this same
        component with {code('steps')} omitted, because Instagram crops the cover to 1:1 in the profile grid —
        keep anything that must survive that crop inside the centre square.
      </TemplateNotes>
    </TemplatePage>
  );
}

export function WhatsAppPage() {
  return (
    <TemplatePage>
      <div style={{ height: 8 }} />
      <WhatsAppStatus exportId="whatsapp-status-1080x1920"
        title={<>Seven in ten<br />instalment customers<br /><b>pay late, not never.</b></>}
        figure="70" figureUnit="%"
        figureLabel="Recovered within 60 days"
        cta="Full note in bio" />
      <TemplateNotes title="1080 × 1920 (9:16) · WhatsApp Status" width={1080}>
        <strong>WhatsApp eats more of the frame than Instagram does</strong> — the
        progress bar, contact name and timestamp sit in the top ~260px, and the caption strip plus the
        “Reply” swipe-up handle occupy the bottom ~320px. Content lives in the middle 1340px.
        The dashed bands are guides, hidden on export.
        <br /><br />
        <strong>Status is read in under three seconds</strong>, usually one-handed
        on a mid-range Android in daylight — so this template is light mode with one very large figure.
        Do not put a URL on a Status: it is not tappable. Use the amber CTA to point somewhere the viewer
        already is (“Full note in bio”, “Reply for the pack”), and rely on the reply thread.
        {' '}{code('npm run export')} writes a <strong>JPEG under 1 MB</strong>; WhatsApp recompresses hard, and
        flat charcoal-on-white with no gradients survives that compression cleanly.
      </TemplateNotes>
    </TemplatePage>
  );
}

/* ================================================================
   Email
   ================================================================ */

export const emailerExample = {
  preheader: 'Same agents, same script, a different order — and 5.4 points of collection rate.',
  eyebrow: 'Field note · 04 · August 2026',
  title: <>Your collections book does not have a contact problem.{' '}<b style={{ fontWeight: 700 }}>It has a sequencing problem.</b></>,
  greeting: 'Hi {{FIRST_NAME}},',
  paragraphs: [
    <>We ranked 41,007 accounts by recency, frequency and size before a
      single call was placed. Same agents. Same script. A different order.</>,
    <>Eight months later, collection rate is up 5.4 points and calls per recovery
      are down 15% — while <i>contact rate fell</i>. That last part is the interesting bit.</>,
  ],
  kpis: [
    { value: '+5.4', label: 'Collection rate' },
    { value: '−15%', label: 'Calls per recovery' },
    { value: '41,007', label: 'Accounts' },
  ] as [{ value: string; label: string }, { value: string; label: string }, { value: string; label: string }],
  source: 'Measured · Example Co, Nov 2025 – Jul 2026.',
  quote: 'Contact rate measures effort. It moves when you add dialler capacity — not when the book gets healthier.',
  cta: { label: 'Read the full field note', href: 'https://example.com/diagnostic' },
  signoff: 'Travis',
  signature: 'Travis Mulenga · Principal Consultant',
  footerAddress: 'Travis Paul Consulting Ltd · Lusaka, Zambia',
  footerReason: 'You are receiving this because you asked for the field note.',
  unsubscribeUrl: '{{UNSUBSCRIBE_URL}}',
  preferencesUrl: '{{PREFERENCES_URL}}',
};

export function EmailerPage() {
  return (
    <TemplatePage>
      <div style={{ padding: '32px 4px 44px' }}>
        <p className="tp-noexport doc-ttag" style={{ width: 600, padding: 0, margin: '0 0 12px' }}>
          600px body · table-based · Outlook / Gmail / Apple Mail safe</p>
        {/* Preview only: the local logo. renderEmail() requires a hosted https URL. */}
        <Emailer logoUrl={logoWhite} {...emailerExample} />
        <div className="tp-noexport doc-tnotes" style={{ width: 600, padding: '28px 0 0' }}>
          <p className="doc-tnotes-title">600px · email newsletter</p>
          <p className="doc-tnotes-body" style={{ lineHeight: 1.65 }}>
            <strong>Email is the one place the design system bends.</strong>{' '}
            Gmail strips {code('@font-face')}, so Poppins only renders for recipients who
            already have it installed — the stack falls back to Century Gothic, then Helvetica/Arial. That is
            expected; do not chase it with images of text.
            <br /><br />
            <strong>What is load-bearing here:</strong>{' '}
            tables with {code('role="presentation"')}, not flexbox or grid, because Outlook
            on Windows renders through Word;
            every style inline;
            600px fixed width;
            a single column;
            no background images (Outlook drops them, and the charcoal masthead must survive);
            the CTA is a padded {code('<a>')} inside a coloured{' '}
            {code('<td>')} so the whole block is tappable at 44px+;
            and the cyan button carries a <strong>charcoal</strong> label, because white on cyan is 2.30:1.
            <br /><br />
            <strong>To send:</strong> {code("renderEmail(props)")} from{' '}
            {code('@tpcl/design-system/email')} returns paste-ready HTML ({code('npm run export')} also writes{' '}
            {code('exports/emailer-600.html')}). Pass a hosted https {code('logoUrl')} — data URIs do not
            render in Gmail or Outlook and are rejected. Fill the preheader, replace{' '}
            {code('{{FIRST_NAME}}')} and both footer URLs with your ESP's merge tags, and confirm the
            source line under any figures says whether they are measured or modelled.
          </p>
        </div>
      </div>
    </TemplatePage>
  );
}
