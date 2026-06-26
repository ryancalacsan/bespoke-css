import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import './SkipLink.scss';

export interface SkipLinkProps extends ComponentPropsWithoutRef<'a'> {
  /** Fragment to jump to. Defaults to `#main`. */
  href?: string;
  children?: ReactNode;
}

/**
 * A skip-to-content link: hidden until focused, then it appears at the top-left
 * so keyboard users can jump past the chrome. Put it first in the document and
 * point it at your main landmark's id.
 */
export function SkipLink({
  href = '#main',
  className,
  children = 'Skip to content',
  ...rest
}: SkipLinkProps) {
  const classes = ['skip-link', className].filter(Boolean).join(' ');

  return (
    <a className={classes} href={href} {...rest}>
      {children}
    </a>
  );
}
