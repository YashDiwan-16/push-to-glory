import { memo, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface LazyImageProps {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
  width?: number;
  height?: number;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Lazy loading image component with placeholder support
 * Optimizes loading performance and user experience
 */
export const LazyImage = memo<LazyImageProps>(({
  src,
  alt,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmMGYwZjAiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNlMGUwZTAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgZmlsbD0idXJsKCNnKSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TG9hZGluZy4uLjwvdGV4dD48L3N2Zz4=',
  className = '',
  width,
  height,
  onLoad,
  onError,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      width={width}
      height={height}
      onLoad={onLoad}
      onError={onError}
      style={{
        background: `url(${placeholder})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  );
});

LazyImage.displayName = 'LazyImage';

interface LazyComponentProps {
  children: ReactNode;
  fallback?: ReactNode;
  delay?: number;
}

/**
 * Lazy loading wrapper component with optional delay
 * Useful for progressive loading of heavy components
 */
export const LazyComponent = memo<LazyComponentProps>(({
  children,
  fallback = <div className="animate-pulse bg-slate-200 rounded h-32 w-full" />,
  delay = 0,
}) => {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
  });

  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isIntersecting) {
      if (delay > 0) {
        const timer = setTimeout(() => setShouldRender(true), delay);
        return () => clearTimeout(timer);
      } else {
        setShouldRender(true);
      }
    }
  }, [isIntersecting, delay]);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}>
      {shouldRender ? children : fallback}
    </div>
  );
});

LazyComponent.displayName = 'LazyComponent';

export default LazyImage;
