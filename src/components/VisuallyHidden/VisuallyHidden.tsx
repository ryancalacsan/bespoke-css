import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import './VisuallyHidden.scss';

export interface VisuallyHiddenProps extends ComponentPropsWithoutRef<'span'> {
  /** Element to render. Defaults to a `span`. */
  as?: ElementType;
  children?: ReactNode;
}

/**
 * Hides content visually while keeping it available to assistive tech - for
 * labels conveyed some other way visually, or status text. The standard,
 * battle-tested clip technique.
 */
export function VisuallyHidden({
  as: Tag = 'span',
  className,
  children,
  ...rest
}: VisuallyHiddenProps) {
  const classes = ['visually-hidden', className].filter(Boolean).join(' ');

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
