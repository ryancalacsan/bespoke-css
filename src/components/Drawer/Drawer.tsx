'use client';

import { useEffect, useId, useRef } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '../Modal/useFocusTrap';
import { useScrollLock } from '../Modal/useScrollLock';
import './Drawer.scss';

export type DrawerSide = 'left' | 'right';

export interface DrawerProps {
  /** Whether the drawer is open. */
  isOpen: boolean;
  /** Called on Escape, scrim click, or the close button. */
  onClose: () => void;
  /** Which edge the drawer slides in from. Defaults to `right`. */
  side?: DrawerSide;
  /** Optional heading; also names the dialog. */
  title?: ReactNode;
  /** Accessible name when there is no visible `title`. Defaults to `Menu`. */
  label?: string;
  children?: ReactNode;
}

/**
 * A focus-trapped side drawer, for mobile navigation and the like. It traps Tab
 * inside the panel, closes on Escape or a scrim press, locks background scroll,
 * restores focus to the trigger on close, and respects reduced motion. Built on
 * the same hooks as Modal.
 */
export function Drawer({
  isOpen,
  onClose,
  side = 'right',
  title,
  label = 'Menu',
  children,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useFocusTrap(panelRef, isOpen);
  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="drawer__overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className={`drawer drawer--${side}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : label}
        tabIndex={-1}
      >
        <header className="drawer__header">
          {title ? (
            <h2 id={titleId} className="drawer__title">
              {title}
            </h2>
          ) : (
            <span />
          )}
          <button
            type="button"
            className="drawer__close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg
              className="drawer__close-icon"
              viewBox="0 0 20 20"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        <div className="drawer__body">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
