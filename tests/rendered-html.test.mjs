import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("exports the consolidated research log rather than a Sites worker", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  assert.match(html, /<title>Racket-Sports CV Research Log<\/title>/i);
  assert.match(html, /Ping-pong: observations become a testable 3D trajectory/);
  assert.match(html, /70<!-- --> materially different attempts/);
  assert.match(html, /Open every surviving Tennis CV surface here/);
  assert.match(html, /Visual evidence/);
  assert.match(html, /Roman Prokes/);
  assert.match(html, /CoTracker3 Offline ball tracking/);
  assert.match(html, /Bath 4D_56 marker reconstruction/);
  assert.match(html, /SeedVR2 3B restoration/);
  assert.match(html, /Axial-observability claim audit/);
  assert.doesNotMatch(html, /One real win: the ball stays tracked/);
  assert.doesNotMatch(html, /codex-preview|starter loading skeleton|Your site is taking shape/i);
});

test("exports every consolidated route", async () => {
  const root = new URL("../out/", import.meta.url);
  const routes = [
    "visual-evidence/index.html",
    "ledger/index.html",
    "serve-motion-lab/index.html",
    "serve-motion-lab/contact.html",
    "motion-lab/index.html",
    "practice-court/index.html",
    "people/mark-kovacs/index.html",
    "people/roman-prokes/index.html",
  ];
  await Promise.all(routes.map((path) => access(new URL(path, root))));
});

test("ships the ping-pong demo and representative evidence cuts", async () => {
  const root = new URL("../public/", import.meta.url);
  const required = [
    "media/tt3d.mp4",
    "media/uplifting-table-tennis.mp4",
    "media/bath-4d56-two-view.mp4",
    "media/accepted-2d-evidence.mp4",
    "media/rigid-2d-composition.mp4",
    "media/per-frame-racket-review.mp4",
    "media/human-mask-failure-review.mp4",
  ];
  await Promise.all(required.map((path) => access(new URL(path, root))));
});

test("ships real moving Alcaraz passes and preserves the rejected measurement", async () => {
  const root = new URL("../public/motion-lab/", import.meta.url);
  const [html, audit, traceAudit, measureAudit] = await Promise.all([
    readFile(new URL("index.html", root), "utf8"),
    readFile(new URL("alcaraz-racket-arm-reviewed.json", root), "utf8").then(JSON.parse),
    readFile(new URL("alcaraz-motion-trace.json", root), "utf8").then(JSON.parse),
    readFile(new URL("alcaraz-wrist-vs-elbow.json", root), "utf8").then(JSON.parse),
    access(new URL("alcaraz-racket-arm-reviewed.mp4", root)),
    access(new URL("alcaraz-racket-arm-reviewed.jpg", root)),
    access(new URL("alcaraz-motion-trace.mp4", root)),
    access(new URL("alcaraz-motion-trace.jpg", root)),
    access(new URL("alcaraz-wrist-vs-elbow.mp4", root)),
    access(new URL("alcaraz-wrist-vs-elbow.jpg", root)),
  ]);
  assert.match(html, /One real Alcaraz serve → one dark arm-and-racket trace/);
  assert.match(html, /alcaraz-motion-trace\.mp4/);
  assert.match(html, /alcaraz-racket-arm-reviewed\.mp4/);
  assert.match(html, /Pass 03 · wrist below elbow · rejected/);
  assert.match(html, /alcaraz-wrist-vs-elbow\.mp4/);
  assert.doesNotMatch(html, /What the literature says|What this project tested|Next falsifiable experiment/);
  assert.equal(audit.frames, 76);
  assert.equal(audit.transport.decoded_frames, 76);
  assert.equal(audit.transport.exact_duplicate_transitions, 0);
  assert.equal(audit.verdict, "PASS_HUMAN_REVIEWED_SOURCE_CAMERA_RACKET_ARM");
  assert.equal(traceAudit.frames, 76);
  assert.equal(traceAudit.arm_frames, 76);
  assert.equal(traceAudit.racket_frames, 76);
  assert.equal(traceAudit.exact_duplicate_transitions, 0);
  assert.equal(traceAudit.verdict, "PASS_MINIMAL_SOURCE_CAMERA_MOTION_TRACE");
  assert.equal(measureAudit.frames, 76);
  assert.deepEqual(measureAudit.sign_transition_frames, [115, 129, 132, 137, 138, 139]);
  assert.equal(measureAudit.exact_duplicate_transitions, 0);
  assert.equal(measureAudit.verdict, "REJECTED_MODEL_BOUNDARY_FLICKER_NOT_TEACHING_TRUTH");
});
