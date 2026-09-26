import type { ReactNode } from 'react';
import { AccentBlock, IndexChip, LogoMark, OutlineRect } from '../components/motifs';
import { Button } from '../components/Button';
import { Table, Tag, type Column } from '../components/data';
import type { Provenance } from '../tokens';
import { cx } from '../utils';

/*
 * Website — 1440 frame, 1200 content, 48 margin. The page alternates mode:
 * light → dark → light → blue-gray → charcoal. That rhythm is the structure.
 */

export interface NavLink { label: ReactNode; href: string; current?: boolean }
export interface Cta { label: ReactNode; href: string }

export interface SiteFrameProps {
  /** Lock to the 1440 desktop frame (docs / export). Otherwise fluid + responsive. */
  fixed?: boolean;
  children: ReactNode;
  className?: string;
}

export function SiteFrame({ fixed, children, className }: SiteFrameProps) {
  return <div className={cx('tpw-frame', fixed && 'tpw-frame--fixed', className)}>{children}</div>;
}

export interface SiteNavProps {
  links: NavLink[];
  /** The one primary action on the page. */
  cta: Cta;
  homeHref?: string;
}

/** Charcoal bar so the hero's dark block runs into it as one mass — no border between. */
export function SiteNav({ links, cta, homeHref = '/' }: SiteNavProps) {
  return (
    <nav className="tpw-nav tp-dark" aria-label="Primary">
      <a href={homeHref} aria-label="Travis Paul Consulting — home" style={{ marginRight: 'auto' }}>
        <LogoMark cut="white" height={34} />
      </a>
      {links.map((l, i) => (
        <a key={i} href={l.href} aria-current={l.current ? 'page' : undefined}>{l.label}</a>
      ))}
      <Button variant="primary" size="sm" href={cta.href}>{cta.label}</Button>
    </nav>
  );
}

export interface HeroStat { value: ReactNode; label: ReactNode }

export interface WebsiteHeroProps {
  eyebrow: ReactNode;
  title: ReactNode;
  lede: ReactNode;
  primary: Cta;
  secondary?: Cta;
  proofEyebrow?: ReactNode;
  /** Measured figures only. Modelled numbers belong on the engagement page. */
  proof: HeroStat[];
  chip?: ReactNode;
}

