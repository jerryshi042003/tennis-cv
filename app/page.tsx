const Metric = ({ value, label }: { value: string; label: string }) => (
  <div className="metric">
    <strong>{value}</strong>
    <span>{label}</span>
  </div>
);

const Video = ({ src, title, note }: { src: string; title: string; note: string }) => (
  <article className="video-card">
    <div className="video-head">
      <h3>{title}</h3>
      <span>76 / 76 frames reviewed</span>
    </div>
    <video controls playsInline preload="metadata" src={src} aria-label={title} />
    <p>{note}</p>
  </article>
);

export default function Home() {
  return (
    <main>
      <header className="hero">
        <p className="eyebrow">Tennis contact evidence · 31 Jul 2026</p>
        <h1>One real win: the ball stays tracked through the racket overlap.</h1>
        <p className="lede">
          Same 76-frame public high-speed clip in every player below. This is source-camera 2D evidence—not 3D contact, grip, racket-face orientation, or spin.
        </p>
      </header>

      <section className="decision">
        <div>
          <span className="pass">PASS</span>
          <h2>Use CoTracker for ball center. Use SAM 2 for racket silhouette.</h2>
        </div>
        <a href="/receipts/human-audit.json">Open full frame audit ↗</a>
      </section>

      <section aria-labelledby="best-demo">
        <div className="section-title">
          <p>Start here</p>
          <h2 id="best-demo">Accepted layers on one clock</h2>
        </div>
        <Video
          src="/media/accepted-2d-evidence.mp4"
          title="Arm + racket silhouette + ball center"
          note="Yellow arm: MediaPipe gross 2D pose. Purple racket: SAM 2.1 silhouette. Yellow ring: CoTracker3 ball center. Closest overlap is a review frame, not a measured physical-impact claim."
        />
      </section>

      <section className="score" aria-label="Ball tracker pass metrics">
        <Metric value="54 / 57" label="verified ball frames" />
        <Metric value="0.99 px" label="median center error" />
        <Metric value="2.68 px" label="p90 center error" />
        <Metric value="1.87 px" label="racket-overlap error" />
        <Metric value="0" label="false points after exit" />
        <Metric value="29.75 s" label="CPU inference" />
      </section>

      <section className="raw" aria-labelledby="raw-title">
        <div className="section-title">
          <p>Independent raw outputs</p>
          <h2 id="raw-title">What each model actually did</h2>
        </div>
        <div className="grid">
          <Video
            src="/media/raw-cotracker3.mp4"
            title="CoTracker3 — ball pass"
            note="Ball gate passed. Five racket points also remain on physical racket regions, but they are not a rigid 3D racket solve."
          />
          <Video
            src="/media/raw-sam2.mp4"
            title="SAM 2.1 Tiny — racket pass, ball fail"
            note="Racket silhouette stays attached for 76/76 frames. Ball center failed: 6.19 px median and one false frame after exit."
          />
        </div>
      </section>

      <section className="boundary">
        <p className="eyebrow">The boundary</p>
        <h2>This improves the evidence layer. It does not unlock orbitable 3D.</h2>
        <p>
          Trustworthy grip, racket SE(3), string-plane contact, 3D ball flight, and alternate cameras still require synchronized calibrated views or measured markers. More compute cannot create geometry the one camera never recorded.
        </p>
        <div className="links">
          <a href="/receipts/cotracker3.json">CoTracker receipt</a>
          <a href="/receipts/sam2.1.json">SAM 2 receipt</a>
          <a href="/receipts/combined.json">Combined receipt</a>
        </div>
      </section>
    </main>
  );
}
