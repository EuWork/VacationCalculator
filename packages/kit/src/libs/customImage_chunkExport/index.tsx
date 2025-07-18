import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import cn from "classnames";

export interface ImageInterface {
  className?: string;
  errorClassName?: string;
  src: string;
  alt?: string;
  lazy?: boolean;
  lazyThreshold?: number;
}

function ImageComponent({ className, errorClassName, src, alt, lazy = true, lazyThreshold }: ImageInterface) {
  const [error, setError] = React.useState(false);
  const handleError = React.useCallback(() => setError(true), []);

  if (lazy)
    return (
      <LazyLoadImage
        className={cn(className, error && errorClassName)}
        threshold={lazyThreshold}
        alt={alt}
        decoding="async"
        src={src}
        onError={handleError}
      />
    );

  return (
    <img
      className={cn(className, error && errorClassName)}
      alt={alt}
      decoding="async"
      src={src}
      onError={handleError}
    />
  );
}

export const Image = React.memo(ImageComponent);
