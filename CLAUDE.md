# CLAUDE.md — Bespoke Betty

Showcase site for Bespoke Betty (handmade, made-to-order shirts, hoodies, jumpers, cushions).
Inherits the freelance grouping conventions (`../CLAUDE.md`); this file is authoritative for
project-specifics.

## Ownership (deliberate deviation)

The freelance handoff rule says the **client** owns GitHub + Netlify from day one. This project
**intentionally departs**: it's the owner's sister's site, maintained indefinitely by us.

- **GitHub**: private repo under **npburgess** (owner's personal account), remote via the
  `github-npburgess` SSH alias — `git@github-npburgess:npburgess/bespoke-betty.git`.
- **Netlify**: owner's account.
- Trade-off accepted: taking it fully independent later means an account transfer.

## Stack & shape

- Astro static, single scrolling page (`src/pages/index.astro`): hero · work · about · contact.
  `/success` is the contact form's thank-you page (noindex).
- Design: "Thread" direction — warm/soft, Fraunces × Inter, clay accent, dashed "stitch line"
  seams, rounded tiles (`--radius: 14px`). Rebrand via tokens in `src/styles/global.css`.
  Selected (option-2) from `project/mockups/homepage-direction/`.
- Self-editing via **Sveltia CMS** at `/admin` (GitHub OAuth) — Decap-compatible, maintained,
  commits direct to GitHub. Chose it over Decap + Netlify Identity/Git-Gateway because Git Gateway
  is frozen (security-only) even though Identity was un-deprecated (Feb 2026). Content lives in
  `src/content/work/*.md` (gallery) + `src/data/site.json` (copy); `index.astro` reads both.
  Login needs a `sveltia-cms-auth` Cloudflare worker (`config.yml` → `base_url`) + Betty as a repo
  collaborator; see `docs/editing.md`. Edits go live only once continuous deploy is connected.
- Fonts self-hosted via `@fontsource-variable/fraunces` + `@fontsource/inter`.

## Domain & email

- `bespokebetty.com.au`, currently at **Netregistry**. Point DNS at Netlify (DNS-only if it ends
  up on Cloudflare). Add email anti-spoofing DNS — **read existing records first**.
- Domain email: **undecided**. Built web-only. If Betty wants an address later, that's the
  trigger to move DNS to Cloudflare (free Email Routing).

## Deploy

- `npm run build` (build-verify before every push — Netlify bills per production deploy).
- Batch changes into one push; use `[skip ci]` for working-artifact-only commits.
- Contact form = Netlify Forms; after first deploy add an email notification in the Netlify UI.

## Content still to swap

Placeholder grey PNGs in `public/images/` stand in for real photos; hero/about/contact copy is
in `index.astro`. OG card source is `project/og-card.html` (rasterize to `public/images/og-card.png`).
