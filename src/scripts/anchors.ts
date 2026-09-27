// Same-page section links (hero buttons, nav, "Back to top"). The browser's own smooth
// anchor scrolling can be cut short in some browsers and embedded views, leaving the
// address bar at #section while the page stays put. This handles the scroll itself,
// then checks it arrived and finishes the jump if it did not.

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function sectionFor(link: HTMLAnchorElement): HTMLElement | null {
  if (link.target || link.hasAttribute('download')) return null;
  const url = new URL(link.href, location.href);
  if (!url.hash || url.origin !== location.origin || url.pathname !== location.pathname) return null;
  return document.getElementById(decodeURIComponent(url.hash.slice(1)));
}

function arrived(target: HTMLElement): boolean {
  const top = target.getBoundingClientRect().top;
  const header = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  return Math.abs(top - header) < 24 || (top > header && atBottom);
}

document.addEventListener('click', (event) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
  const target = link && sectionFor(link);
  if (!link || !target) return;

  event.preventDefault();
  const hash = `#${target.id}`;
  if (location.hash !== hash) history.pushState(null, '', hash);

  const smooth = !reduceMotion.matches;
  const startY = window.scrollY;
  target.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant', block: 'start' });

  // Keyboard and screen reader users continue from the section they jumped to.
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });

  // Safety net: if the smooth scroll never got going, finish the jump. A visitor who
  // scrolls elsewhere mid-way has moved the page, so they are left where they are.
  const check = () => {
    if (!arrived(target) && Math.abs(window.scrollY - startY) < 8) {
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  };
  if (!smooth) return;
  if ('onscrollend' in window) {
    window.addEventListener('scrollend', check, { once: true });
    // A cancelled scroll may never fire scrollend.
    window.setTimeout(check, 2000);
  } else {
    window.setTimeout(check, 1500);
  }
});
