import { literature, phases, statusLabel } from "./research-data";

const attemptCount = phases.reduce((sum, phase) => sum + phase.attempts.length, 0);

const evidenceCuts = [
  ["TT3D ping-pong reconstruction", "/media/tt3d.mp4"],
  ["Uplifting Table Tennis", "/media/uplifting-table-tennis.mp4"],
  ["Measured Bath serve", "/media/bath-4d56-two-view.mp4"],
  ["Accepted tennis 2D evidence", "/media/accepted-2d-evidence.mp4"],
  ["Rigid racket composition", "/media/rigid-2d-composition.mp4"],
  ["Per-frame racket review", "/media/per-frame-racket-review.mp4"],
  ["Human-mask propagation failure", "/media/human-mask-failure-review.mp4"],
] as const;

export default function Home() {
  return (
    <main>
      <header className="masthead">
        <p className="kicker">Racket-sports computer vision · research log</p>
        <h1>Tennis CV, starting with the ping-pong result that clarified the problem.</h1>
        <p className="abstract">
          A compressed record of {attemptCount} materially different attempts: what each method asked,
          what the evidence showed, and why the next step changed. Cosmetic variants and repeated runs
          are folded into the experiment that decided them.
        </p>
        <nav aria-label="Page sections">
          <a href="#ping-pong">Ping-pong demo</a>
          <a href="#findings">Findings</a>
          <a href="#attempts">All attempts</a>
          <a href="#literature">Literature</a>
          <a href="#evidence">Evidence</a>
        </nav>
      </header>

      <section id="ping-pong" className="lead-section">
        <div className="section-heading">
          <span>01</span>
          <div>
            <p className="kicker">Reference result</p>
            <h2>Ping-pong: observations become a testable 3D trajectory.</h2>
          </div>
        </div>
        <video controls playsInline preload="metadata" src="/media/tt3d.mp4" aria-label="TT3D table-tennis reconstruction demo" />
        <div className="method-note">
          <p><strong>Question.</strong> What does a convincing racket-sports reconstruction look like?</p>
          <p><strong>Method.</strong> Observe the ball, calibrate the scene, fit bounce and flight physics, then reproject the result into the source views.</p>
          <p><strong>Why it matters.</strong> TT3D exposes the chain and its residuals. It is the right standard for the ball layer, but it does not recover the player, racket, grip, or contact geometry needed for tennis.</p>
        </div>
      </section>

      <section id="findings">
        <div className="section-heading">
          <span>02</span>
          <div><p className="kicker">Synthesis</p><h2>What actually survived.</h2></div>
        </div>
        <div className="findings">
          <p><strong>Body.</strong> Monocular methods can provide a reusable moving body, and calibrated views can validate it. They do not supply tennis-object truth.</p>
          <p><strong>Ball.</strong> Point tracking is strong on one clear high-speed clip and independently reproducible there. Edge cases and new footage still break it.</p>
          <p><strong>Racket.</strong> Detection works more often than clean segmentation or continuous pose. Even human-perfect first-frame masks did not propagate reliably.</p>
          <p><strong>Next input.</strong> The durable route is synchronized, calibrated, high-frame-rate owned capture with a marked racket and known scale—not another model swap on the same broadcast video.</p>
        </div>
      </section>

      <section id="attempts">
        <div className="section-heading">
          <span>03</span>
          <div>
            <p className="kicker">Experiment ledger</p>
            <h2>Every distinct attempt, without repeating the same failure.</h2>
          </div>
        </div>
        {phases.map((phase, phaseIndex) => {
          const start = phases
            .slice(0, phaseIndex)
            .reduce((sum, earlierPhase) => sum + earlierPhase.attempts.length, 1);
          return (
            <article className="phase" key={phase.title}>
              <header>
                <h3>{phase.title}</h3>
                <p>{phase.scope}</p>
              </header>
              <ol start={start}>
                {phase.attempts.map((attempt) => (
                  <li key={attempt.method}>
                    <div className="attempt-title">
                      <h4>{attempt.method}</h4>
                      <span className={`status ${attempt.status}`}>{statusLabel[attempt.status]}</span>
                    </div>
                    <p><strong>Question:</strong> {attempt.question}</p>
                    <p><strong>Observed:</strong> {attempt.result}</p>
                    <p><strong>Decision:</strong> {attempt.implication}</p>
                    {attempt.artifact && <a href={attempt.artifact}>Open evidence cut ↗</a>}
                  </li>
                ))}
              </ol>
            </article>
          );
        })}
      </section>

      <section id="literature">
        <div className="section-heading">
          <span>04</span>
          <div><p className="kicker">Selected literature</p><h2>Methods that define the ceiling or the missing layer.</h2></div>
        </div>
        <ol className="bibliography">
          {literature.map(([name, contribution, reading, href]) => (
            <li key={name}>
              <h3><a href={href}>{name} ↗</a></h3>
              <p><strong>{contribution}.</strong> {reading}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="evidence">
        <div className="section-heading">
          <span>05</span>
          <div><p className="kicker">Direct evidence</p><h2>Short cuts worth inspecting.</h2></div>
        </div>
        <ul className="evidence-list">
          {evidenceCuts.map(([label, href]) => <li key={href}><a href={href}>{label} ↗</a></li>)}
        </ul>
      </section>

      <footer>
        <p>This is a decision record, not a claim that every cited model ran successfully. “Not executed” marks blocked literature candidates; measured, inferred, authored, and synthetic outputs remain explicitly separate.</p>
        <p>Public release excludes private recordings, checkpoints, credentials, and machine-specific paths.</p>
      </footer>
    </main>
  );
}
