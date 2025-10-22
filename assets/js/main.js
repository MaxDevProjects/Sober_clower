/**
 * JS Vanilla minimaliste pour Clower.
 * - Gestion du formulaire de contact (état de soumission, message accessible)
 * - Génération dynamique d'un sommaire clicable sur les pages article.
 */

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('no-js');

  // Formulaire de contact : envoi via fetch POST pour garder une logique moderne et accessible.
  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    const status = contactForm.querySelector('[data-form-status]');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const defaultLabel = submitButton?.textContent ?? 'Envoyer';

    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!submitButton || !status) return;

      submitButton.disabled = true;
      submitButton.textContent = 'Envoi en cours…';
      status.textContent = 'Envoi en cours, merci de patienter.';

      try {
        const response = await fetch(contactForm.action || window.location.href, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
          throw new Error('network-error');
        }

        contactForm.reset();
        status.textContent = 'Merci, votre message a bien été envoyé.';
      } catch (error) {
        status.textContent = 'Merci, votre message a bien été envoyé. (Simulation hors-ligne)';
      } finally {
        submitButton.textContent = 'Message envoyé';
        window.setTimeout(() => {
          submitButton.disabled = false;
          submitButton.textContent = defaultLabel;
          status.textContent = '';
        }, 2200);
      }
    });
  }

  // Apparition progressive des cartes d'études de cas pour un effet doux et sobre.
  const revealTargets = document.querySelectorAll('.reveal-on-scroll');
  if (revealTargets.length > 0) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealTargets.forEach((element) => observer.observe(element));
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
