import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import './Badge.scss';

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'danger';

export interface BadgeProps extends ComponentPropsWithoutRef<'span'> {
  /** Color role. Defaults to `neutral`. */
  tone?: BadgeTone;
  children?: ReactNode;
}

/**
 * A small status or category label - an outline pill in the mono voice. Its
 * border tracks the text color, so every tone reads as a tidy chip.
 */
export function Badge({
  tone = 'neutral',
  className,
  children,
  ...rest
}: BadgeProps) {
  const classes = ['badge', `badge--${tone}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}
