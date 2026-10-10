'use strict';

function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!navbar || !hamburger || !navLinks) return;

  const setMenuOpen = (open) => {
    hamburger.classList.toggle('open', open);
    navLinks.classList.toggle('mobile-open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    updateActiveLink();
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    setMenuOpen(hamburger.getAttribute('aria-expanded') !== 'true');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setMenuOpen(false);
      hamburger.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) setMenuOpen(false);
  });
}

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const activeSection = [...sections].reverse().find((section) =>
    window.scrollY + 120 >= section.offsetTop
  );
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const active = activeSection && link.getAttribute('href') === `#${activeSection.id}`;
    link.classList.toggle('active', Boolean(active));
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  elements.forEach((element) => observer.observe(element));
}

function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (let i = 0; i < 28; i += 1) {
    const dot = document.createElement('span');
    dot.className = 'hero-particle';
    const size = Math.random() * 3 + 1;
    Object.assign(dot.style, {
      width: `${size}px`, height: `${size}px`,
      left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
      '--dur': `${Math.random() * 6 + 4}s`, '--delay': `${Math.random() * 4}s`,
      '--tx': `${(Math.random() - 0.5) * 60}px`, '--ty': `${(Math.random() - 0.5) * 60}px`,
    });
    container.appendChild(dot);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initParticles();
  updateActiveLink();
  document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 60);
});
