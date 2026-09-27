// Mobile menu: a disclosure button that shows and hides the section links.
const nav = document.querySelector<HTMLElement>('[data-nav]');
const toggle = nav?.querySelector<HTMLButtonElement>('[data-nav-toggle]');
const label = toggle?.querySelector<HTMLElement>('[data-nav-label]');

if (nav && toggle && label) {
  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    label.textContent = (open ? toggle.dataset.labelClose : toggle.dataset.labelOpen) ?? '';
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));

  nav.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
}
