# Editing the site (for Betty)

The site has a built-in editor at **`https://bespokebetty.com.au/admin`**. You log in with a
GitHub account, make changes in a simple form, and hit save — the site updates on its own a
minute or two later. You never touch code.

## What you can edit

- **Work pieces** — add, remove, reorder, and upload photos for the gallery. Each piece has a
  title, a category (e.g. "Shirts", "Cushions"), a photo, and a sort order (lower numbers show
  first).
- **Site text** — the homepage headline, intro, the "About" text, and the contact wording.

## How to make a change

1. Go to `bespokebetty.com.au/admin` and log in with GitHub.
2. Pick **Work pieces** or **Site text**.
3. Edit the fields (for a new gallery item, choose **New Work piece** and upload a photo).
4. Click **Save** / **Publish**.
5. Wait ~1–2 minutes, then refresh the live site to see the change.

Photos look best square-ish and around 1200×1200 pixels. If a photo is very large, it still
works — it just takes a moment longer to upload.

---

## One-time setup (for the developer — not needed after this)

The editor logs in via GitHub OAuth, which needs two things wired up once:

1. **Add Betty as a collaborator** on `npburgess/bespoke-betty` (Settings → Collaborators). She
   needs a free GitHub account; the invite lets her save edits.
2. **GitHub OAuth app + auth worker** (Sveltia's login relay):
   - Create a GitHub OAuth app (Settings → Developer settings → OAuth Apps).
     Authorization callback URL = the auth worker URL below + `/callback`.
   - Deploy [`sveltia-cms-auth`](https://github.com/sveltia/sveltia-cms-auth) to Cloudflare
     Workers (free tier). Set its `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` from the OAuth app.
   - Put the worker's URL into `public/admin/config.yml` → `backend.base_url`
     (replace `REPLACE-WITH-AUTH-WORKER.workers.dev`).

Until `base_url` points at a live worker, `/admin` loads but login won't complete. The live site
itself is unaffected — editing only becomes end-to-end once continuous deploy is connected in
Netlify, since saves land as commits that trigger a rebuild.
