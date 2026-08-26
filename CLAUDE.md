# CLAUDE.md — Bespoke Betty

Showcase site for Bespoke Betty (handmade, made-to-order shirts, hoodies, jumpers, cushions).
Inherits the freelance grouping conventions (`../CLAUDE.md`); this file is authoritative for
project-specifics.

## Ownership (deliberate split)

It's the owner's sister's site, maintained indefinitely by the owner. Ownership is split on
purpose — **code with the owner, infrastructure with Betty** — and the two share credentials:

- **GitHub repo**: under **npburgess** (owner) — `git@github-npburgess:npburgess/bespoke-betty.git`.
  Betty's dedicated **`bespokebetty`** GitHub account is a **collaborator** (write) so she can edit
  via the CMS; she doesn't code.
- **Netlify + Cloudflare**: under the **`bespokebetty`** account (Betty owns hosting/infra).
- **Cross-account note:** because Netlify (Betty) connects to a repo owned by npburgess, the
  **Netlify GitHub App must be approved on the npburgess repo** — npburgess does that one-time via
  shared access. Same idea for any GitHub App touching the repo.
- The CMS OAuth app / Sveltia auth worker live under Betty's accounts (infra), secrets in her
  Cloudflare worker.

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
