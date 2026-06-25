// Merge a parent component's props onto a child element's props, for the
// `asChild` pattern (render-as-child). className concatenates, style merges,
// event handlers chain (child first, then parent), and everything else takes
// the child's value when present, the parent's otherwise.
type AnyProps = Record<string, unknown>;

export function mergeProps(
  parentProps: AnyProps,
  childProps: AnyProps,
): AnyProps {
  const merged: AnyProps = { ...parentProps };

  for (const key of Object.keys(childProps)) {
    const parentValue = parentProps[key];
    const childValue = childProps[key];
    const isEventHandler = /^on[A-Z]/.test(key);

    if (
      isEventHandler &&
      typeof parentValue === 'function' &&
      typeof childValue === 'function'
    ) {
      merged[key] = (...args: unknown[]) => {
        (childValue as (...a: unknown[]) => void)(...args);
        (parentValue as (...a: unknown[]) => void)(...args);
      };
    } else if (key === 'style') {
      merged.style = {
        ...(parentValue as object),
        ...(childValue as object),
      };
    } else if (key === 'className') {
      merged.className = [parentValue, childValue].filter(Boolean).join(' ');
    } else {
      merged[key] = childValue;
    }
  }

  return merged;
}
