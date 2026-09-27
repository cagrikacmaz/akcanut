// Loads Leaflet only when the Origin map is about to scroll into view, so the library,
// its CSS and the map tiles never cost anything to visitors who do not get that far.
import leafletCss from 'leaflet/dist/leaflet.css?url';

const container = document.querySelector<HTMLElement>('[data-origin-map]');

if (container && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      void initMap(container);
    },
    { rootMargin: '500px 0px' },
  );
  observer.observe(container);
}

function loadStylesheet(href: string) {
  return new Promise<void>((resolve) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = link.onerror = () => resolve();
    document.head.append(link);
  });
}

async function initMap(el: HTMLElement) {
  const [L] = await Promise.all([import('leaflet'), loadStylesheet(leafletCss)]);
  const lat = Number(el.dataset.lat);
  const lon = Number(el.dataset.lon);

  el.replaceChildren();
  const map = L.map(el, {
    center: [lat, lon],
    zoom: 9,
    minZoom: 5,
    maxZoom: 13,
    // Page scrolling must never be captured by the map.
    scrollWheelZoom: false,
    dragging: !L.Browser.mobile,
    attributionControl: true,
  });
  map.attributionControl.setPrefix('<a href="https://leafletjs.com">Leaflet</a>');

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // The marker shows the town centre only.
  L.marker([lat, lon], {
    icon: L.divIcon({ className: 'origin-pin', iconSize: [18, 18] }),
    title: el.dataset.place ?? '',
    alt: el.dataset.place ?? '',
    keyboard: true,
  })
    .addTo(map)
    .bindTooltip(el.dataset.place ?? '', {
      permanent: true,
      direction: 'right',
      offset: [12, 0],
      className: 'origin-pin-label',
    });
}
