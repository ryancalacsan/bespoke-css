import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import './Callout.scss';

export type CalloutTone = 'note' | 'accent' | 'success' | 'danger';

export interface CalloutProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'title'
> {
  /** Color of the leading rule and icon. Defaults to `note`. */
  tone?: CalloutTone;
  /** Optional heading line. */
  title?: ReactNode;
  /** Optional leading icon (decorative). */
  icon?: ReactNode;
  children?: ReactNode;
}

/**
 * A bordered note for a key result or aside, with a colored leading rule. The
 * Spec Sheet's margin annotation, scaled up to a block.
 */
export function Callout({
  tone = 'note',
  title,
  icon,
  className,
  children,
  ...rest
}: CalloutProps) {
  const classes = ['callout', `callout--${tone}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      {icon && (
        <span className="callout__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <div className="callout__body">
        {title && <p className="callout__title">{title}</p>}
        {children && <div className="callout__content">{children}</div>}
      </div>
    </div>
  );
}
