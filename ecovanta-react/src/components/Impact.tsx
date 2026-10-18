import { content as C } from '../content';

export default function Impact() {
  return (
    <section id="impact">
      <div className="w ig">
        <div className="rv">
          <h2>Small Actions. Measurable Impact.</h2>
          <p className="mu">Responsible used cooking oil collection can:</p>
          <ul>
            <li>prevent improper disposal</li>
            <li>reduce waste entering drainage systems</li>
            <li>support renewable fuel production</li>
            <li>encourage circular economy practices</li>
            <li>help businesses strengthen sustainability initiatives</li>
          </ul>
        </div>
        <div className="rg">
          <svg viewBox="0 0 400 400" role="img" aria-label="Circular flow: Used Oil, Collection, Recovery, Processing, Renewable Fuel, Lower Waste">
            <circle className="rt" cx="200" cy="200" r="150" fill="none" stroke="#1fa971" strokeWidth="2" strokeDasharray="3 9" />
            <circle cx="200" cy="200" r="92" fill="#12805a" opacity=".35" />
            <text x="200" y="196" textAnchor="middle" fill="#c9e24b" fontSize="15" fontWeight="800">CIRCULAR</text>
            <text x="200" y="218" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="800">ECONOMY</text>
            {C.loop.map((t, i) => {
              const a = ((i * 60 - 90) * Math.PI) / 180, x = 200 + 150 * Math.cos(a), y = 200 + 150 * Math.sin(a);
              return (
                <g className="nd" key={t}>
                  <rect x={x - 56} y={y - 17} width={112} height={34} rx={17} style={{ animationDelay: `${i * 0.8}s` }} />
                  <text x={x} y={y + 5} textAnchor="middle">{t}</text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
