import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual weight and intent of the button. */
  variant?: ButtonVariant;
  /** Control height, padding, and font size. */
  size?: ButtonSize;
  /** Show a spinner and block interaction while an action is in flight. */
  isLoading?: boolean;
  /**
   * Text announced to screen readers while loading. The visible label stays in
   * place; this is what assistive tech reads via the live region.
   */
  loadingLabel?: string;
  /** Stretch to fill the width of the parent container. */
  fullWidth?: boolean;
  /** Optional element rendered before the label (an icon, for example). */
  leadingIcon?: ReactNode;
  /** Optional element rendered after the label. */
  trailingIcon?: ReactNode;
  children: ReactNode;
}

/**
 * A button is a button. We render a real <button> so keyboard activation,
 * focus, and form submission come for free from the platform. Loading state is
 * communicated three ways at once: a spinner (sighted users), aria-busy
 * (assistive tech), and a disabled interaction (everyone).
 */
export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  loadingLabel = 'Loading',
  fullWidth = false,
  leadingIcon,
  trailingIcon,
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
    fullWidth && 'button--full-width',
    isLoading && 'button--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      {...rest}
    >
      {isLoading && <span className="button__spinner" aria-hidden="true" />}
      {leadingIcon && !isLoading && (
        <span className="button__icon" aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      <span className="button__label">{children}</span>
      {trailingIcon && !isLoading && (
        <span className="button__icon" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
      {isLoading && (
        <span className="button__loading-text">{loadingLabel}</span>
      )}
    </button>
  );
}
