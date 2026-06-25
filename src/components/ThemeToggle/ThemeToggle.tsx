'use client';

import { useEffect, useState } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import './ThemeToggle.scss';

type Theme = 'light' | 'dark';

export interface ThemeToggleProps extends Omit<
  ComponentPropsWithoutRef<'button'>,
  'children'
> {
  /** localStorage key the choice is persisted under. Defaults to `theme`. */
  storageKey?: string;
  /** Label shown in the light theme. Defaults to `Light`. */
  lightLabel?: string;
  /** Label shown in the dark theme. Defaults to `Dev`. */
  darkLabel?: string;
}

/**
 * Toggles `data-theme` on the document between light and dark, persisting the
 * choice. It reads the real theme only after mount, so server and first client
 * render match (no hydration mismatch); pair it with an inline script that sets
 * `data-theme` before paint to avoid a flash.
 */
export function ThemeToggle({
  storageKey = 'theme',
  lightLabel = 'Light',
  darkLabel = 'Dev',
  className,
  ...rest
}: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setMounted(true);
    const current = document.documentElement.dataset.theme as Theme | undefined;
    setTheme(
      current ??
        (window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'),
    );
  }, []);

  function toggle() {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem(storageKey, next);
      } catch {
        // storage may be unavailable (private mode); the toggle still works.
      }
      return next;
    });
  }

  const isDark = theme === 'dark';
  const classes = ['theme-toggle', className].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={classes}
      aria-pressed={mounted ? isDark : undefined}
      aria-label="Dark theme"
      onClick={toggle}
      {...rest}
    >
      <span className="theme-toggle__label">
        {isDark ? darkLabel : lightLabel}
      </span>
    </button>
  );
}
