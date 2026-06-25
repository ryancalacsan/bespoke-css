'use client';

import { useEffect, useState } from 'react';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import './AppHeader.scss';

export interface AppHeaderProps extends ComponentPropsWithoutRef<'header'> {
  /** Element to render. Defaults to a `header`. */
  as?: ElementType;
  /** Stick to the top of the viewport. Defaults to `true`. */
  sticky?: boolean;
  /** Scroll px after which the header condenses (glass + shadow). Defaults to `8`. */
  condenseAfter?: number;
  children?: ReactNode;
}

/**
 * A page header shell. When sticky, it condenses to a translucent glass bar with
 * a shadow once the page scrolls, so it stays legible over content.
 */
export function AppHeader({
  as: Tag = 'header',
  sticky = true,
  condenseAfter = 8,
  className,
  children,
  ...rest
}: AppHeaderProps) {
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    if (!sticky) return;
    const onScroll = () => setCondensed(window.scrollY > condenseAfter);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sticky, condenseAfter]);

  const classes = [
    'app-header',
    sticky && 'app-header--sticky',
    sticky && condensed && 'app-header--condensed',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
