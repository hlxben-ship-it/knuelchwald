// Pre-renders the watercolour plan into JPEG tiles: tiles/<state>/<level>/<row>_<col>.jpg
// Run after any change to garden.json that affects the drawing (positions, sizes, new plants):
//   npm run tiles        (needs `python -m http.server` or start_knuelchwald.ps1 running on :5197)
import { chromium } from "playwright";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = process.env.EDEN_URL || "http://localhost:5197/";
const LEVELS = [1, 2, 4];          // device pixels per sheet unit
const TILE = 512;                  // tile edge in device pixels
const STATES = ["jetzt", "in10"];

const out = join(ROOT, "tiles");
rmSync(out, { recursive: true, force: true });
const browser = await chromium.launch();
let W, H; const levels = [];
for (const [L, dsf] of LEVELS.entries()){
  for (const st of STATES){
    const page = await browser.newPage({ viewport: { width: 400, height: 400 }, deviceScaleFactor: dsf });
    await page.goto(`${BASE}?export=${st}`);
    await page.waitForFunction(() => document.body.dataset.ready);
    [W, H] = (await page.evaluate(() => document.body.dataset.ready)).split("x").map(Number);
    await page.setViewportSize({ width: W, height: H });
    await page.waitForTimeout(800);
    const unit = TILE / dsf, cols = Math.ceil(W / unit), rows = Math.ceil(H / unit);
    if (st === STATES[0]) levels.push({ dsf, tile: TILE, cols, rows });
    const dir = join(out, st, String(L)); mkdirSync(dir, { recursive: true });
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++){
      const x = c*unit, y = r*unit;
      await page.screenshot({ path: join(dir, `${r}_${c}.jpg`), type: "jpeg", quality: 82,
        clip: { x, y, width: Math.min(unit, W - x), height: Math.min(unit, H - y) } });
    }
    console.log(`${st} L${L} (dsf ${dsf}): ${cols}x${rows} tiles`);
    await page.close();
  }
}
await browser.close();
writeFileSync(join(out, "manifest.json"), JSON.stringify({ W, H, version: Date.now(), levels }, null, 1));
console.log("manifest:", W, "x", H);
