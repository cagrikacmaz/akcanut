// Builds the two SVG maps for the journey from Natural Earth coastlines (public domain,
// via the world-atlas package): a close regional view of the Black Sea coast and a wide
// view from Türkiye to Kenya. Output is plain path data; nothing here ships to the browser.
//
// Run after changing places or routes:  npm run map
import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { geoArea, geoGraticule, geoMercator } from 'd3-geo';
import { feature } from 'topojson-client';

const require = createRequire(import.meta.url);
const OUT = 'src/components/journey/map-data.json';

// Town centres only; no farm location is ever marked.
const PLACES = {
  akcakoca: [31.1167, 41.0867],
  istanbul: [28.9784, 41.0082],
  nairobi: [36.8219, -1.2921],
  mombasa: [39.6682, -4.0435],
};

// Stylised routes, drawn as smooth curves through these points (longitude, latitude).
const ROAD = [
  PLACES.akcakoca,
  [31.12, 40.9],
  [30.8, 40.76],
  [30.3, 40.75],
  [29.92, 40.78],
  [29.43, 40.81],
  [29.12, 40.96],
  PLACES.istanbul,
];
const SEA = [
  PLACES.istanbul,
  [28.6, 40.85],
  [27.5, 40.66],
  [26.7, 40.4],
  [26.15, 40.02],
  [25.7, 39.2],
  [25.85, 38.2],
  [26.35, 37.1],
  [26.75, 35.55],
  [29.5, 33.4],
  [32.3, 31.35],
  [32.55, 29.95],
  [33.4, 28.35],
  [34.4, 27.2],
  [36.2, 24.3],
  [38.4, 20.5],
  [40.6, 16.4],
  [42.4, 13.9],
  [43.45, 12.6],
  [45.2, 12.2],
  [48.5, 12.45],
  [51.9, 11.95],
  [51.75, 9.8],
  [50.7, 7.3],
  [49.2, 4.8],
  [47.0, 2.0],
  [44.4, -0.6],
  [42.0, -2.55],
  [40.45, -3.6],
  PLACES.mombasa,
];

const VIEWS = {
  regional: {
    data: 'world-atlas/land-10m.json',
    core: { lon: [27.9, 32.3], lat: [40.0, 42.1] },
    width: 600,
    tolerance: 0.6,
    // Landscape frame on portrait screens: keep plenty of map above and below it.
    pad: [0.25, 1.1],
    graticuleStep: 1,
    places: ['akcakoca', 'istanbul'],
    routes: { road: ROAD },
    labels: {
      blackSea: [30.55, 41.75],
      marmara: [28.35, 40.72],
    },
  },
  continental: {
    data: 'world-atlas/land-50m.json',
    core: { lon: [22, 56], lat: [-8, 45] },
    width: 600,
    tolerance: 0.9,
    pad: [0.45, 0.22],
    graticuleStep: 10,
    places: ['akcakoca', 'istanbul', 'nairobi', 'mombasa'],
    routes: { road: ROAD, air: 'air', sea: SEA },
    labels: {
      blackSea: [34.2, 43.2],
      mediterranean: [26.2, 33.5],
      redSea: [38.2, 21.2],
      indianOcean: [50.5, -3.5],
      turkiye: [34.5, 38.9],
      kenya: [37.9, 1.0],
    },
  },
};

const round = (n) => Math.round(n * 10) / 10;

/** Ramer-Douglas-Peucker on an open or closed polyline. */
function simplify(points, tolerance) {
  if (points.length < 3) return points;
  const [ax, ay] = points[0];
  const [bx, by] = points[points.length - 1];
  const len = Math.hypot(bx - ax, by - ay);
  let worst = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const [x, y] = points[i];
    const d = len === 0 ? Math.hypot(x - ax, y - ay) : Math.abs((by - ay) * x - (bx - ax) * y + bx * ay - by * ax) / len;
    if (d > worst) {
      worst = d;
      index = i;
    }
  }
  if (worst <= tolerance) return [points[0], points[points.length - 1]];
  return [...simplify(points.slice(0, index + 1), tolerance).slice(0, -1), ...simplify(points.slice(index), tolerance)];
}

const area = (ring) =>
  Math.abs(ring.reduce((s, [x, y], i) => {
    const [nx, ny] = ring[(i + 1) % ring.length];
    return s + x * ny - nx * y;
  }, 0) / 2);

/** Streams geometry through the projection (with clipping) and collects the resulting lines. */
function collect(projection, object) {
  const lines = [];
  let current = null;
  const stream = projection.stream({
    polygonStart() {},
    polygonEnd() {},
    lineStart() {
      current = [];
    },
    point(x, y) {
      current.push([x, y]);
    },
    lineEnd() {
      if (current?.length) lines.push(current);
      current = null;
    },
    sphere() {},
  });
  const geometries = object.type === 'FeatureCollection' ? object.features.map((f) => f.geometry) : [object.geometry ?? object];
  for (const geometry of geometries) streamGeometry(geometry, stream);
  return lines;
}

