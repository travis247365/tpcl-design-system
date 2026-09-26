import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../utils';

export type CardVariant = 'default' | 'accent' | 'panel' | 'dark';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * default = hairline on white · accent = 3px cyan left rule (one per section) ·
   * panel = blue-gray, charcoal text · dark = charcoal-soft on dark pages.
   */
  variant?: CardVariant;
  children?: ReactNode;
}

/** Square, no shadow. Depth comes from tone, never elevation. Padding 24 (32 for long cards). */
export function Card({ variant = 'default', className, children, ...rest }: CardProps) {
  return (
    <div {...rest} className={cx('tp-card', variant !== 'default' && `tp-card--${variant}`, className)}>
      {children}
    </div>
  );
}
