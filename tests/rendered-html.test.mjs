import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the research log rather than the old result showcase", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Racket-Sports CV Research Log<\/title>/i);
  assert.match(html, /Ping-pong: observations become a testable 3D trajectory/);
  assert.match(html, /70<!-- --> materially different attempts/);
  assert.match(html, /CoTracker3 Offline ball tracking/);
  assert.match(html, /Bath 4D_56 marker reconstruction/);
  assert.match(html, /SeedVR2 3B restoration/);
  assert.match(html, /Axial-observability claim audit/);
  assert.doesNotMatch(html, /One real win: the ball stays tracked/);
  assert.doesNotMatch(html, /codex-preview|starter loading skeleton|Your site is taking shape/i);
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
