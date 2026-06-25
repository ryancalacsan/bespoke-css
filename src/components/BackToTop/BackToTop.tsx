'use client';

import { useEffect, useState } from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import './BackToTop.scss';

export interface BackToTopProps extends Omit<
  ComponentPropsWithoutRef<'button'>,
  'children'
> {
  /** Scroll distance (px) past which the button appears. Defaults to `400`. */
  threshold?: number;
  /** Accessible label. Defaults to `Back to top`. */
  label?: string;
  /** Visible content. Defaults to an up arrow. */
  children?: ReactNode;
}

/**
 * A floating button that scrolls back to the top, revealed once the page is
 * scrolled past a threshold. Respects reduced motion.
 */
export function BackToTop({
  threshold = 400,
  label = 'Back to top',
  className,
  children = '↑',
  ...rest
}: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  function toTop() {
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }

  const classes = ['back-to-top', visible && 'back-to-top--visible', className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classes}
      aria-label={label}
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      onClick={toTop}
      {...rest}
    >
      <span aria-hidden="true">{children}</span>
    </button>
  );
}
