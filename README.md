# Faizan Bhat — Portfolio Site

A React + Tailwind single-page portfolio: About, Tools (Pherith, Daftaros eLab,
plus in-progress RDKit/KNIME projects), Publications, Teaching, Contact.

## Run it locally

```
npm install
npm run dev
```

Opens at http://localhost:5173

## Edit content

Everything lives in `src/App.jsx` — plain JSX, no CMS. Look for the
`[Faizan: replace this paragraph...]` note in the Teaching section and swap
in your real Preply details.

To add a finished RDKit/KNIME project, copy an existing `<ProjectCard ... />`
block in the "Tools & applications" section, fill in the real description,
change `status` to `{ label: "shipped", tone: "chlorophyll" }`, and add a
`links` array with the repo/demo URL.

## Deploy

### Option A — GitHub Pages
1. Push this folder to a new GitHub repo (e.g. `faizan0623/portfolio`).
2. Install the Pages helper: `npm install -D gh-pages`
3. In `package.json`, add:
   ```json
   "homepage": "https://faizan0623.github.io/portfolio",
   "scripts": { "deploy": "vite build && gh-pages -d dist" }
   ```
4. In `vite.config.js`, set `base: '/portfolio/'` (match your repo name).
5. Run `npm run deploy`.

### Option B — Vercel (simplest)
1. Push the repo to GitHub.
2. Go to vercel.com → New Project → import the repo.
3. Vercel auto-detects Vite; click Deploy. No config needed.

## Notes
- Publications list is pulled from your Google Scholar / journal listings —
  double check author order and journal formatting once more before this
  goes live.
- Fonts (Fraunces, Inter, IBM Plex Mono) load from Google Fonts CDN — no
  local font files to manage.