/** 7/5 split, not 6/6. Charcoal carries the claim, blue-gray carries the proof. */
export function WebsiteHero({ eyebrow, title, lede, primary, secondary, proofEyebrow = 'Recent, measured', proof, chip = '01' }: WebsiteHeroProps) {
  return (
    <section className="tpw-hero">
      <div className="tpw-hero-l tp-dark">
        <AccentBlock dark />
        <p className="tp-eyebrow">{eyebrow}</p>
        <h1 className="tpw-h1">{title}</h1>
        <p className="tpw-lede">{lede}</p>
        <div className="tpw-actions">
          <Button variant="primary" href={primary.href}>{primary.label}</Button>
          {secondary && <Button variant="ghost" href={secondary.href}>{secondary.label}</Button>}
        </div>
        <OutlineRect className="tpw-texture" width={180} height={120} right={-60} top={40} opacity={0.45} />
      </div>
      <div className="tpw-hero-r tp-panel">
        <p className="tp-eyebrow">{proofEyebrow}</p>
        <div className="tpw-proof">
          {proof.map((s, i) => (
            <div key={i} style={{ display: 'contents' }}>
              {i > 0 && <div className="tpw-proof-rule" />}
              <div>
                <div className="tpw-stat">{s.value}</div>
                <div className="tpw-statl">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
        {chip && <IndexChip edge inverse>{chip}</IndexChip>}
      </div>
    </section>
  );
}

export interface Service { title: ReactNode; body: ReactNode }

export interface ServicesSectionProps {
  eyebrow: ReactNode;
  title: ReactNode;
  services: Service[];
  id?: string;
}

/** Light, 3-up, cyan top rules. A top rule reads as a document; a bordered grid reads as SaaS. */
export function ServicesSection({ eyebrow, title, services, id }: ServicesSectionProps) {
  return (
    <section className="tpw-sec tp-light" id={id}>
      <div className="tpw-inner">
        <AccentBlock />
        <p className="tp-eyebrow">{eyebrow}</p>
        <h2 className="tpw-h2">{title}</h2>
        <div className="tpw-svc">
          {services.map((s, i) => (
            <div key={i}>
              <h3 className="tp-h2">{s.title}</h3>
              <p className="tp-body">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export interface StatementSectionProps {
  /** The only caps on the site. One idea, about twenty words. */
  statement: ReactNode;
  body?: ReactNode;
  id?: string;
}

/** Dark full-bleed. No data, no buttons, no links. */
export function StatementSection({ statement, body, id }: StatementSectionProps) {
  return (
    <section className="tpw-sec tpw-statement tp-dark" id={id}>
      <OutlineRect className="tpw-texture" width={280} height={180} top={-50} right={180} opacity={0.5} />
      <OutlineRect className="tpw-texture" width={120} height={120} bottom={-40} right={60} opacity={0.35} />
      <div className="tpw-inner">
        <AccentBlock dark />
        <p className="tp-display">{statement}</p>
        {body && <p className="tp-body-lg">{body}</p>}
      </div>
    </section>
  );
}

export interface Engagement {
  engagement: ReactNode;
  lens: ReactNode;
  outcome: ReactNode;
  provenance: Provenance;
  [key: string]: unknown;
}

export interface ProofSectionProps {
  eyebrow: ReactNode;
  title: ReactNode;
  /** Client marks: an image URL, or text placeholder. Single grey tone. */
  clients: Array<{ name: string; logo?: string }>;
  engagements: Engagement[];
  id?: string;
}

const provTag = {
  measured: <Tag tone="cyan">Measured</Tag>,
  modelled: <Tag tone="panel">Modelled</Tag>,
  assumed: <Tag>Assumed</Tag>,
};

/** Every outcome figure carries a provenance tag. */
export function ProofSection({ eyebrow, title, clients, engagements, id }: ProofSectionProps) {
  const columns: Column<Engagement>[] = [
    { key: 'engagement', header: 'Engagement' },
    { key: 'lens', header: 'Persona lens' },
    { key: 'outcome', header: 'Outcome', numeric: true },
    { key: 'provenance', header: 'Provenance', render: (r) => provTag[r.provenance] },
  ];
  return (
    <section className="tpw-sec tp-light" id={id}>
      <div className="tpw-inner">
        <AccentBlock />
        <p className="tp-eyebrow">{eyebrow}</p>
        <h2 className="tpw-h2">{title}</h2>
        <div className="tpw-logos">
          {clients.map((c, i) => (
            <div key={i}>{c.logo ? <img src={c.logo} alt={c.name} /> : c.name}</div>
          ))}
        </div>
        <Table className="tpw-proof-table" columns={columns} rows={engagements} />
      </div>
    </section>
  );
}

export interface CtaBandProps {
  title: ReactNode;
  body?: ReactNode;
  cta: Cta;
  id?: string;
}

/** Blue-gray band; the solid charcoal button is the action. */
export function CtaBand({ title, body, cta, id }: CtaBandProps) {
  return (
    <section className="tpw-sec tpw-cta tp-panel" id={id}>
      <div className="tpw-inner">
        <div>
          <h2 className="tpw-h2">{title}</h2>
          {body && <p className="tp-body">{body}</p>}
        </div>
        <Button variant="solid" href={cta.href}>{cta.label}</Button>
      </div>
    </section>
  );
}

export interface FooterColumn { heading: ReactNode; links: NavLink[] }

export interface SiteFooterProps {
  blurb: ReactNode;
  columns: FooterColumn[];
  legal: ReactNode;
}

/** Charcoal-deep footer, white signature bottom-left. */
export function SiteFooter({ blurb, columns, legal }: SiteFooterProps) {
  return (
    <footer className="tpw-sec tpw-footer tp-dark tp-deep">
      <div className="tpw-inner">
        <div className="tpw-footcols">
          <div>
            <LogoMark cut="white" height={44} />
            <p className="tp-note">{blurb}</p>
          </div>
          {columns.map((c, i) => (
            <div key={i}>
              <p className="tpw-fh">{c.heading}</p>
              {c.links.map((l, j) => <a key={j} href={l.href}>{l.label}</a>)}
            </div>
          ))}
        </div>
        <div className="tp-rule" />
        <p className="tp-micro">{legal}</p>
      </div>
    </footer>
  );
}
