const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/tennis-cv";

const routes = [
  ["Research log", "70 materially different attempts with question, observed result, decision, status, literature, and direct evidence."],
  ["Visual evidence", "80 pixel-reviewed public examples selected from 482 candidates. Retrieval narrows candidates; a person still verifies the frame."],
  ["Serve Motion Lab", "A teaching surface based on Mark Kovacs source doctrine. Schematics and drills are authored; quoted coaching claims link to the videos."],
  ["Contact Lab", "A declared synthetic mechanics sandbox. It explains pocketing, felt, stringbed, and coupled impact without claiming measured real-stroke parameters."],
  ["Tennis Motion Lab", "The any-video research position: start with body-local pose, validate transport on known 3D, and require a held-out view before accurate free-camera claims."],
  ["Practice Court", "A retained source index for coaches, academies, athletes, and research. It is discovery material, not biomechanical measurement."],
  ["Mark Kovacs", "Primary-source serve doctrine behind the serve drills, separated from the authored Jerry-specific application."],
  ["Roman Prokes", "Primary-source racquet customization doctrine, dated product examples, and a separate application to Jerry's setup."],
] as const;

const status = [
  ["Body", "Monocular body recovery repeated and calibrated body reprojection passed. This does not provide racket, grip, ball, or contact truth."],
  ["Racket", "Detection and manual silhouettes are useful; automatic continuous rigid pose failed the acceptance gates."],
  ["Ball/contact", "One clear clip supports useful 2D tracking. Contact remains a bracket unless an observation or synchronized view proves it."],
  ["Capture", "The next durable input is owned synchronized, calibrated, high-frame-rate capture with known scale and a marked racket."],
] as const;

export default function LedgerPage() {
  return (
    <main>
      <a className="page-back" href={`${basePath}/`}>← Tennis CV home</a>
      <header className="masthead">
        <p className="kicker">Bounded route rebuild · August 2026</p>
        <h1>Use CV. Prove each layer.</h1>
        <p className="abstract">The original 75-version provider source was not recoverable. This source-controlled ledger rebuild preserves the decision boundary: executed evidence, failed routes, references, authored teaching, and next tests stay visibly separate.</p>
      </header>

      <section>
        <div className="section-heading"><span>01</span><div><p className="kicker">Current truth</p><h2>What survived the work.</h2></div></div>
        <ul className="ledger-list">
          {status.map(([name, note]) => <li key={name}><strong>{name}</strong><p>{note}</p></li>)}
        </ul>
      </section>

      <section>
        <div className="section-heading"><span>02</span><div><p className="kicker">Program routes</p><h2>One deployment, explicit evidence jobs.</h2></div></div>
        <ul className="ledger-list">
          {routes.map(([name, note]) => <li key={name}><strong>{name}</strong><p>{note}</p></li>)}
        </ul>
      </section>

      <section>
        <div className="section-heading"><span>03</span><div><p className="kicker">Next comparison</p><h2>One owned serve. Two CV paths. One acceptance test.</h2></div></div>
        <div className="findings">
          <p><strong>Monocular baseline.</strong> Run the clean body route without an identity splice and overlay every source frame before showing a new camera.</p>
          <p><strong>Same serve, multi-view.</strong> Film rear and side synchronously. A held-out view determines whether the reconstruction is actually more accurate.</p>
          <p><strong>Solve the object separately.</strong> Track a marked racket, then optimize one rigid palm-to-handle transform. Do not infer it from the body mesh.</p>
          <p><strong>Accept or reject.</strong> Compare pelvis, trunk, shoulder, elbow, hand, racket face, contact, and finish against the source before publication.</p>
        </div>
      </section>

      <footer>
        <p>This is a source-backed rebuild, not an export of the unrecovered provider repository. The former owner-only route ledger is retired only after this route is live and checked.</p>
      </footer>
    </main>
  );
}
