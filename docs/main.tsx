import { StrictMode, useEffect, useState, type ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import '../src/styles/index.css';
import './docs.css';
import { Card, LogoMark } from '../src';
import { DocPage, Sec } from './kit';
import { ColourPage, LayoutPage, LogoPage, MotifsPage, TypographyPage } from './pages/foundations';
import { ButtonsPage, CardsPage, StatTilesPage, TableQuotePage, TimelinePage } from './pages/components';
import {
  EmailerPage, LinkedInBannersPage, LinkedInCarouselPage, LinkedInSinglePage, SlidesPage, SocialPortraitPage,
  SocialSquarePage, SocialStoryPage, WebsiteHeroPage, WebsiteSectionsPage, WhatsAppPage,
} from './pages/templates';
import { EmailSourcePage } from './pages/email-source';

interface Route { path: string; title: string; group: string; blurb: string; Page: ComponentType }

/* Paths mirror the Claude Design handoff (project/<group>/<file>.html). */
export const routes: Route[] = [
  { group: 'Foundations', path: 'foundations/colour', title: 'Colour', Page: ColourPage, blurb: 'Six tokens, two modes, measured contrast.' },
  { group: 'Foundations', path: 'foundations/typography', title: 'Typography', Page: TypographyPage, blurb: 'Poppins in three weights; the case rule.' },
  { group: 'Foundations', path: 'foundations/layout-grid', title: 'Layout & spacing', Page: LayoutPage, blurb: '8px scale, 12 columns, six archetypes.' },
  { group: 'Foundations', path: 'foundations/motifs', title: 'Motifs', Page: MotifsPage, blurb: 'The five elements of brand DNA.' },
  { group: 'Foundations', path: 'foundations/logo', title: 'Logo & lockups', Page: LogoPage, blurb: 'Cuts, placement, clear space, co-branding.' },
  { group: 'Components', path: 'components/buttons', title: 'Buttons', Page: ButtonsPage, blurb: 'Four variants, two sizes, one primary.' },
  { group: 'Components', path: 'components/cards', title: 'Cards & panels', Page: CardsPage, blurb: 'Depth from tone, never elevation.' },
  { group: 'Components', path: 'components/stat-tiles', title: 'Stat tiles & KPI row', Page: StatTilesPage, blurb: 'Figures, deltas and provenance.' },
  { group: 'Components', path: 'components/table-quote', title: 'Tables, quotes & tags', Page: TableQuotePage, blurb: 'The workhorses.' },
  { group: 'Components', path: 'components/timeline', title: 'Timeline & steps', Page: TimelinePage, blurb: 'Anything sequential.' },
  { group: 'Templates', path: 'templates/slide-16x9', title: 'Slide masters 16:9', Page: SlidesPage, blurb: 'Cover, split, content, statement.' },
  { group: 'Templates', path: 'templates/website-hero', title: 'Website hero', Page: WebsiteHeroPage, blurb: '7/5 split — claim and proof.' },
  { group: 'Templates', path: 'templates/website-sections', title: 'Website sections', Page: WebsiteSectionsPage, blurb: 'Services, statement, proof, CTA, footer.' },
  { group: 'Templates', path: 'templates/linkedin-banner-1584x396', title: 'LinkedIn banners', Page: LinkedInBannersPage, blurb: 'Personal 1584×396, company 1128×191.' },
  { group: 'Templates', path: 'templates/linkedin-carousel-1080x1350', title: 'LinkedIn carousel', Page: LinkedInCarouselPage, blurb: 'Dark cover → light content → dark CTA.' },
  { group: 'Templates', path: 'templates/linkedin-single-1200x627', title: 'LinkedIn single image', Page: LinkedInSinglePage, blurb: '1.91:1 split; doubles as OG image.' },
  { group: 'Templates', path: 'templates/social-square-1080', title: 'Social square', Page: SocialSquarePage, blurb: 'Dark statement, 1080×1080.' },
  { group: 'Templates', path: 'templates/social-portrait-1080x1350', title: 'Social portrait', Page: SocialPortraitPage, blurb: 'Light insight, 1080×1350.' },
  { group: 'Templates', path: 'templates/social-story-1080x1920', title: 'Story / Reel cover', Page: SocialStoryPage, blurb: '1080×1920 with safe zones.' },
  { group: 'Templates', path: 'templates/whatsapp-status-1080x1920', title: 'WhatsApp Status', Page: WhatsAppPage, blurb: 'One figure, read in three seconds.' },
  { group: 'Templates', path: 'templates/emailer-600', title: 'Email 600px', Page: EmailerPage, blurb: 'Tables, inline styles, charcoal CTA label.' },
];

const hidden: Route[] = [
  { group: 'Export', path: 'export/email-source', title: 'Email source', Page: EmailSourcePage, blurb: '' },
];

const groups = ['Foundations', 'Components', 'Templates'] as const;

function Home() {
  return (
    <DocPage className="pg-home" title="TPCL design system" lede={<>Travis Paul Consulting Ltd · v1.0. A two-mode system:
      charcoal carries openers and statements in Bold caps with a cyan accent; white carries content and data
      in Regular sentence case with an amber accent. Poppins in three weights, square corners, no shadows, and
      every figure states whether it is measured or modelled.</>}>
      {groups.map((g) => (
        <Sec key={g} title={g}>
          <div className="doc-cards">
            {routes.filter((r) => r.group === g).map((r) => (
              <a key={r.path} href={`#/${r.path}`}>
                <Card style={{ height: '100%' }}>
                  <h3 className="tp-h3" style={{ margin: '0 0 6px' }}>{r.title}</h3>
                  <p className="tp-note" style={{ margin: 0 }}>{r.blurb}</p>
                </Card>
              </a>
            ))}
          </div>
        </Sec>
      ))}
      <Sec title="Quick checklist before anything ships">
        <ol className="tp-note doc-rules rules-spaced" style={{ maxWidth: '70ch' }}>
          <li>Two to three motifs present, accent block at the top-left, logo diagonally opposite.</li>
          <li>Case rule respected — caps on charcoal, sentence case on white.</li>
          <li>No divider line where a dark and light block meet.</li>
          <li>Cyan/amber used as text only on charcoal; charcoal labels on cyan/amber fills.</li>
          <li>Square corners, no shadows, no gradients.</li>
          <li>Every figure has provenance, and every total reconciles.</li>
          <li>Signature bottom-left on dark, bottom-right on light.</li>
        </ol>
      </Sec>
    </DocPage>
  );
}

function parseHash(): { path: string; bare: boolean } {
  const raw = window.location.hash.replace(/^#\/?/, '');
  const [path, query = ''] = raw.split('?');
  return { path: path ?? '', bare: new URLSearchParams(query).has('export') };
}

function App() {
  const [loc, setLoc] = useState(parseHash);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const on = () => { setLoc(parseHash()); setMenuOpen(false); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);

  const route = [...routes, ...hidden].find((r) => r.path === loc.path);
  const Page = route?.Page ?? Home;

  useEffect(() => {
    document.title = route ? `TPCL · ${route.title}` : 'TPCL Design System';
    // Export mode: hide guides (.tp-noexport) and drop the docs chrome.
    document.body.classList.toggle('tp-export', loc.bare);
  }, [route, loc.bare]);

  if (loc.bare) {
    return <main className="doc-bare"><Page /></main>;
  }

  return (
    <div className={`doc-shell${menuOpen ? ' is-open' : ''}`}>
      <div className="doc-menu tp-dark">
        <LogoMark cut="white" height={28} />
        <button type="button" className="tp-btn tp-btn--ghost tp-btn--sm" aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}>{menuOpen ? 'Close' : 'Menu'}</button>
      </div>
      <nav className="doc-side" aria-label="Design system">
        <a href="#/" aria-label="Overview" style={{ padding: 0, border: 0 }}><LogoMark cut="white" height={44} /></a>
        {groups.map((g) => (
          <div key={g}>
            <h2>{g}</h2>
            {routes.filter((r) => r.group === g).map((r) => (
              <a key={r.path} href={`#/${r.path}`} aria-current={r.path === loc.path ? 'page' : undefined}>{r.title}</a>
            ))}
          </div>
        ))}
        <p className="doc-ver">@tpcl/design-system · v1.0</p>
      </nav>
      <main className="doc-main"><Page /></main>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
