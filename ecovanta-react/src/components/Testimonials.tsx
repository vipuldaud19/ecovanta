import { useState } from 'react';
import { content as C } from '../content';
import { Section } from './ui';

export default function Testimonials() {
  const [k, setK] = useState(0);
  const n = C.tm.length;
  const go = (d: number) => setK((k + d + n) % n);
  const [quote, name, biz, role] = C.tm[k];
  return (
    <Section id="testimonials" center title="What Our Customers Say" sub="Sample testimonials — replace with real customer feedback.">
      <div className="tm" aria-live="polite">
        <figure key={k} className="sl on" style={{ margin: 0 }}>
          <div className="st" role="img" aria-label="5 out of 5 stars">★★★★★</div>
          <blockquote>“{quote}”</blockquote>
          <figcaption><b>{name}</b><br /><span className="mu">{role}, {biz}</span></figcaption>
        </figure>
      </div>
      <div style={{ textAlign: 'center' }}>
        <button className="rb" aria-label="Previous testimonial" onClick={() => go(-1)}>‹</button>
        <button className="rb" aria-label="Next testimonial" onClick={() => go(1)}>›</button>
      </div>
    </Section>
  );
}
