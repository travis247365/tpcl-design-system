import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../utils';

export type ButtonVariant = 'primary' | 'secondary' | 'solid' | 'ghost';

interface BaseProps {
  /**
   * primary = cyan · secondary = amber · solid = charcoal · ghost = outline.
   * Cyan and amber always carry charcoal labels (white on cyan is 2.30:1 and fails).
   * Solid has no job on charcoal — use ghost there. One primary per surface.
   */
  variant?: ButtonVariant;
  size?: 'md' | 'sm';
  children: ReactNode;
}

type AsAnchor = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type AsButton = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
export type ButtonProps = AsAnchor | AsButton;

/** Verb + object, sentence case, no full stop: “Book a diagnostic”. */
export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children } = props;
  const cls = cx('tp-btn', `tp-btn--${variant}`, size === 'sm' && 'tp-btn--sm', className);
  if (props.href !== undefined) {
    const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props as AsAnchor;
    return <a {...rest} className={cls}>{children}</a>;
  }
  const { variant: _v, size: _s, className: _c, children: _ch, type = 'button', ...rest } = props as AsButton;
  return <button type={type} {...rest} className={cls}>{children}</button>;
}

/** Trailing arrow sized as in the prototypes. */
export function Arrow({ size = 17 }: { size?: number }) {
  return <span aria-hidden="true" style={{ fontSize: size, lineHeight: 0 }}>→</span>;
}
