import { useRef } from 'react';

/**
 * Type-ahead matching for a listbox. As the user types, characters accumulate
 * into a short buffer that resets after a pause, and we return the index of the
 * first enabled option whose label starts with the buffer. Typing the same
 * letter repeatedly cycles through options that start with it, which is the
 * behavior a native <select> has.
 */
export function useTypeahead<T>(
  items: T[],
  getLabel: (item: T) => string,
  isDisabled: (item: T) => boolean,
) {
  const buffer = useRef('');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function match(char: string, fromIndex: number): number | null {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      buffer.current = '';
    }, 500);

    const isRepeat =
      buffer.current.length === 1 && buffer.current === char.toLowerCase();
    buffer.current += char.toLowerCase();

    const query = buffer.current;

    // On a repeated single key, step to the next match after the current item.
    const start = isRepeat ? fromIndex + 1 : fromIndex;
    const ordered = items.map((_, i) => (start + i) % items.length);

    for (const i of ordered) {
      const item = items[i];
      if (isDisabled(item)) continue;
      if (getLabel(item).toLowerCase().startsWith(query)) {
        return i;
      }
    }
    return null;
  }

  return match;
}
