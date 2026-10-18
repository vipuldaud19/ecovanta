import { content as C } from '../content';
import { useCount } from '../hooks';
import { st } from './ui';

function Num({ n, s }: { n: number; s: string }) {
  const [ref, v] = useCount(n);
  return <b ref={ref}>{v.toLocaleString('en-IN')}{s}</b>;
}

/** Impact strip directly below the hero. */
export function Stats() {
  return (
    <section className="sc" aria-label="Impact highlights">
      <div className="w">
        <div className="sg">
          {C.s.map(([n, s, l]) => (
            <div key={l}>{n ? <Num n={n} s={s} /> : <b>Cleaner</b>}<span className="mu">{l}</span></div>
          ))}
        </div>
        <p className="mu" style={{ textAlign: 'center', fontSize: '.85rem', margin: '12px 0 0' }}>Sample figures — replace with real company statistics.</p>
      </div>
    </section>
  );
}

/** Full-width impact dashboard. */
export function Dashboard() {
  return (
    <section className="dk" aria-labelledby="mt-h">
      <div className="w">
        <div className="sh c"><h2 id="mt-h">Impact at a Glance</h2><p className="mu">Sample figures — edit them in <code>content.ts</code>.</p></div>
        <div className="mt">
          {C.m.map(([l, n, s], i) => <div key={l} className="rv" style={st(i)}><Num n={n} s={s} /><span>{l}</span></div>)}
        </div>
      </div>
    </section>
  );
}
