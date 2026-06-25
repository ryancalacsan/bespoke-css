import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react';
import './AspectRatio.scss';

export interface AspectRatioProps extends ComponentPropsWithoutRef<'div'> {
  /** Width-to-height ratio, e.g. `16 / 9` or `1`. Defaults to `16 / 9`. */
  ratio?: number;
  children?: ReactNode;
}

/**
 * Holds a fixed width-to-height ratio for its content - images, video, map
 * embeds - so media never causes layout shift. The child fills the box.
 */
export function AspectRatio({
  ratio = 16 / 9,
  className,
  style,
  children,
  ...rest
}: AspectRatioProps) {
  const classes = ['aspect-ratio', className].filter(Boolean).join(' ');
  const vars = { '--aspect-ratio': String(ratio), ...style } as CSSProperties;

  return (
    <div className={classes} style={vars} {...rest}>
      {children}
    </div>
  );
}
