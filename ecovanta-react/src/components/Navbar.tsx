import { useEffect, useRef, useState } from 'react';
import { content as C } from '../content';
import { Logo } from './ui';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [sm, setSm] = useState(false);
  const hb = useRef<HTMLButtonElement>(null);
  const cl = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const f = () => setSm(window.scrollY > 40);
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) cl.current?.focus();
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape' && open) { setOpen(false); hb.current?.focus(); } };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open]);

  const links = C.nav.map(([l, h]) => <a key={l} href={h}>{l}</a>);
  return (
    <>
      <header className={'hd' + (sm ? ' sm' : '')}>
        <div className="w">
          <a className="lg" href="#home" aria-label="ECOVANTA home"><Logo />ECOVANTA</a>
          <nav className="nv" aria-label="Main">{links}</nav>
          <a className="b bp hc" href="#contact">Schedule a Pickup</a>
          <button ref={hb} className="hb" aria-label="Open menu" aria-expanded={open} aria-controls="dr" onClick={() => setOpen(true)}><i /><i /><i /></button>
        </div>
      </header>
      <div className={'ov' + (open ? ' on' : '')} onClick={() => setOpen(false)} />
      <aside id="dr" className={'dr' + (open ? ' on' : '')} aria-label="Menu" onClick={e => { if ((e.target as HTMLElement).closest('a')) setOpen(false); }}>
        <button ref={cl} className="cl" aria-label="Close menu" onClick={() => { setOpen(false); hb.current?.focus(); }}>✕</button>
        <nav aria-label="Mobile">{links}</nav>
        <a className="b bp" href="#contact">Schedule a Pickup</a>
      </aside>
    </>
  );
}
