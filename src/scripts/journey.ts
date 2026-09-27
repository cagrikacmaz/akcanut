// "From the orchard to Nairobi": keeps the section's data-step in sync with the step
// crossing the middle of the screen. CSS does all the animation from that one attribute.
// With reduced motion (or without IntersectionObserver) nothing runs and the static
// version stays: the wide map with every route drawn, and the steps as a list.

const root = document.querySelector<HTMLElement>('[data-journey]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (root && 'IntersectionObserver' in window && !reduceMotion.matches) {
  enhance(root);
}

function enhance(section: HTMLElement) {
  section.classList.add('is-enhanced');
  section.dataset.step = '0';

  // The pinned layout makes this section much taller than the static one the browser
  // measured when it jumped to a #section link, so jump again to the right place.
  const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
  if (target && target !== section && section.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING) {
    requestAnimationFrame(() => target.scrollIntoView({ behavior: 'instant', block: 'start' }));
  }

  // Opening: draw the line art once, when the frame is well in view.
  const opening = section.querySelector<HTMLElement>('[data-journey-opening]');
  if (opening) {
    const openingObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          opening.classList.add('is-drawn');
          openingObserver.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    openingObserver.observe(opening);
  }

  // Steps: the one crossing the middle of the viewport is the active one.
  const steps = [...section.querySelectorAll<HTMLElement>('li[data-step]')];
  const counter = section.querySelector<HTMLElement>('[data-journey-count]');

  const setStep = (step: number) => {
    const value = String(step);
    if (section.dataset.step === value) return;
    section.dataset.step = value;
    if (counter && step > 0) counter.textContent = value.padStart(2, '0');
  };

  const stepObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const step = Number((entry.target as HTMLElement).dataset.step);
        if (entry.isIntersecting) setStep(step);
        else if (step === 1 && entry.boundingClientRect.top > 0) setStep(0);
      }
    },
    { rootMargin: '-50% 0px -50% 0px' },
  );
  steps.forEach((step) => stepObserver.observe(step));

  // Zoom-out geometry: where the close view must shrink to so that Akçakoca and
  // Istanbul land on their places on the wide map. Recomputed when the stage resizes.
  const stage = section.querySelector<HTMLElement>('[data-journey-stage]');
  const regional = section.querySelector<HTMLElement>('[data-map="regional"]');
  const continental = section.querySelector<HTMLElement>('[data-map="continental"]');
  if (!stage || !regional || !continental) return;

  // On phones the last card rests at the bottom of the screen; the wide map is sized to
  // end above it so Nairobi and Mombasa stay visible.
  const phone = window.matchMedia('(max-width: 59.99rem)');
  const lastStep = steps[steps.length - 1];
  const lastCard = lastStep?.querySelector<HTMLElement>('.step__card');

  const point = (frame: HTMLElement, place: string) => {
    const el = frame.querySelector<HTMLElement>(`[data-place="${place}"]`);
    return {
      x: frame.offsetLeft + Number(el?.dataset.x ?? 0) * frame.offsetWidth,
      y: frame.offsetTop + Number(el?.dataset.y ?? 0) * frame.offsetHeight,
    };
  };

  const measure = () => {
    if (phone.matches && lastStep && lastCard) {
      const padding = parseFloat(getComputedStyle(lastStep).paddingBottom) || 0;
      stage.style.setProperty('--card-space', `${Math.round(lastCard.offsetHeight + padding + 28)}px`);
    } else {
      stage.style.removeProperty('--card-space');
    }

    const ra = point(regional, 'akcakoca');
    const ri = point(regional, 'istanbul');
    const ca = point(continental, 'akcakoca');
    const ci = point(continental, 'istanbul');
    const regionalSpan = Math.hypot(ra.x - ri.x, ra.y - ri.y);
    if (!regionalSpan) return;
    const scale = Math.hypot(ca.x - ci.x, ca.y - ci.y) / regionalSpan;
    // Move the midpoint between the two towns onto its counterpart.
    const from = { x: (ra.x + ri.x) / 2 - regional.offsetLeft, y: (ra.y + ri.y) / 2 - regional.offsetTop };
    const to = { x: (ca.x + ci.x) / 2, y: (ca.y + ci.y) / 2 };
    regional.style.setProperty('--zoom-x', `${(to.x - regional.offsetLeft - scale * from.x).toFixed(1)}px`);
    regional.style.setProperty('--zoom-y', `${(to.y - regional.offsetTop - scale * from.y).toFixed(1)}px`);
    regional.style.setProperty('--zoom-s', scale.toFixed(4));
  };

  if ('ResizeObserver' in window) new ResizeObserver(measure).observe(stage);
  else measure();
  // Card heights change once the web fonts arrive.
  document.fonts?.ready.then(measure);
}
