/* MARÉ 2026 — dependency-free interaction layer. No requests or user data persistence. */
(() => {
  'use strict';
  document.documentElement.classList.add('js');

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav = $('#site-nav');
  const menuButton = $('.mobile-menu-btn');
  const searchForm = $('#job-search-form');
  const rankSelect = $('#rank');
  const vesselSelect = $('#vessel');
  const jobCards = $$('.job-card');
  const results = $('#opportunities');
  const jobDialog = $('#job-dialog');
  const contactDialog = $('#contact-dialog');
  const contactForm = $('#contact-form');
  const contactSuccess = $('#contact-success');

  $('#current-year').textContent = String(new Date().getFullYear());

  function closeMenu() {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
  }
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    nav.classList.toggle('open', !expanded);
    menuButton.setAttribute('aria-expanded', String(!expanded));
    menuButton.setAttribute('aria-label', expanded ? 'Open menu' : 'Close menu');
  });
  $$('.main-nav a').forEach(link => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 840) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  function applyFilters(scroll = false) {
    const rank = rankSelect.value;
    const vessel = vesselSelect.value;
    let visible = 0;
    jobCards.forEach(card => {
      const matches = (rank === 'all' || card.dataset.rank === rank) &&
        (vessel === 'all' || card.dataset.vessel === vessel);
      card.hidden = !matches;
      if (matches) visible += 1;
    });
    $('#visible-count').textContent = String(visible).padStart(2, '0');
    $('#no-results').hidden = visible > 0;
    if (scroll) results.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'start' });
  }
  searchForm.addEventListener('submit', event => { event.preventDefault(); applyFilters(true); });
  function resetFilters() {
    rankSelect.value = 'all';
    vesselSelect.value = 'all';
    applyFilters();
  }
  $('#reset-filters').addEventListener('click', resetFilters);
  $('#empty-reset').addEventListener('click', resetFilters);

  function showDialog(dialog) {
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
      document.body.classList.add('dialog-open');
    }
  }
  function closeDialog(dialog) {
    dialog.close();
  }
  [jobDialog, contactDialog].forEach(dialog => {
    dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
    dialog.addEventListener('click', event => {
      // Clicking outside the dialog's bounding rectangle closes it.
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeDialog(dialog);
    });
  });
  $$('[data-close-dialog]').forEach(button => button.addEventListener('click', () => closeDialog(button.closest('dialog'))));
  jobCards.forEach(card => {
    const openJob = () => {
      $('#job-dialog-title').textContent = card.dataset.title;
      $('#dialog-ship').textContent = card.dataset.ship;
      $('#dialog-route').textContent = card.dataset.route;
      $('#dialog-contract').textContent = card.dataset.contract;
      $('#dialog-salary').textContent = card.dataset.salary;
      showDialog(jobDialog);
    };
    $('.job-open', card).addEventListener('click', openJob);
    card.addEventListener('click', event => { if (!event.target.closest('button')) openJob(); });
  });
  $$('[data-open-contact]').forEach(button => button.addEventListener('click', () => {
    contactForm.hidden = false;
    contactSuccess.hidden = true;
    contactForm.reset();
    showDialog(contactDialog);
  }));
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    // Deliberately do not transmit, save, or log demo form data.
    contactForm.reset();
    contactForm.hidden = true;
    contactSuccess.hidden = false;
  });

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    $$('.reveal').forEach(element => observer.observe(element));
  } else {
    $$('.reveal').forEach(element => element.classList.add('visible'));
  }
})();