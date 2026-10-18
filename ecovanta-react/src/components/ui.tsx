import type { CSSProperties, ReactNode } from 'react';

/** Stagger index for scroll-reveal animations. */
export const st = (i: number) => ({ '--i': i }) as CSSProperties;

export const Logo = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <path d="M16 2C10 11 6 15.5 6 20a10 10 0 0020 0C26 15.5 22 11 16 2z" fill="#1fa971" />
    <path d="M16 27c0-6 2-9 6-12" stroke="#faf8f1" strokeWidth="2" fill="none" />
  </svg>
);

type SectionProps = { id?: string; title: string; sub?: string; alt?: boolean; center?: boolean; children: ReactNode };

/** Standard section: heading block + content. */
export function Section({ id, title, sub, alt, center, children }: SectionProps) {
  return (
    <section id={id} style={alt ? { background: 'var(--sf)' } : undefined}>
      <div className="w">
        <div className={'sh' + (center ? ' c' : '')}>
          <h2>{title}</h2>
          {sub && <p className="mu">{sub}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
