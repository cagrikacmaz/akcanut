// Traces the centre lines of the three hill bands and the two sea waves in the icon PNG.
// The result drives the opening line-art of the journey: an illustration that registers
// exactly with the real mark, which then fades in over it. The mark itself is never redrawn.
//
// Run after replacing the icon:  npm run line-art
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const ICON = 'src/assets/brand/akcanut-icon.png';
const OUT = 'src/components/journey/line-art.json';

const { data, info } = await sharp(ICON).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;

const px = (x, y) => {
  const i = (y * W + x) * 4;
  return [data[i], data[i + 1], data[i + 2], data[i + 3]];
};
const isGreen = ([r, g, b, a]) => a > 128 && g > r + 10 && g > b + 20;
const isNavy = ([r, g, b, a]) => a > 128 && b > r + 40 && b > g + 15;

/** Connected components (4-neighbourhood) of the pixels matching `test`, largest first. */
function components(test) {
  const seen = new Uint8Array(W * H);
  const found = [];
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const start = y * W + x;
      if (seen[start] || !test(px(x, y))) continue;
      const cells = [];
      const stack = [start];
      seen[start] = 1;
      while (stack.length) {
        const c = stack.pop();
        cells.push(c);
        const cx = c % W;
        const cy = (c - cx) / W;
        for (const [nx, ny] of [[cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]]) {
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
          const n = ny * W + nx;
          if (!seen[n] && test(px(nx, ny))) {
            seen[n] = 1;
            stack.push(n);
          }
        }
      }
      if (cells.length > 2000) found.push(cells);
    }
  }
  return found.sort((a, b) => b.length - a.length);
}

/** Centre line of a band: midpoint of its vertical extent in every column thick enough to count. */
function centreLine(cells) {
  const top = new Map();
  const bottom = new Map();
  for (const c of cells) {
    const x = c % W;
    const y = (c - x) / W;
    top.set(x, Math.min(top.get(x) ?? Infinity, y));
    bottom.set(x, Math.max(bottom.get(x) ?? -Infinity, y));
  }
  const xs = [...top.keys()].sort((a, b) => a - b);
  const thickness = (x) => bottom.get(x) - top.get(x);
  // The shell cuts each band's left end at an angle, which bends a naive centre line.
  // Start where the band reaches most of its typical thickness; the right ends taper naturally.
  const sorted = xs.map(thickness).sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)];
  const minStart = xs[0] + 0.08 * (xs[xs.length - 1] - xs[0]);
  const start = xs.findIndex((x) => x >= minStart && thickness(x) >= 0.85 * median);
  const points = [];
  for (const x of xs.slice(start)) {
    if (thickness(x) >= 6) points.push([x, (top.get(x) + bottom.get(x)) / 2]);
  }
  return points;
}

/** Ramer-Douglas-Peucker simplification. */
function simplify(points, tolerance) {
  if (points.length < 3) return points;
  const [ax, ay] = points[0];
  const [bx, by] = points[points.length - 1];
  const len = Math.hypot(bx - ax, by - ay) || 1;
  let worst = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const [px_, py_] = points[i];
    const d = Math.abs((by - ay) * px_ - (bx - ax) * py_ + bx * ay - by * ax) / len;
    if (d > worst) {
      worst = d;
      index = i;
    }
  }
  if (worst <= tolerance) return [points[0], points[points.length - 1]];
  return [...simplify(points.slice(0, index + 1), tolerance).slice(0, -1), ...simplify(points.slice(index), tolerance)];
}

/** Smooth path through the points (Catmull-Rom converted to cubic Bezier). */
function smoothPath(points) {
  const f = (n) => Math.round(n * 10) / 10;
  let d = `M${f(points[0][0])} ${f(points[0][1])}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

function bandPaths(test, expected, label) {
  const bands = components(test).slice(0, expected);
  if (bands.length !== expected) throw new Error(`Expected ${expected} ${label} bands, found ${bands.length}`);
  return bands
    .map((cells) => centreLine(cells))
    .sort((a, b) => a.reduce((s, p) => s + p[1], 0) / a.length - b.reduce((s, p) => s + p[1], 0) / b.length)
    .map((points) => smoothPath(simplify(points, 1.5)));
}

const result = {
  width: W,
  height: H,
  hills: bandPaths(isGreen, 3, 'hill'),
  waves: bandPaths(isNavy, 2, 'wave'),
};
await writeFile(OUT, `${JSON.stringify(result, null, 2)}\n`);
console.log(`${OUT}: ${result.hills.length} hills, ${result.waves.length} waves, viewBox 0 0 ${W} ${H}`);
