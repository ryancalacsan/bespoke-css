import { cloneElement, isValidElement } from 'react';
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';
import { mergeProps } from '../mergeProps';
import './Link.scss';

export type LinkUnderline = 'always' | 'hover';

export interface LinkProps extends ComponentPropsWithoutRef<'a'> {
  /** Underline treatment. Defaults to `always`. */
  underline?: LinkUnderline;
  /**
   * Render as the single child element instead of an `<a>` - for framework
   * `<Link>`s. The link styling merges onto the child.
   */
  asChild?: boolean;
  children?: ReactNode;
}

/**
 * A text link in the accent color, with a clear focus ring. `asChild` hands the
 * styling to a framework `<Link>` while keeping the look.
 */
export function Link({
  underline = 'always',
  asChild = false,
  className,
  children,
  ...rest
}: LinkProps) {
  const classes = ['link', `link--${underline}`, className]
    .filter(Boolean)
    .join(' ');

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ children?: ReactNode }>;
    const merged = mergeProps(
      { className: classes, ...rest },
      child.props as Record<string, unknown>,
    );
    return cloneElement(child, merged);
  }

  return (
    <a className={classes} {...rest}>
      {children}
    </a>
  );
}
