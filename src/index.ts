/**
 * @tpcl/design-system — Travis Paul Consulting Ltd · v1.0
 *
 *   import '@tpcl/design-system/styles.css';   // once, at the app root
 *   import { Button, KpiRow, Stat, SlideContent } from '@tpcl/design-system';
 *
 * The email renderer lives at '@tpcl/design-system/email' so browser bundles
 * do not pull in react-dom/server.
 */

export * as tokens from './tokens';
export type { Provenance, Tone } from './tokens';
export { cx } from './utils';

// Motifs
export {
  AccentBlock, IndexChip, OutlineRect, OutlineCard, Timeline, HorizontalTimeline, Step, LogoMark,
} from './components/motifs';
export type {
  AccentBlockProps, IndexChipProps, OutlineRectProps, OutlineCardProps, TimelineItem, TimelineProps,
  HorizontalTimelineProps, StepProps, LogoCut, LogoMarkProps,
} from './components/motifs';

// Type & surfaces
export { Text } from './components/Text';
export type { TextProps, TextVariant } from './components/Text';
export { Surface, Split } from './components/Surface';
export type { SurfaceProps, SurfaceMode, SplitProps } from './components/Surface';

// Components
export { Button, Arrow } from './components/Button';
export type { ButtonProps, ButtonVariant } from './components/Button';
export { Card } from './components/Card';
export type { CardProps, CardVariant } from './components/Card';
export {
  Delta, ProvenanceChip, Stat, KpiRow, Sparkline, SparkPath, Bars, Table, Quote, Tag, Rule,
} from './components/data';
export type {
  DeltaProps, ProvenanceChipProps, StatProps, KpiRowProps, SparklineProps, Column, TableProps, QuoteProps,
  TagProps, TagTone,
} from './components/data';
export { Canvas, SafeZone, KeepOut } from './components/Canvas';
export type { CanvasProps, SafeZoneProps, KeepOutProps } from './components/Canvas';

// Templates
export { SlideCover, SlideSplit, SlideContent, SlideStatement } from './templates/slides';
export type {
  SlideCoverProps, SlideSplitProps, SlideSplitStep, SlideContentProps, SlideStatementProps,
} from './templates/slides';
export {
  SiteFrame, SiteNav, WebsiteHero, ServicesSection, StatementSection, ProofSection, CtaBand, SiteFooter,
} from './templates/website';
export type {
  SiteFrameProps, SiteNavProps, NavLink, Cta, WebsiteHeroProps, HeroStat, ServicesSectionProps, Service,
  StatementSectionProps, ProofSectionProps, Engagement, CtaBandProps, SiteFooterProps, FooterColumn,
} from './templates/website';
export {
  LinkedInBanner, LinkedInCompanyCover, LinkedInSingle, CarouselCover, CarouselContent, CarouselCta,
} from './templates/linkedin';
export type {
  LinkedInBannerProps, LinkedInCompanyCoverProps, LinkedInSingleProps, CarouselCoverProps,
  CarouselContentProps, CarouselCtaProps, CarouselFigure,
} from './templates/linkedin';
export { SocialSquare, SocialPortrait, SocialStory, WhatsAppStatus } from './templates/social';
export type {
  SocialSquareProps, SocialPortraitProps, PortraitKpi, SocialStoryProps, WhatsAppStatusProps,
} from './templates/social';
export { Emailer } from './templates/Emailer';
export type { EmailerProps, EmailKpi } from './templates/Emailer';
