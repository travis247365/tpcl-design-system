import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../utils';

export type SurfaceMode = 'light' | 'dark' | 'panel' | 'deep';

export interface SurfaceProps extends HTMLAttributes<HTMLElement> {
  /** light = white · dark = charcoal · panel = blue-gray · deep = charcoal-deep. */
  mode: SurfaceMode;
  as?: ElementType;
  children?: ReactNode;
}

const modeClass: Record<SurfaceMode, string> = {
  light: 'tp-light',
  dark: 'tp-dark',
  panel: 'tp-panel',
  deep: 'tp-dark tp-deep',
};

/** A mode surface. Descendant motifs and components pick their accent from it. */
export function Surface({ mode, as: Tag = 'div', className, children, ...rest }: SurfaceProps) {
  return <Tag {...rest} className={cx(modeClass[mode], className)}>{children}</Tag>;
}

export interface SplitProps extends HTMLAttributes<HTMLDivElement> {
  dark: ReactNode;
  panel: ReactNode;
  darkClassName?: string;
  panelClassName?: string;
}

/**
 * 50/50 dark / blue-gray split. The two blocks meet directly — there is NO
 * divider line. That is the most commonly mis-built rule in the system.
 */
export function Split({ dark, panel, darkClassName, panelClassName, className, ...rest }: SplitProps) {
  return (
    <div {...rest} className={cx('tp-split', className)}>
      <div className={cx('tp-split-dark tp-dark', darkClassName)}>{dark}</div>
      <div className={cx('tp-split-panel', panelClassName)}>{panel}</div>
    </div>
  );
}
