import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import './Card.scss';

export interface CardProps extends ComponentPropsWithoutRef<'div'> {
  /** Element to render. Defaults to a `div`. */
  as?: ElementType;
  /** Full-bleed media region at the top (an image or `AspectRatio`). */
  media?: ReactNode;
  /** Optional header region above the body. */
  header?: ReactNode;
  /** Optional footer region, divided from the body. */
  footer?: ReactNode;
  children?: ReactNode;
}

/**
 * A bordered surface with optional media, header, body, and footer regions. A
 * neutral container the portfolio's project cards and case-study blocks compose
 * from.
 */
export function Card({
  as: Tag = 'div',
  media,
  header,
  footer,
  className,
  children,
  ...rest
}: CardProps) {
  const classes = ['card', className].filter(Boolean).join(' ');

  return (
    <Tag className={classes} {...rest}>
      {media && <div className="card__media">{media}</div>}
      {(header || children) && (
        <div className="card__body">
          {header && <div className="card__header">{header}</div>}
          {children}
        </div>
      )}
      {footer && <div className="card__footer">{footer}</div>}
    </Tag>
  );
}
