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

test("server-renders the finished evidence page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Tennis Contact Evidence<\/title>/i);
  assert.match(html, /Use CoTracker for ball center\. Use SAM 2 for racket silhouette\./);
  assert.match(html, /54 \/ 57/);
  assert.match(html, /0\.99 px/);
  assert.match(html, /76 \/ 76 frames reviewed/);
  assert.match(html, /not 3D contact, grip, racket-face orientation, or spin/i);
  assert.doesNotMatch(html, /codex-preview|starter loading skeleton|Your site is taking shape/i);
});

test("ships every playable artifact and machine receipt", async () => {
  const root = new URL("../public/", import.meta.url);
  const required = [
    "media/accepted-2d-evidence.mp4",
    "media/raw-cotracker3.mp4",
    "media/raw-sam2.mp4",
    "receipts/human-audit.json",
    "receipts/cotracker3.json",
    "receipts/sam2.1.json",
    "receipts/combined.json",
  ];

  await Promise.all(required.map((path) => access(new URL(path, root))));
});
