import { content as C } from '../content';
import { openModal } from './Modal';

const social = [['Instagram', 'IG', 'https://www.instagram.com/'], ['LinkedIn', 'in', 'https://www.linkedin.com/'], ['Facebook', 'f', 'https://www.facebook.com/'], ['YouTube', '▶', 'https://www.youtube.com/']];

export default function Footer() {
  return (
    <footer>
      <div className="w">
        <a className="lg" href="#home">ECOVANTA</a>
        <p style={{ marginTop: 12 }}>Turning Used Oil Into a Greener Tomorrow.</p>
        <div className="fg">
          {C.ft.map(([h, links]) => (
            <div key={h}>
              <b className="fh">{h}</b>
              <ul>
                {links.map(([l, href, legal]) => (
                  <li key={l}><a href={href} onClick={legal ? e => { e.preventDefault(); openModal(l, `Placeholder — add your ${l} here before launch.`); } : undefined}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="so">{social.map(([n, i, u]) => <a key={n} href={u} target="_blank" rel="noopener noreferrer" aria-label={n}>{i}</a>)}</div>
        <p className="cp" style={{ maxWidth: 'none', marginTop: 28 }}>© 2026 ECOVANTA. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
