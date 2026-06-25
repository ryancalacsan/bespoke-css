import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import './Stat.scss';

export interface StatProps extends ComponentPropsWithoutRef<'div'> {
  /** The small uppercase label. */
  label: ReactNode;
  /** The figure, set large in the display face. */
  value: ReactNode;
  /** Tint the value with the signal color. */
  accent?: boolean;
}

/**
 * A spec readout: a small mono label over a large display value. Line a few up
 * with an `Inline` or `Grid` for the "08 / 02 / AA" strip.
 */
export function Stat({
  label,
  value,
  accent = false,
  className,
  ...rest
}: StatProps) {
  const classes = ['stat', className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      <span className="stat__label">{label}</span>
      <span className={`stat__value${accent ? ' stat__value--accent' : ''}`}>
        {value}
      </span>
    </div>
  );
}
