import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../utils';

export type TextVariant =
  | 'display'   // 60 / 1.02 / 700 · UPPERCASE — dark surfaces only
  | 'title'     // 44 / 1.12 / 400 · sentence case — light surfaces
  | 'h2'        // 28 / 1.2 / 700
  | 'h3'        // 20 / 1.3 / 500
  | 'body-lg'   // 18 / 1.6
  | 'body'      // 16 / 1.6
  | 'caption'   // 13 / 1.45
  | 'eyebrow'   // 12 / 1 / 500 · UPPERCASE +.16em
  | 'micro'     // 11 / 1.4
  | 'num'       // 700 · tabular
  | 'note';     // 13 / 1.55 muted — doc/support copy

const defaultTag: Record<TextVariant, ElementType> = {
  display: 'h1', title: 'h1', h2: 'h2', h3: 'h3',
  'body-lg': 'p', body: 'p', caption: 'p', eyebrow: 'p', micro: 'p', num: 'span', note: 'p',
};

export interface TextProps extends HTMLAttributes<HTMLElement> {
  variant: TextVariant;
  as?: ElementType;
  /** Secondary tone for the current surface (ink-muted on white, 66% white on charcoal). */
  muted?: boolean;
  children?: ReactNode;
}

/**
 * The type scale. The case rule is the system: caps on charcoal signals a break,
 * sentence case on white signals substance. In light mode, set the phrase that
 * carries the argument in <b> inside an otherwise Regular title.
 */
export function Text({ variant, as, muted, className, children, ...rest }: TextProps) {
  const Tag = as ?? defaultTag[variant];
  return (
    <Tag {...rest} className={cx(`tp-${variant}`, muted && 'tp-muted', className)}>
      {children}
    </Tag>
  );
}
