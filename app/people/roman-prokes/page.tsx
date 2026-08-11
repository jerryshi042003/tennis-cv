const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/tennis-cv";

export default function RomanProkesPage() {
  return (
    <main>
      <a className="page-back" href={`${basePath}/`}>← Tennis CV home</a>
      <header className="masthead">
        <p className="kicker">Named source route · Roman Prokes</p>
        <h1>Racquet customization without the heavy-frame myth.</h1>
        <p className="abstract">The retained source is Craig Shapiro’s 2020 technology special with Roman Prokes. Product examples are dated; the customization principles remain useful.</p>
      </header>
      <section>
        <div className="section-heading"><span>01</span><div><p className="kicker">Primary source</p><h2>Prokes × Shapiro — technology special.</h2></div></div>
        <article className="source-note">
          <h3><a href="https://www.youtube.com/watch?v=eTj-labBKtg">Watch the 44-minute source ↗</a></h3>
          <p>Prokes discusses his USTA/Lake Nona work, decades on tour, professional customization, the Djokovic specification change, strings, balance, and amateur weight choices.</p>
        </article>
      </section>
      <section>
        <div className="section-heading"><span>02</span><div><p className="kicker">Doctrine</p><h2>What survives the dated equipment talk.</h2></div></div>
        <div className="findings">
          <p><strong>Preserve swingweight deliberately.</strong> Static weight, balance, pattern, and swingweight are separate controls.</p>
          <p><strong>Angles matter.</strong> Modern racquet choices should support shape and spin, not only straight-line pace.</p>
          <p><strong>Amateur honesty.</strong> A tour player’s heavy frame is not automatically a useful recreational specification.</p>
          <p><strong>Strings are part of the system.</strong> Gauge, softness, hybrid structure, prestretch, and grip size change the response together.</p>
        </div>
      </section>
      <section>
        <div className="section-heading"><span>03</span><div><p className="kicker">Jerry application</p><h2>Stability without sacrificing maneuverability.</h2></div></div>
        <p className="abstract">Small hoop additions can improve stability; handle mass can restore balance. Jerry’s thicker 4G experiment favors durability and a flatter two-hander, with a known tradeoff against the feel and spin of thinner strings.</p>
      </section>
    </main>
  );
}
