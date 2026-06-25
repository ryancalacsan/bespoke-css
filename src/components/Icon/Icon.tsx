import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import './Icon.scss';

export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

export interface IconProps extends ComponentPropsWithoutRef<'span'> {
  /** Visual size, on the type scale. Defaults to `md`. */
  size?: IconSize;
  /**
   * Accessible name. Provide it for a meaningful icon (rendered as `img` to AT);
   * omit it for a decorative icon (hidden from AT). Decorative is the default.
   */
  label?: string;
  /** The icon itself - any SVG element. It inherits `currentColor` and the size. */
  children: ReactNode;
}

/**
 * A sizing/color wrapper for icons, so the library never depends on a specific
 * icon set. Pass any SVG as the child; it is sized to the current `font-size`
 * and inherits `currentColor`. Meaningful icons take a `label`; decorative ones
 * are hidden from assistive tech.
 */
export function Icon({
  size = 'md',
  label,
  className,
  children,
  ...rest
}: IconProps) {
  const classes = ['icon', `icon--${size}`, className]
    .filter(Boolean)
    .join(' ');

  const a11y = label
    ? { role: 'img' as const, 'aria-label': label }
    : { 'aria-hidden': true };

  return (
    <span className={classes} {...a11y} {...rest}>
      {children}
    </span>
  );
}
