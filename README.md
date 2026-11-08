# Knülchwald

Hand-drawn, roughly true-to-scale plan of the Streuobstwiese — a static web app (no build, no backend).

- `index.html` — renders the plan from the data (SVG, watercolour/ink look), plant tag as modal
- `garden.json` — all data: boundary in meters, plants with position, size today / in 10 years, Ernte, Hinweis, Pflanzdatum
- `manifest.webmanifest`, `icon.svg` — installable as a home-screen web app

Local: `./start_knuelchwald.ps1` → http://localhost:5197

Deploy: GitHub Pages from `main`, folder `/ (root)` → https://hlxben-ship-it.github.io/knuelchwald/
