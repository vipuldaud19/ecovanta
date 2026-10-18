import { useEffect, useRef, useState } from 'react';

let show = (_t: string, _p: string) => {};
/** Open the shared dialog from anywhere (legal links, blog "Read More"). */
export const openModal = (t: string, p: string) => show(t, p);

export default function Modal() {
  const ref = useRef<HTMLDialogElement>(null);
  const [m, setM] = useState({ t: '', p: '' });
  useEffect(() => { show = (t, p) => { setM({ t, p }); ref.current?.showModal(); }; }, []);
  return (
    <dialog ref={ref} aria-labelledby="dt">
      <h2 id="dt" style={{ fontSize: '1.4rem' }}>{m.t}</h2>
      <p className="mu">{m.p}</p>
      <form method="dialog"><button className="b bp">Close</button></form>
    </dialog>
  );
}
