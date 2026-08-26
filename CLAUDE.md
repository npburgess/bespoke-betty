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

- `bespokebetty.com.au` — DNS at **Netregistry** (Webcentral group). At launch change only the
  web records (apex/www → Netlify); leave all mail records alone. See `docs/dns-and-email.md`.
- Domain email: **already live on Proton Mail** (e.g. `miriam@bespokebetty.com.au`), admin at
  account.proton.me — NOT Webcentral hosting. So the domain **sends real mail**: don't hard-lock
  anti-spoofing. MX/DKIM/DMARC are set; SPF exists **only as a deprecated SPF-type record** (which
  receivers ignore) — republish it as a **TXT** record: `v=spf1 include:_spf.protonmail.ch ~all`
  at the apex (details in the doc). No Cloudflare move needed for email — Proton already handles it.

## Deploy

- `npm run build` (build-verify before every push — Netlify bills per production deploy).
- Batch changes into one push; use `[skip ci]` for working-artifact-only commits.
- Contact form = Netlify Forms; after first deploy add an email notification in the Netlify UI.

## Content still to swap

Placeholder grey PNGs in `public/images/` stand in for real photos; hero/about/contact copy is
in `index.astro`. OG card source is `project/og-card.html` (rasterize to `public/images/og-card.png`).