function streamGeometry(g, stream) {
  const line = (coords, closed) => {
    stream.lineStart();
    for (const c of closed ? coords.slice(0, -1) : coords) stream.point(c[0], c[1]);
    stream.lineEnd();
  };
  const polygon = (rings) => {
    stream.polygonStart();
    for (const r of rings) line(r, true);
    stream.polygonEnd();
  };
  if (g.type === 'Polygon') polygon(g.coordinates);
  else if (g.type === 'MultiPolygon') g.coordinates.forEach(polygon);
  else if (g.type === 'LineString') line(g.coordinates, false);
  else if (g.type === 'MultiLineString') g.coordinates.forEach((c) => line(c, false));
  else if (g.type === 'GeometryCollection') g.geometries.forEach((x) => streamGeometry(x, stream));
}

/**
 * A few tiny polygons in the 10m data are wound the wrong way, so on the sphere they
 * enclose everything except themselves and would fill the whole map. Drop them.
 */
function withoutInvertedPolygons(collection) {
  const features = (collection.features ?? [collection]).map((f) => {
    if (f.geometry.type !== 'MultiPolygon') return f;
    const coordinates = f.geometry.coordinates.filter((rings) => geoArea({ type: 'Polygon', coordinates: rings }) < 2 * Math.PI);
    return { ...f, geometry: { ...f.geometry, coordinates } };
  });
  return { type: 'FeatureCollection', features };
}

const toPath = (lines, closed) =>
  lines
    .map((pts) => `M${pts.map(([x, y]) => `${round(x)} ${round(y)}`).join('L')}${closed ? 'Z' : ''}`)
    .join('');

/** Smooth curve through points (Catmull-Rom as cubic Bezier). */
function smooth(points) {
  let d = `M${round(points[0][0])} ${round(points[0][1])}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${round(c1[0])} ${round(c1[1])} ${round(c2[0])} ${round(c2[1])} ${round(p2[0])} ${round(p2[1])}`;
  }
  return d;
}

/** A gentle flight arc: quadratic curve bowed to the west of the straight line. */
function arc([ax, ay], [bx, by], bow = 0.12) {
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  const len = Math.hypot(bx - ax, by - ay);
  // Unit normal pointing left of the direction of travel (west for a southward flight).
  const nx = (by - ay) / len;
  const ny = -(bx - ax) / len;
  return `M${round(ax)} ${round(ay)}Q${round(mx + nx * len * bow)} ${round(my + ny * len * bow)} ${round(bx)} ${round(by)}`;
}

async function buildView(name, view) {
  const topo = JSON.parse(await readFile(require.resolve(view.data), 'utf8'));
  const land = withoutInvertedPolygons(feature(topo, topo.objects.land));
  const { lon, lat } = view.core;
  const corners = { type: 'MultiPoint', coordinates: [[lon[0], lat[0]], [lon[1], lat[1]], [lon[0], lat[1]], [lon[1], lat[0]]] };
  const projection = geoMercator().fitWidth(view.width, corners);
  const [[, y0], [, y1]] = [projection([lon[0], lat[1]]), projection([lon[0], lat[0]])];
  const height = Math.round(y1 - y0);
  projection.translate([projection.translate()[0], projection.translate()[1] - y0]);

  // Land is kept well beyond the frame so the letterbox areas of any screen still show map.
  const padX = view.width * view.pad[0];
  const padY = height * view.pad[1];
  projection.clipExtent([[-padX, -padY], [view.width + padX, height + padY]]);

  const landLines = collect(projection, land)
    .map((ring) => simplify(ring, view.tolerance))
    .filter((ring) => ring.length > 3 && area(ring) > 6);

  const step = view.graticuleStep;
  const graticule = geoGraticule()
    .extent([[-40, -60], [120, 80]])
    .step([step, step]);
  const graticuleLines = collect(projection, { type: 'Feature', geometry: graticule() });

  const project = (p) => projection(p).map(round);
  const routes = {};
  for (const [key, points] of Object.entries(view.routes)) {
    routes[key] =
      points === 'air'
        ? arc(projection(PLACES.istanbul), projection(PLACES.nairobi))
        : smooth(points.map((p) => projection(p)));
  }

  const result = {
    viewBox: [0, 0, view.width, height],
    land: toPath(landLines, true),
    graticule: toPath(graticuleLines.map((l) => simplify(l, 0.5)), false),
    places: Object.fromEntries(view.places.map((k) => [k, project(PLACES[k])])),
    labels: Object.fromEntries(Object.entries(view.labels).map(([k, p]) => [k, project(p)])),
    routes,
  };
  const kb = (s) => `${(s.length / 1024).toFixed(1)} KB`;
  console.log(`${name}: ${view.width}x${height}, land ${kb(result.land)}, graticule ${kb(result.graticule)}`);
  return result;
}

const output = {};
for (const [name, view] of Object.entries(VIEWS)) output[name] = await buildView(name, view);
await writeFile(OUT, `${JSON.stringify(output)}\n`);
console.log(`Wrote ${OUT}`);
