'use client';
import { useEffect, useRef } from 'react';

export function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const el = ref.current;
    if (el) {
      const reveals = el.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
      reveals.forEach((r) => observer.observe(r));

      // Also observe the element itself if it has reveal classes
      if (el.classList.contains('reveal') || el.classList.contains('reveal-left') || 
          el.classList.contains('reveal-right') || el.classList.contains('reveal-scale')) {
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}

export function ScrollRevealWrapper({ children, className = '', direction = 'up', delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay) {
              setTimeout(() => entry.target.classList.add('visible'), delay);
            } else {
              entry.target.classList.add('visible');
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const dirClass = direction === 'left' ? 'reveal-left' : 
                   direction === 'right' ? 'reveal-right' : 
                   direction === 'scale' ? 'reveal-scale' : 'reveal';

  return (
    <div ref={ref} className={`${dirClass} ${className}`}>
      {children}
    </div>
  );
}
