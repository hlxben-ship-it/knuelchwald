# Knülchwald

Hand-drawn, roughly true-to-scale plan of the Streuobstwiese — a static web app (no build, no backend).

- `index.html` — renders the plan from the data (SVG, watercolour/ink look), plant tag as modal
- `garden.json` — all data: boundary in meters, plants with position, size today / in 10 years, Ernte, Hinweis, Pflanzdatum
- `manifest.webmanifest`, `icon.svg` — installable as a home-screen web app

- `tiles/` — the watercolour drawing pre-rendered as JPEG tiles (3 zoom levels × heute / in 10 Jahren); the phone never runs the SVG filters, it only shows tiles and keeps text + tap targets as live SVG

Local: `./start_knuelchwald.ps1` → http://localhost:5197

**After changing the drawing** (positions, sizes, new plants — not dates or texts): with the local server running, `npm i` once, then `npm run tiles`, and commit `tiles/`.

Deploy: GitHub Pages from `main`, folder `/ (root)` → https://hlxben-ship-it.github.io/knuelchwald/
