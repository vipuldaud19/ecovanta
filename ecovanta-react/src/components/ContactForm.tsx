import { useState, type FocusEvent, type FormEvent } from 'react';
import { content as C } from '../content';
import { submitPickup } from '../api';
import { Section } from './ui';
import { ContactInfo } from './Sections';

type Field = { id: string; label: string; type: 'text' | 'tel' | 'email' | 'date' | 'select' | 'textarea'; req?: boolean; options?: readonly string[] };

const FIELDS: Field[] = [
  { id: 'name', label: 'Full Name', type: 'text', req: true },
  { id: 'biz', label: 'Business Name', type: 'text' },
  { id: 'phone', label: 'Phone Number', type: 'tel', req: true },
  { id: 'email', label: 'Email Address', type: 'email', req: true },
  { id: 'city', label: 'City', type: 'text', req: true },
  { id: 'address', label: 'Pickup Address (with landmark)', type: 'textarea', req: true },
  { id: 'type', label: 'Business Type', type: 'select', req: true, options: C.type },
  { id: 'qty', label: 'Approximate Oil Quantity', type: 'select', options: C.qty },
  { id: 'date', label: 'Preferred Pickup Date', type: 'date' },
  { id: 'msg', label: 'Message', type: 'textarea' },
];

const today = new Date().toISOString().slice(0, 10);

const check = (f: Field, v: string) =>
  !v && f.req ? 'This field is required.'
  : v && f.id === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) ? 'Enter a valid email address.'
  : v && f.id === 'phone' && !/^\+?[\d\s()-]{7,15}$/.test(v) ? 'Enter a valid phone number.'
  : v && f.type === 'date' && v < today ? 'Choose today or a later date.' : '';

export default function ContactForm() {
  const [err, setErr] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [fail, setFail] = useState(false);
  const [ref, setRef] = useState('');
  const [demo, setDemo] = useState(false);
  const [maps, setMaps] = useState('');
  const [geoErr, setGeoErr] = useState(false);
  const locate = () => navigator.geolocation
    ? navigator.geolocation.getCurrentPosition(p => { setMaps(`https://www.google.com/maps?q=${p.coords.latitude},${p.coords.longitude}`); setGeoErr(false); }, () => setGeoErr(true))
    : setGeoErr(true);

  const blur = (e: FocusEvent<HTMLFormElement>) => {
    const t = e.target as unknown as HTMLInputElement, f = FIELDS.find(x => x.id === t.id);
    if (f) setErr(p => ({ ...p, [f.id]: check(f, t.value.trim()) }));
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget), data: Record<string, string> = {}, errs: Record<string, string> = {};
    if (fd.get('website')) { setRef('ECV-' + Date.now().toString(36).toUpperCase()); return; } // honeypot: bots fill the hidden field
    FIELDS.forEach(f => { const v = String(fd.get(f.id) ?? '').trim(); data[f.id] = v; const m = check(f, v); if (m) errs[f.id] = m; });
    setErr(errs);
    const first = FIELDS.find(f => errs[f.id]);
    if (first) { document.getElementById(first.id)?.focus(); return; }
    if (maps) data.maps = maps;
    setBusy(true); setFail(false);
    try { const r = await submitPickup(data); setDemo(r.demo); setRef(r.ref); } catch { setFail(true); setBusy(false); }
  };

  return (
    <Section id="contact" center title="Let’s Give Your Used Oil a Better Destination.">
      <div className="fc">
        {ref ? (
          <div className="ok" role="status"><h3>Thank you — your request is in.</h3><p className="mu">Reference <b>{ref}</b>. Our team will contact you to confirm your pickup.</p>{demo && <p className="er">Demo mode: this request was not saved or sent. Add your Google Sheet link (sheetUrl) in src/content.ts.</p>}</div>
        ) : (
          <form className="fm" noValidate onSubmit={submit} onBlur={blur}>
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }} />
            {FIELDS.map(f => {
              const a = { id: f.id, name: f.id, 'aria-describedby': 'e-' + f.id, 'aria-invalid': !!err[f.id], required: f.req, 'aria-required': f.req };
              return (
                <div key={f.id} className={f.type === 'textarea' ? 'fw' : undefined}>
                  <label htmlFor={f.id}>{f.label}{f.req && ' *'}</label>
                  {f.type === 'select' ? <select {...a}><option value="">Select…</option>{f.options?.map(o => <option key={o}>{o}</option>)}</select>
                    : f.type === 'textarea' ? <textarea {...a} rows={4} />
                    : <input {...a} type={f.type} min={f.type === 'date' ? today : undefined} />}
                  <p className="er" id={'e-' + f.id}>{err[f.id]}</p>
                </div>
              );
            })}
            <div className="fw">
              <button type="button" className="b bo" onClick={locate}>{maps ? 'Location added ✓' : 'Add my current location (optional)'}</button>
              {geoErr && <p className="er" role="alert">Could not get your location. Please type the address instead.</p>}
            </div>
            <div className="fw">
              {fail && <p className="er" role="alert">Something went wrong. Please try again or contact us directly.</p>}
              <button className="b bp" type="submit" disabled={busy}>{busy ? 'Sending…' : 'Schedule My Pickup'}</button>
            </div>
          </form>
        )}
      </div>
      <ContactInfo />
    </Section>
  );
}
