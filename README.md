# Tennis CV — Contact Evidence

Frame-audited 2D ball and racket tracking on one real high-speed tennis clip.

**Live evidence:** https://jerry-tennis-contact-evidence.jshi392999.chatgpt.site

## Result

- CoTracker3 kept the prompted ball center on the visible ball through the
  racket-overlap window: 54/57 verified frames, 0.99 px median error.
- SAM 2.1 Tiny kept a racket silhouette attached for all 76 reviewed frames.
- The combined overlay is source-camera 2D evidence only.

This does **not** establish physical impact, 3D ball flight, spin, force, grip,
racket SE(3), face normal, string plane, or novel-view reconstruction.

## Public boundary

This repo contains the small public evidence site, three review videos, and
machine-readable receipts. It excludes checkpoints, private recordings, local
machine paths, the broader experiment archive, and credentials.

The source window is identified in `public/receipts/human-audit.json` as public
clip `uHCNOdZv5os`, frames 445–520. Source-video and model rights remain with
their respective owners; no blanket license is asserted over third-party media
or model outputs.

## Verify

```sh
npm ci
npm test
```
