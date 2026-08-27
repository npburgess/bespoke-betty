# Bespoke Betty

Showcase site for **Bespoke Betty** — handmade, made-to-order shirts, hoodies, jumpers and
cushions. Single-page Astro site, statically built, hosted on Netlify. Not a shop — a portfolio
with a contact form.

Design direction: "Thread" — warm, soft, tactile. Fraunces (display) × Inter (body), clay accent
used with restraint, dashed "stitch line" seams and rounded gallery tiles. Rebrand via tokens in
`src/styles/global.css`.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output → dist/
npm run preview    # serve the built site
```

## Structure

```
src/
  layouts/base-layout.astro   # SEO/OG/JSON-LD, fonts, nav+footer wrapper
  components/                 # site-nav, site-footer
  pages/
    index.astro              # the whole page (hero · work · about · contact)
    success.astro            # contact-form thank-you (noindex)
  content/work/*.md          # gallery pieces (CMS-editable)
  data/site.json             # homepage copy (CMS-editable)
  styles/global.css          # design tokens — rebrand here
public/
  admin/                     # Sveltia CMS (editor at /admin) — see docs/editing.md
  images/work/*.png          # gallery placeholders — swap for Betty's photos
  images/betty.png           # about portrait placeholder
  robots.txt, sitemap.xml
project/
  og-card.html               # OG share-image source (rasterize to public/images/og-card.png)
  mockups/                   # design exploration (gitignored)
```

## Editing content

Content is CMS-editable via **Sveltia CMS** at `/admin` (GitHub login) — see
[docs/editing.md](docs/editing.md). Editable sources:

- **Gallery** — `src/content/work/*.md` (one file per piece; title, category, image, order).
- **Homepage copy** — `src/data/site.json` (hero, about, contact text).

Developers can edit those files directly; Betty edits them through `/admin`. Still to do by hand:

- **Photos** — replace the placeholders in `public/images/work/` and `public/images/betty.png`
  with real images (square, ~1200×1200), or upload them through `/admin`.
- **OG card** — author `project/og-card.html`, rasterize to `public/images/og-card.png` (1200×630).

## Contact form (Netlify Forms)

The form on the home page uses `data-netlify="true"` with a honeypot; submissions are captured
with no backend and the visitor lands on `/success`. **After the first deploy**, in Netlify:
Forms → `contact` → add an email notification to Betty's address.

## Deploy & hosting

- Repo: GitHub (npburgess), **public** (required so Betty's CMS commits + dev commits are both
  allowed to deploy — Netlify's free plan caps private repos at one Git contributor). No secrets
  are committed; all live in Netlify/Cloudflare env.
- Host: Netlify (npburgess) — site `bespoke-betty.netlify.app`, auto-deploys from `main`
  (`netlify.toml`). New Netlify sites are private by default → Visitor access set to Public.
- Domain: **live at `https://bespokebetty.com.au`** — DNS at Webcentral/Netregistry, apex A →
  `75.2.60.5`, `www` CNAME → `bespoke-betty.netlify.app` (redirects to apex), Let's Encrypt TLS
  auto-issued. Email is Proton (`miriam@`); its records were left untouched. See
  `docs/dns-and-email.md`.

## Documentation

- [docs/editing.md](docs/editing.md) — how to edit the site via `/admin` (for Betty), plus the
  one-time GitHub OAuth + auth-worker setup for the CMS.
- [docs/dns-and-email.md](docs/dns-and-email.md) — DNS at Netregistry, Proton Mail records (do not
  touch), the missing-SPF fix, and the launch DNS change plan for Netlify.
