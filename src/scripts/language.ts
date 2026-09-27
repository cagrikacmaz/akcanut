// Language menu: a disclosure button with a list of links. Switching language keeps the
// visitor on the section they are reading. Also shows a one-time hint on the English page
// when the browser prefers another available language (never an automatic redirect).

const root = document.querySelector<HTMLElement>('[data-lang]');
const toggle = root?.querySelector<HTMLButtonElement>('[data-lang-toggle]');
const menu = root?.querySelector<HTMLElement>('[data-lang-menu]');
const HINT_KEY = 'akcanut:language-hint-dismissed';

/** Id of the section in view, so the new language opens at the same place. */
function currentSectionId(): string {
  let id = '';
  for (const section of document.querySelectorAll<HTMLElement>('main section[id]')) {
    if (section.getBoundingClientRect().top <= window.innerHeight * 0.4) id = section.id;
  }
  return id;
}

// Carry the section over on every language link (menu, hint and footer).
document.addEventListener('click', (event) => {
  const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[data-lang-link]');
  if (!link) return;
  const id = currentSectionId();
  const base = link.getAttribute('href')?.split('#')[0] ?? '';
  link.setAttribute('href', id ? `${base}#${id}` : base);
  if (link.hasAttribute('data-lang-hint-link')) rememberHintDismissed();
});

function rememberHintDismissed() {
  try {
    localStorage.setItem(HINT_KEY, '1');
  } catch {
    // Storage can be unavailable (private mode); the hint then simply shows again later.
  }
}

function hintDismissed(): boolean {
  try {
    return localStorage.getItem(HINT_KEY) === '1';
  } catch {
    return false;
  }
}

function hideHints() {
  root?.querySelectorAll<HTMLElement>('[data-lang-hint]').forEach((hint) => (hint.hidden = true));
}

if (root && toggle && menu) {
  const setOpen = (open: boolean, returnFocus = false) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    if (open) {
      hideHints();
      // Only one menu at a time: close the section menu on phones.
      document.querySelector<HTMLButtonElement>('[data-nav].is-open [data-nav-toggle]')?.click();
    }
    if (!open && returnFocus) toggle.focus();
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) setOpen(false, true);
  });

  // Close when a click or keyboard focus lands outside the language menu.
  document.addEventListener('click', (event) => {
    if (!menu.hidden && !root.contains(event.target as Node)) setOpen(false);
  });
  root.addEventListener('focusout', (event) => {
    const next = event.relatedTarget as Node | null;
    if (!menu.hidden && next && !root.contains(next)) setOpen(false);
  });

  // Hint for Turkish or Swahili browsers on the English page.
  const hints = [...root.querySelectorAll<HTMLElement>('[data-lang-hint]')];
  if (hints.length && !hintDismissed()) {
    const preferred = (navigator.languages?.length ? navigator.languages : [navigator.language]).map(
      (tag) => tag.toLowerCase().split('-')[0],
    );
    const match = preferred
      .map((lang) => hints.find((hint) => hint.dataset.langHint === lang))
      .find(Boolean);
    // Only when the browser prefers that language over English.
    const englishRank = preferred.indexOf('en');
    const matchRank = match ? preferred.indexOf(match.dataset.langHint ?? '') : -1;
    if (match && (englishRank === -1 || matchRank < englishRank)) match.hidden = false;
  }

  root.querySelectorAll<HTMLButtonElement>('[data-lang-hint-close]').forEach((button) =>
    button.addEventListener('click', () => {
      hideHints();
      rememberHintDismissed();
      toggle.focus();
    }),
  );
}
