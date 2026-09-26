import type { HTMLAttributes, ReactNode } from 'react';
import { cx, len } from '../utils';

export interface CanvasProps extends HTMLAttributes<HTMLDivElement> {
  width: number;
  height: number;
  /** Stable id the export script uses to name the output file. */
  exportId?: string;
  children?: ReactNode;
}

/**
 * Fixed-size frame for social, LinkedIn, story and slide artwork. Background
 * fills the whole frame; content respects the margin and safe zones.
 * Anything marked `.tp-noexport` is hidden when an ancestor has `.tp-export`.
 */
export function Canvas({ width, height, exportId, className, style, children, ...rest }: CanvasProps) {
  return (
    <div
      {...rest}
      data-export={exportId}
      data-export-size={`${width}x${height}`}
      className={cx('tp-canvas', className)}
      style={{ width, height, ...style }}
    >
      {children}
    </div>
  );
}

export interface SafeZoneProps {
  edge: 'top' | 'bottom';
  size: number;
  label: ReactNode;
  /** Brighter cyan label for charcoal canvases. */
  onDark?: boolean;
}

/** Platform-chrome guide band (Instagram/WhatsApp). Visual aid only — hidden on export. */
export function SafeZone({ edge, size, label, onDark }: SafeZoneProps) {
  return (
    <div className={cx('tp-noexport tp-zone', onDark && 'tp-zone--on-dark')} style={{ [edge]: 0, height: size }}>
      <span>{label}</span>
    </div>
  );
}

export interface KeepOutProps {
  left: number; top: number; size: number;
  square?: boolean;
  children: ReactNode;
}

/** Avatar / page-logo keep-out marker for LinkedIn banners. Hidden on export. */
export function KeepOut({ left, top, size, square, children }: KeepOutProps) {
  return (
    <span className={cx('tp-noexport tp-keepout', square && 'tp-keepout--square')}
      style={{ left: len(left), top: len(top), width: len(size), height: len(size) }}>
      <span>{children}</span>
    </span>
  );
}
