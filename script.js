// =============================================
//  Leonardo Savério Portfolio — script.js
// =============================================

'use strict';

/* =========  TYPED TEXT (HERO)  ========= */
const typedRoles = [
  'Full Stack Developer',
  'AI & Cloud Researcher',
  'DevOps & Automation',
  'NestJS · Spring · Python',
  'AWS Architect',
];

let roleIndex = 0, charIndex = 0, erasing = false, typedTimeout;

function typeEffect() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const current = typedRoles[roleIndex];

  if (!erasing) {
    el.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      erasing = true;
      typedTimeout = setTimeout(typeEffect, 2000);
      return;
    }
  } else {
    el.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      erasing = false;
      roleIndex = (roleIndex + 1) % typedRoles.length;
      typedTimeout = setTimeout(typeEffect, 400);
      return;
    }
  }

  typedTimeout = setTimeout(typeEffect, erasing ? 45 : 80);
}

/* =========  NAVBAR  ========= */
function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  // Scroll behaviour
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    updateActiveLink();
  }, { passive: true });

  // Hamburger
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('mobile-open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('mobile-open');
    });
  });
}

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.scrollY + 120;
  const links    = document.querySelectorAll('.nav-links a');

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      links.forEach(l => l.classList.remove('active'));
      const target = document.querySelector(`.nav-links a[href="#${section.id}"]`);
      if (target) target.classList.add('active');
    }
  });
}

/* =========  SCROLL REVEAL  ========= */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* =========  PARTICLES  ========= */
function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const count = 28;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'hero-particle';
    const size = Math.random() * 3 + 1;
    const tx = (Math.random() - 0.5) * 60;
    const ty = (Math.random() - 0.5) * 60;
    Object.assign(dot.style, {
      width:  `${size}px`,
      height: `${size}px`,
      left:   `${Math.random() * 100}%`,
      top:    `${Math.random() * 100}%`,
      '--dur':   `${Math.random() * 6 + 4}s`,
      '--delay': `${Math.random() * 4}s`,
      '--tx':    `${tx}px`,
      '--ty':    `${ty}px`,
    });
    container.appendChild(dot);
  }
}

/* =========  SMOOTH SCROLL  ========= */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* =========  STACK TAGS HOVER RIPPLE  ========= */
function initTagEffects() {
  document.querySelectorAll('.stack-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.2s ease';
    });
  });
}

/* =========  BACK TO TOP  ========= */
function initBackToTop() {
  document.querySelector('.footer-logo')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* =========  INIT  ========= */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initParticles();
  initSmoothScroll();
  initTagEffects();
  initBackToTop();

  // Start typed text with a small delay
  setTimeout(typeEffect, 800);

  // Mark navbar scrolled if landing mid-page
  if (window.scrollY > 60) {
    document.getElementById('navbar')?.classList.add('scrolled');
  }
});
