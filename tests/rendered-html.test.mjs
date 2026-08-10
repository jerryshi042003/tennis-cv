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

test("ships real moving Alcaraz passes including leg-extension timing", async () => {
  const root = new URL("../public/motion-lab/", import.meta.url);
  const [html, audit, traceAudit, measureAudit, pathAudit, jumpAudit, phaseAudit, legAudit] = await Promise.all([
    readFile(new URL("index.html", root), "utf8"),
    readFile(new URL("alcaraz-racket-arm-reviewed.json", root), "utf8").then(JSON.parse),
    readFile(new URL("alcaraz-motion-trace.json", root), "utf8").then(JSON.parse),
    readFile(new URL("alcaraz-wrist-vs-elbow.json", root), "utf8").then(JSON.parse),
    readFile(new URL("alcaraz-racket-head-path.json", root), "utf8").then(JSON.parse),
    readFile(new URL("alcaraz-racket-jump-audit.json", root), "utf8").then(JSON.parse),
    readFile(new URL("alcaraz-racket-drop-rise.json", root), "utf8").then(JSON.parse),
    readFile(new URL("alcaraz-racket-rise-vs-legs.json", root), "utf8").then(JSON.parse),
    access(new URL("alcaraz-racket-arm-reviewed.mp4", root)),
    access(new URL("alcaraz-racket-arm-reviewed.jpg", root)),
    access(new URL("alcaraz-motion-trace.mp4", root)),
    access(new URL("alcaraz-motion-trace.jpg", root)),
    access(new URL("alcaraz-wrist-vs-elbow.mp4", root)),
    access(new URL("alcaraz-wrist-vs-elbow.jpg", root)),
    access(new URL("alcaraz-racket-head-path.mp4", root)),
    access(new URL("alcaraz-racket-head-path.jpg", root)),
    access(new URL("alcaraz-racket-jump-audit.mp4", root)),
    access(new URL("alcaraz-racket-jump-audit.jpg", root)),
    access(new URL("alcaraz-racket-drop-rise.mp4", root)),
    access(new URL("alcaraz-racket-drop-rise.jpg", root)),
    access(new URL("alcaraz-racket-rise-vs-legs.mp4", root)),
    access(new URL("alcaraz-racket-rise-vs-legs.jpg", root)),
  ]);
  assert.match(html, /One real Alcaraz serve → one dark arm-and-racket trace/);
  assert.match(html, /alcaraz-motion-trace\.mp4/);
  assert.match(html, /alcaraz-racket-arm-reviewed\.mp4/);
  assert.match(html, /Pass 03 · wrist below elbow · rejected/);
  assert.match(html, /alcaraz-wrist-vs-elbow\.mp4/);
  assert.match(html, /Pass 04 · racket-head path · partial/);
  assert.match(html, /alcaraz-racket-head-path\.mp4/);
  assert.match(html, /Pass 05 · two-jump source check/);
  assert.match(html, /alcaraz-racket-jump-audit\.mp4/);
  assert.match(html, /Pass 06 · racket drop → rise/);
  assert.match(html, /alcaraz-racket-drop-rise\.mp4/);
  assert.match(html, /Pass 07 · racket rise vs legs/);
  assert.match(html, /alcaraz-racket-rise-vs-legs\.mp4/);
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
  assert.equal(pathAudit.frames, 76);
  assert.equal(pathAudit.human_visual_centers_on_displayed_head, 76);
  assert.deepEqual(pathAudit.discontinuity_frames, [132, 139]);
  assert.equal(pathAudit.exact_duplicate_transitions, 0);
  assert.equal(pathAudit.verdict, "PARTIAL_OBJECT_ONLY_PATH__76_OF_76_ON_HEAD__TWO_DISCONTINUITIES");
  assert.equal(jumpAudit.decoded_frames, 6);
  assert.equal(jumpAudit.unique_decoded_frames, 6);
  assert.deepEqual(jumpAudit.source_frames, [131, 132, 133, 138, 139, 140]);
  assert.equal(jumpAudit.verdict, "PASS_BOTH_JUMPS_SOURCE_CONSISTENT_FAST_30FPS_MOTION");
  assert.equal(phaseAudit.decoded_frames, 16);
  assert.equal(phaseAudit.unique_decoded_frames, 16);
  assert.equal(phaseAudit.trophy_side_high_frame, 125);
  assert.equal(phaseAudit.racket_drop_frame, 129);
  assert.equal(phaseAudit.overhead_reach_frame, 134);
  assert.equal(phaseAudit.verdict, "PASS_CLEAR_SOURCE_VIEW_DROP_TO_RISE_TEACHING_PHASE");
  assert.equal(legAudit.decoded_frames, 16);
  assert.equal(legAudit.unique_decoded_frames, 16);
  assert.equal(legAudit.racket_rise_start_frame, 129);
  assert.equal(legAudit.visible_leg_extension_frame, 132);
  assert.equal(legAudit.displayed_frame_offset, 3);
  assert.equal(legAudit.minimum_landmark_visibility >= 0.8, true);
  assert.equal(legAudit.human_visual_review.displayed_landmark_positions_on_corresponding_body_part, 96);
  assert.equal(legAudit.verdict, "PASS_RACKET_RISE_PRECEDES_VISIBLE_LEG_EXTENSION_ON_SOURCE_CLOCK");
});
