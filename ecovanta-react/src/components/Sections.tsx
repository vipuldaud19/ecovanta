import { content as C } from '../content';
import { Section, st } from './ui';
import { openModal } from './Modal';

export const Why = () => (
  <Section id="why" alt center title="Why Businesses Choose ECOVANTA">
    <div className="gr">
      {C.why.map(([ic, t, d], i) => (
        <article key={t} className="cd rv" style={st(i)}><div className="ic" aria-hidden="true">{ic}</div><h3>{t}</h3><p className="mu">{d}</p></article>
      ))}
    </div>
  </Section>
);

export const Solutions = () => (
  <Section id="solutions" title="Solutions Built for a Circular Economy">
    <div className="gr">
      {C.sol.map(([t, d, cta, href], i) => (
        <article key={t} className="cd rv" style={st(i)}><span className="ey">0{i + 1}</span><h3>{t}</h3><p className="mu">{d}</p><a className="lk" href={href}>{cta}</a></article>
      ))}
    </div>
  </Section>
);

export const Process = () => (
  <Section id="how" alt center title="Simple From Pickup to Purpose.">
    <div className="pr">
      {C.steps.map(([t, d], i) => (
        <div key={t} className="sp rv" style={st(i)}><div className="nm">0{i + 1}</div><div><h3>{t}</h3><p className="mu">{d}</p></div></div>
      ))}
    </div>
  </Section>
);

export const Industries = () => (
  <Section id="industries" center title="Industries We Serve" sub="Any kitchen that fries, cooks or bakes at scale produces used oil. We help them handle it responsibly.">
    <div className="gr g4">
      {C.ind.map(([ic, t, d], i) => (
        <article key={t} className="cd rv" style={st(i)}><div className="ic" aria-hidden="true">{ic}</div><h3>{t}</h3><p className="mu">{d}</p></article>
      ))}
    </div>
  </Section>
);

export const CtaBand = () => (
  <section className="dk cs" aria-labelledby="cta-h">
    <div className="w">
      <h2 id="cta-h">Still Throwing Used Cooking Oil Away?</h2>
      <p className="mu" style={{ fontSize: '1.15rem' }}>Turn your kitchen waste into an environmental opportunity.</p>
      <div className="ct" style={{ justifyContent: 'center' }}>
        <a className="b bp" href="#contact">Schedule a Pickup</a>
        <a className="b bo" href="#contact">Talk to Our Team</a>
      </div>
    </div>
  </section>
);

export const EcoPoints = () => (
  <section id="eco">
    <div className="w">
      <div className="eco">
        <div>
          <h2>Every Drop Counts.</h2>
          <p>A simple points programme could reward eligible customers for responsible oil collection, with points redeemable for benefits. Programme rules, eligibility and rewards are to be defined.</p>
          <a className="b bd" href="#contact">Join ECOVANTA</a>
        </div>
        <div className="pc rv"><b>Eco Points (concept)</b><div className="bar" role="img" aria-label="Sample progress bar"><i /></div><small>Sample progress toward a reward</small></div>
      </div>
    </div>
  </section>
);

export const Technology = () => (
  <section id="tech" style={{ background: 'var(--sf)' }}>
    <div className="w tk">
      <div>
        <h2>Collection Made Smarter.</h2>
        <p className="mu">ECOVANTA can offer digital scheduling, pickup management and collection tracking. The preview shows the concept; features will be switched on as they are built.</p>
        <a className="b bd" href="#contact">Request a Pickup</a>
      </div>
      <div className="ph"><div className="ps">
        <b>Pickup tracker</b> <span className="mu">· concept preview</span>
        <ol>{C.trk.map((t, i) => <li key={t} className={i < 3 ? 'd' : i === 3 ? 'n' : 'p'}><i />{t}</li>)}</ol>
      </div></div>
    </div>
  </section>
);

export const Partners = () => (
  <Section id="partners" alt center title="Building a Network for a Cleaner Future." sub="Placeholder logos — add partner marks only with permission.">
    <div className="gr g4">{C.pt.map(([p], i) => <div key={p} className="pt rv" style={st(i)}>{p}<small>Placeholder logo</small></div>)}</div>
  </Section>
);

export const Resources = () => (
  <Section id="resources" title="Resources" sub="Sample articles — replace with your own content.">
    <div className="gr">
      {C.bl.map(([t, tag, date, sum], i) => (
        <article key={t} className="cd rv" style={st(i)}>
          <span className="tg">{tag}</span><span className="dt mu">{date}</span>
          <h3 style={{ marginTop: 14 }}>{t}</h3>
          <button className="lk" onClick={() => openModal(t, sum + ' (Sample article — full content coming soon.)')}>Read More</button>
        </article>
      ))}
    </div>
  </Section>
);

export const ContactInfo = () => (
  <div className="gr g4">{C.ci.map(([l, t], i) => <div key={l} className="cd rv" style={st(i)}><h3>{l}</h3><p className="mu" style={{ margin: 0 }}>{t}</p></div>)}</div>
);
