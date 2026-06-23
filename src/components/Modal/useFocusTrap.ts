import { useEffect, type RefObject } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter((el) => el.offsetParent !== null || el === document.activeElement);
}

/**
 * Keep keyboard focus inside `containerRef` while `active` is true.
 *
 * On activate it remembers what was focused, moves focus into the dialog
 * (preferring `initialFocusRef`, then the first focusable child, then the
 * container itself), and loops Tab / Shift+Tab at the edges. On deactivate it
 * returns focus to wherever the user was before the dialog opened, which is the
 * behavior screen reader and keyboard users expect.
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
  initialFocusRef?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Move focus into the dialog on the next frame so the content has rendered.
    const focusables = getFocusable(container);
    const target = initialFocusRef?.current ?? focusables[0] ?? container;
    target.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Tab') return;

      const items = getFocusable(container as HTMLElement);
      if (items.length === 0) {
        // Nothing to tab to: keep focus on the container.
        event.preventDefault();
        (container as HTMLElement).focus();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const activeEl = document.activeElement;

      if (event.shiftKey && activeEl === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeEl === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore focus to the trigger element when the trap releases.
      previouslyFocused?.focus?.();
    };
  }, [active, containerRef, initialFocusRef]);
}
