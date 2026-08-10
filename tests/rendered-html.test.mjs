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
