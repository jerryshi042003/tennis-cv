const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const sources = [
  ["Where serve power comes from", "https://www.youtube.com/watch?v=jvDds3KEY4s", "Back-hip vertical displacement and rapid long-axis rotation are the two retained power mechanisms."],
  ["Serve mistakes to avoid", "https://www.youtube.com/watch?v=HdgBUIEaRsQ", "Loading deeper is not automatically better; waiting at the bottom leaks the rebound."],
  ["Tennis Congress serve talk", "https://www.youtube.com/watch?v=krKYy4eqgdQ", "A longer source for sequencing, speed, and the distinction between loading depth and explosiveness."],
] as const;

export default function MarkKovacsPage() {
  return (
    <main>
      <a className="page-back" href={`${basePath}/`}>← Tennis CV home</a>
      <header className="masthead">
        <p className="kicker">Named source route · Mark Kovacs</p>
        <h1>Serve doctrine before the drill.</h1>
        <p className="abstract">This page separates Kovacs’s published coaching claims from the authored Serve Motion Lab application. It does not present Jerry’s drills as a verbatim transcript or measured diagnosis.</p>
      </header>
      <section>
        <div className="section-heading"><span>01</span><div><p className="kicker">Primary sources</p><h2>The source map behind Serve Motion Lab.</h2></div></div>
        {sources.map(([title, href, note]) => (
          <article className="source-note" key={href}>
            <h3><a href={href}>{title} ↗</a></h3>
            <p>{note}</p>
          </article>
        ))}
      </section>
      <section>
        <div className="section-heading"><span>02</span><div><p className="kicker">Application</p><h2>What the teaching route does.</h2></div></div>
        <div className="findings">
          <p><strong>Engine one.</strong> Back hip moves up quickly rather than chasing a deep leg load.</p>
          <p><strong>Engine two.</strong> Long-axis rotation moves through quickly without opening the torso too early.</p>
          <p><strong>Constraint.</strong> One or two cues at a time; dose and failure mode are visible beside each drill.</p>
          <p><strong>Boundary.</strong> The schematics are explanatory animations, not motion-capture measurements of Jerry.</p>
        </div>
        <p><a href={`${basePath}/serve-motion-lab/`}>Open Serve Motion Lab →</a></p>
      </section>
    </main>
  );
}
