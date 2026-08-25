# Bespoke Betty

Showcase site for **Bespoke Betty** — handmade, made-to-order shirts, hoodies, jumpers and
cushions. Single-page Astro site, statically built, hosted on Netlify. Not a shop — a portfolio
with a contact form.

Design direction: "Studio" — monochrome, precise, ink-only. Archivo (display) × Inter (body),
hairline modular grid, no accent colour. Rebrand via tokens in `src/styles/global.css`.

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
  styles/global.css          # design tokens — rebrand here
public/
  images/work/*.png          # gallery placeholders — swap for Betty's photos
  images/betty.png           # about portrait placeholder
  robots.txt, sitemap.xml
project/
  og-card.html               # OG share-image source (rasterize to public/images/og-card.png)
  mockups/                   # design exploration (gitignored)
```

## Content to swap in

- **Photos** — replace `public/images/work/01–06.png` and `public/images/betty.png` with real
  images (square, ~1200×1200). Update titles/categories in the `work` array in `index.astro`.
- **Copy** — hero, about, and contact text live in `src/pages/index.astro`.
- **OG card** — author `project/og-card.html`, rasterize to `public/images/og-card.png` (1200×630).

## Contact form (Netlify Forms)

The form on the home page uses `data-netlify="true"` with a honeypot; submissions are captured
with no backend and the visitor lands on `/success`. **After the first deploy**, in Netlify:
Forms → `contact` → add an email notification to Betty's address.

## Deploy & hosting

- Repo: GitHub (npburgess), private.
- Host: Netlify — connect the repo; build config comes from `netlify.toml`.
- Domain: `bespokebetty.com.au` (currently at Netregistry). Point DNS at Netlify; add
  email anti-spoofing DNS (read existing records first). Web-only for now — no domain email
  decided yet.

## Documentation

- (none yet — add `docs/` here if the project grows reference material.)
