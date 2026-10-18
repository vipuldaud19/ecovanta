import { content } from './content';

const LABELS: Record<string, string> = {
  biz: 'Business Name', phone: 'Phone Number', city: 'City', address: 'Pickup Address', maps: 'Google Maps location',
  type: 'Business Type', qty: 'Approximate Oil Quantity', date: 'Preferred Pickup Date', msg: 'Message',
};

/** Saves the request to a Google Sheet (sheetUrl, see apps-script/Code.gs) and/or emails it via Web3Forms (formKey). */
async function toSheet(url: string, d: Record<string, string>) {
  // Apps Script replies with a redirect, so the browser needs no-cors: the response can't be read, only network failures show up.
  await fetch(url, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(d) });
}

async function toEmail(key: string, d: Record<string, string>) {
  const body: Record<string, string> = {
    access_key: key, from_name: 'ECOVANTA website', Reference: d.ref,
    subject: `New ECOVANTA pickup request: ${d.name}, ${d.city}`,
  };
  for (const k in d) if (d[k] && k !== 'ref') body[k === 'name' || k === 'email' ? k : LABELS[k] ?? k] = d[k];
  const r = await fetch('https://api.web3forms.com/submit', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.success === false) throw new Error(j.message || 'Request failed');
}

export async function submitPickup(d: Record<string, string>): Promise<{ ref: string; demo: boolean }> {
  const ref = 'ECV-' + Date.now().toString(36).toUpperCase();
  const { sheetUrl, formKey } = content;
  if (!sheetUrl && !formKey) { await new Promise(r => setTimeout(r, 600)); return { ref, demo: true }; }
  const data = { ...d, ref };
  await Promise.all([sheetUrl && toSheet(sheetUrl, data), formKey && toEmail(formKey, data)]);
  return { ref, demo: false };
}
