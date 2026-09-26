import type { CSSProperties } from 'react';

/** Join class names, dropping falsy entries. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/** Style object that also accepts CSS custom properties. */
export type StyleWithVars = CSSProperties & Record<`--${string}`, string | number>;

/** Numeric length → CSS length; strings pass through untouched. */
export function len(v: number | string | undefined): string | undefined {
  return typeof v === 'number' ? `${v}px` : v;
}
