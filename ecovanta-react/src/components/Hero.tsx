import HeroArt from './HeroArt';

export default function Hero() {
  return (
    <section className="hero dk" id="home">
      {Array.from({ length: 7 }, (_, i) => (
        <i key={i} className="fl" aria-hidden="true" style={{ left: `${(i * 37 + 8) % 92}%`, top: `${(i * 53 + 10) % 80}%`, animationDelay: `-${i * 1.3}s`, opacity: 0.3 + (i % 3) / 10 }} />
      ))}
      <div className="w">
        <div className="hg">
          <div>
            <h1>Your Used Cooking Oil Can Power a Greener Future.</h1>
            <p>ECOVANTA collects used cooking oil responsibly and helps transform waste into renewable energy—creating cleaner kitchens, cleaner cities and a cleaner future.</p>
            <div className="ct">
              <a className="b bp" href="#contact">Schedule a Pickup</a>
              <a className="b bo" href="#solutions">Explore Our Solutions</a>
            </div>
          </div>
          <HeroArt />
        </div>
      </div>
    </section>
  );
}
