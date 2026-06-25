import { cloneElement, isValidElement } from 'react';
import type { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';
import { mergeProps } from '../mergeProps';
import './Button.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonShape = 'rounded' | 'pill';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual weight and intent of the button. */
  variant?: ButtonVariant;
  /** Control height, padding, and font size. */
  size?: ButtonSize;
  /** Corner treatment. `pill` is the editorial, marketing-CTA shape. */
  shape?: ButtonShape;
  /** Show a spinner and block interaction while an action is in flight. */
  isLoading?: boolean;
  /**
   * Text announced to screen readers while loading. The visible label stays in
   * place; this is what assistive tech reads via the live region.
   */
  loadingLabel?: string;
  /** Stretch to fill the width of the parent container. */
  fullWidth?: boolean;
  /** Render square for a single icon. Requires an `aria-label` for its name. */
  iconOnly?: boolean;
  /** Optional element rendered before the label (an icon, for example). */
  leadingIcon?: ReactNode;
  /** Optional element rendered after the label. */
  trailingIcon?: ReactNode;
  /**
   * Render as the single child element instead of a `<button>` - for links and
   * framework `<Link>`s. The button's classes and props merge onto the child:
   * `<Button asChild><a href="/x">Go</a></Button>`.
   */
  asChild?: boolean;
  children: ReactNode;
}

/**
 * A button is a button. We render a real <button> so keyboard activation,
 * focus, and form submission come for free from the platform. Loading state is
 * communicated three ways at once: a spinner (sighted users), aria-busy
 * (assistive tech), and a disabled interaction (everyone).
 *
 * `asChild` renders the styling onto a single child element instead - the
 * escape hatch for links and framework `<Link>`s without losing the look.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  shape = 'rounded',
  isLoading = false,
  loadingLabel = 'Loading',
  fullWidth = false,
  iconOnly = false,
  leadingIcon,
  trailingIcon,
  asChild = false,
  disabled,
  type = 'button',
  className,
  children,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  const classes = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    `button--${shape}`,
    iconOnly && 'button--icon-only',
    fullWidth && 'button--full-width',
    isLoading && 'button--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Decorated inner content. `label` is the visible (or, when iconOnly, the
  // icon) content; loading and icon affordances wrap around it.
  const decorate = (label: ReactNode) => (
    <>
      {isLoading && <span className="button__spinner" aria-hidden="true" />}
      {leadingIcon && !isLoading && (
        <span className="button__icon" aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      {iconOnly ? (
        <span className="button__icon" aria-hidden="true">
          {label}
        </span>
      ) : (
        <span className="button__label">{label}</span>
      )}
      {trailingIcon && !isLoading && !iconOnly && (
        <span className="button__icon" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
      {isLoading && (
        <span className="button__loading-text">{loadingLabel}</span>
      )}
    </>
  );

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ children?: ReactNode }>;
    const merged = mergeProps(
      {
        className: classes,
        'aria-busy': isLoading || undefined,
        'aria-disabled': isDisabled || undefined,
        ...rest,
      },
      child.props as Record<string, unknown>,
    );
    if (isDisabled) {
      // The child (e.g. a link) can't take a native `disabled` attribute, so
      // make it non-interactive by hand: unfocusable, and swallow activation.
      // The CSS drops pointer-events on [aria-disabled], covering mouse clicks.
      merged.tabIndex = -1;
      merged.onClick = (event: { preventDefault: () => void }) => {
        event.preventDefault();
      };
    }
    return cloneElement(child, merged, decorate(child.props.children));
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      {...rest}
    >
      {decorate(children)}
    </button>
  );
}
