/**
 * JS Vanilla minimaliste pour Clower.
 * - Gestion du formulaire de contact (état de soumission, message accessible)
 * - Génération dynamique d'un sommaire clicable sur les pages article.
 */

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('no-js');

  const navToggles = document.querySelectorAll('[data-nav-toggle]');
  navToggles.forEach((toggle) => {
    const container = toggle.closest('[data-nav-container]');
    if (!container) return;
    const navId = toggle.getAttribute('aria-controls');
    const nav = navId ? document.getElementById(navId) : container.querySelector('[data-nav]');
    if (!nav) return;
    const srLabel = toggle.querySelector('.sr-only');

    const setState = (isOpen) => {
      container.dataset.menuOpen = isOpen ? 'true' : 'false';
      toggle.setAttribute('aria-expanded', String(isOpen));
      nav.setAttribute('data-open', String(isOpen));
      if (srLabel) {
        srLabel.textContent = isOpen ? 'Fermer le menu' : 'Ouvrir le menu';
      }
    };

    setState(container.dataset.menuOpen === 'true');

    toggle.addEventListener('click', () => {
      const isOpen = container.dataset.menuOpen === 'true';
      setState(!isOpen);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.matchMedia('(min-width: 768px)').matches) {
          return;
        }
        setState(false);
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && container.dataset.menuOpen === 'true') {
        setState(false);
        toggle.focus();
      }
    });
  });

  // Formulaire de contact : simulation d'envoi sobre sans dépendances.
  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    const status = contactForm.querySelector('[data-form-status]');
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const submitButton = contactForm.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.textContent = 'Envoi en cours…';
      status.textContent = 'Envoi en cours, merci de patienter.';
      // Simulation courte : sobriété, pas d'appel réseau réel.
      window.setTimeout(() => {
        status.textContent = 'Merci Maxime vous répondra sous 48h.';
        submitButton.textContent = 'Message envoyé';
      }, 900);
    });
  }

  // Sommaire des articles : construit à partir des titres h2/h3 pour limiter le JS.
  const toc = document.querySelector('[data-toc]');
  const article = document.querySelector('[data-article]');
  if (toc && article) {
    const headings = article.querySelectorAll('h2, h3');
    const list = document.createElement('ol');
    list.className = 'list-reset space-y-4';
    headings.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = heading.textContent
          .toLowerCase()
          .replace(/[^a-z0-9àâäéèêëîïôöùûüç\s-]/g, '')
          .replace(/\s+/g, '-');
      }
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      link.className = 'inline-link';
      item.appendChild(link);
      list.appendChild(item);
      // Insert numeric prefix for clarity on h2 only.
      if (heading.tagName === 'H2') {
        const number = document.createElement('span');
        number.className = 'badge-inline';
        number.textContent = `${index + 1}`;
        link.prepend(number);
      }
    });
    toc.appendChild(list);
  }
});
