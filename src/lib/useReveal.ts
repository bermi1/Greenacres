import { useEffect, useRef, useState } from 'react';

/** Adds a one-time "in view" flag so sections can fade up as you scroll. */
export function useInView<T extends Element>(rootMargin = '0px 0px -10% 0px') {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    // safety net: never leave content hidden if the observer is slow or unsupported
    const t = window.setTimeout(() => setSeen(true), 3000);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [seen, rootMargin]);
  return { ref, seen };
}
