import AboutArt from './AboutArt';

export default function About() {
  return (
    <section id="about">
      <div className="w ab">
        <div className="im rv" role="img" aria-label="Illustration: green hills, a sun and a droplet-shaped leaf"><AboutArt /></div>
        <div className="rv">
          <p className="ey">ABOUT ECOVANTA</p>
          <h2>From Kitchen Waste to Renewable Value.</h2>
          <p className="mu">Used cooking oil should not be poured into drains or reused improperly. ECOVANTA provides responsible collection and recycling solutions that help businesses manage used cooking oil while contributing to the circular economy.</p>
          <ul className="ck"><li>Responsible Collection</li><li>Sustainable Recycling</li><li>Transparent Traceability</li></ul>
          <a className="b bd" href="#why">Know More About ECOVANTA</a>
        </div>
      </div>
    </section>
  );
}
