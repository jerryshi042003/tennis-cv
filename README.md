# Racket-Sports CV Research Log

A compact literature review and experiment ledger for tennis and table-tennis
computer vision.

**Live site:** https://jerry-tennis-contact-evidence.jshi392999.chatgpt.site

The page starts with the TT3D ping-pong reconstruction because it most clearly
shows the full evidence chain: observation, calibration, physical fitting,
reprojection, and residual inspection. It then records 70 materially different
attempts across body recovery, racket/ball/contact, capture geometry,
simulation, tracking, corpus design, and metric audits.

Repeated runs and cosmetic variants are consolidated into the experiment that
changed the decision. Every row states its question, observed result, and the
resulting decision. Failed, blocked, corrected, authored, synthetic, inferred,
and measured work remain visibly distinct.

## Public boundary

This repository includes the public reading interface and short evidence cuts.
It excludes private recordings, model checkpoints, credentials, local machine
paths, and bulky intermediate artifacts. Third-party papers, source footage,
and model outputs retain their respective rights; inclusion here does not claim
a blanket license.

## Verify

```sh
npm ci
npm test
```
