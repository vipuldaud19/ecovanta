import { content as C } from '../content';
import { Section, st } from './ui';

const schema = JSON.stringify({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: C.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

export default function Faq() {
  return (
    <Section id="faq" alt center title="Frequently Asked Questions">
      <div className="fq">
        {C.faq.map(([q, a], i) => <details key={q} className="rv" style={st(i)}><summary>{q}</summary><p>{a}</p></details>)}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
    </Section>
  );
}
