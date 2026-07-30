# milo.cloud

Personal site: fullscreen animated GIFs synced to an MP3 player, plus design
portfolio and 3D work. Deployed as a static site on Cloudflare Pages and
served from `milo.cloud`.

## What's here

```
index.html         GIF + MP3 player (homepage)
index2.html        alternate homepage
player.html        standalone player page
main.css
main.js
mp3s/              15 MP3 tracks for the player
imgs/              GIFs + player button PNGs
audio/             audio page
Design/            design portfolio (b.html, index.html, index3d.html)
3d/                A-Frame scene — loads all assets via absolute URLs to
                   milo.cloud/design/imgs/* (no local 3D files needed)
```

### Source assets not deployed

`_source-assets/` holds the original 3D-model `.zip` downloads (some over
Cloudflare's 25MB-per-file cap). Gitignored — kept locally only, in case
they're needed for a future three.js project.

## Deploy to Cloudflare Pages

### One-time setup

1. **Push to GitHub.** Create a new repo, then:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```

2. **Connect Cloudflare Pages.**
   - https://dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git
   - Select the repo.
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: `/` (root — site is already static)
   - Save and Deploy.

3. **Point `milo.cloud` at it.**
   - In the Pages project → Custom domains → Set up a custom domain → `milo.cloud`.
   - Cloudflare will hand you two **nameservers** (e.g. `leo.ns.cloudflare.com`, `mia.ns.cloudflare.com`).
   - Log into name.com → My Domains → milo.cloud → Name Servers → Replace the name.com ones with Cloudflare's.
   - Wait ~10 minutes for propagation. SSL is issued automatically.

### Ongoing

Every `git push` to `main` deploys. Preview deployments happen automatically
on PRs / non-main branches.

## Adding Next.js / three.js projects later

**three.js** is static JS — drop a folder in (e.g. `lab/my-scene/`) and it
works at `milo.cloud/lab/my-scene/`.

**Next.js** needs its own deploy because each Pages project = one build. Two
options:

- **Subdomains (recommended).** Deploy each Next.js app as its own Pages
  project, then add a custom domain like `app.milo.cloud` to it. Wildcard
  DNS makes this trivially extensible.
- **Path routing via Worker.** One Cloudflare Worker on `milo.cloud/*`
  routes `/app-a/*` to project A's Pages deployment, `/app-b/*` to B. Keeps
  the flat URL but more setup.

Next.js on Cloudflare: use `@cloudflare/next-on-pages` for full SSR, or
`next build && next export` if the app is purely static.

## Why Cloudflare Pages

- Unlimited bandwidth and requests on free tier (the GIFs + MP3s would blow
  through Vercel/Netlify's 100GB/month cap in days at the expected traffic).
- Same global CDN as paid customers — no throttle.
- Free SSL on the custom domain.
- 25MB per-file cap; 20,000 files per project.
