import { useEffect, useRef, useState } from 'react';

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Adds `.in` to .rv / .pr / .pc elements as they scroll into view. Call once in <App />. */
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.15 });
    document.querySelectorAll('.rv,.pr,.pc').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/** Counts up to `n` when the returned ref enters the viewport. */
export function useCount(n: number) {
  const ref = useRef<HTMLElement>(null);
  const [v, setV] = useState(n);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    setV(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const f = (t: number) => {
        const p = Math.min((t - t0) / 1600, 1);
        setV(Math.round(n * (1 - (1 - p) ** 3)));
        if (p < 1) requestAnimationFrame(f);
      };
      requestAnimationFrame(f);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [n]);
  return [ref, v] as const;
}
