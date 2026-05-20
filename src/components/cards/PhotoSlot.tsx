'use client';

import { useState, useRef, useEffect } from 'react';

interface PhotoSlotProps {
  name: string;
  city: string;
  className?: string;
  fallbackEmoji?: string;
}

export function PhotoSlot({ name, city, className = '', fallbackEmoji = '🍽️' }: PhotoSlotProps) {
  const [state, setState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const src = `/api/place-photo?name=${encodeURIComponent(name)}&city=${encodeURIComponent(city)}`;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`${className} relative overflow-hidden`}>
      {visible && state !== 'error' && (
        <img
          src={src}
          alt={name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${state === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setState('loaded')}
          onError={() => setState('error')}
        />
      )}
      {(state === 'loading' || !visible) && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin" />
        </div>
      )}
      {state === 'error' && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <span className="text-2xl">{fallbackEmoji}</span>
        </div>
      )}
    </div>
  );
}
