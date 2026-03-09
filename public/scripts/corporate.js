/* ============================================
   KURAGE — 海月舎 v14 MHLW Magazine Style
   — Clean scroll reveals
   — Hero carousel
   — Magnetic buttons
   — Number counters
   ============================================ */

(function () {
  'use strict';

  function boot() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      setTimeout(boot, 50);
      return;
    }
    init();
  }

  function init() {

  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  gsap.registerPlugin(ScrollTrigger);


  /* ══════════════════════════════════
     HERO — Entrance animations
     ══════════════════════════════════ */
  gsap.from('.hero-brand__title', {
    opacity: 0, y: 40,
    duration: 1.2, ease: 'power3.out'
  });
  gsap.from('.hero-brand__sub', {
    opacity: 0, y: 20, duration: 0.8, delay: 0.3, ease: 'power3.out'
  });
  gsap.from('.hero-brand__desc', {
    opacity: 0, y: 20, duration: 0.8, delay: 0.4, ease: 'power3.out'
  });
  gsap.from('.hero-brand__msg', {
    opacity: 0, y: 20, duration: 0.8, delay: 0.5, ease: 'power3.out'
  });
  gsap.from('.hero-carousel', {
    opacity: 0, y: 40, duration: 1, delay: 0.6, ease: 'power3.out'
  });


  /* ══════════════════════════════════
     HERO CAROUSEL
     ══════════════════════════════════ */
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-carousel__dot');
  const prevBtn = document.querySelector('.hero-carousel__prev');
  const nextBtn = document.querySelector('.hero-carousel__next');
  let currentSlide = 0;
  let autoTimer = null;

  function goToSlide(i) {
    slides.forEach(s => s.classList.remove('is-active'));
    dots.forEach(d => d.classList.remove('is-active'));
    currentSlide = ((i % slides.length) + slides.length) % slides.length;
    slides[currentSlide].classList.add('is-active');
    dots[currentSlide].classList.add('is-active');
  }

  function startAuto() {
    autoTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
  }
  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  if (slides.length > 1) {
    if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); resetAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); resetAuto(); });
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goToSlide(i); resetAuto(); });
    });
    startAuto();
  }


  /* ══════════════════════════════════
     SCROLL REVEALS
     ══════════════════════════════════ */

  /* Section heads */
  gsap.utils.toArray('.sec-head').forEach(h => {
    gsap.from(h, {
      scrollTrigger: { trigger: h, start: 'top 88%' },
      opacity: 0, y: 30, duration: 0.8, ease: 'power3.out'
    });
  });

  /* KURAGE Index markers */
  gsap.utils.toArray('.kurage-index').forEach(idx => {
    gsap.from(idx, {
      scrollTrigger: { trigger: idx, start: 'top 90%' },
      opacity: 0, duration: 1.2, ease: 'power2.out'
    });
  });

  /* Article cards (new articles section) */
  gsap.utils.toArray('.article-card').forEach((c, i) => {
    gsap.from(c, {
      scrollTrigger: { trigger: c, start: 'top 88%' },
      opacity: 0, y: 40, duration: 0.8, delay: i * 0.1,
      ease: 'power3.out'
    });
  });

  /* Category cards */
  gsap.utils.toArray('.cat-card').forEach((c, i) => {
    gsap.from(c, {
      scrollTrigger: { trigger: c, start: 'top 88%' },
      opacity: 0, y: 40, duration: 0.8, delay: i * 0.1,
      ease: 'power3.out'
    });
  });

  /* Ranking items */
  gsap.utils.toArray('.rank-item').forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: { trigger: item, start: 'top 88%' },
      opacity: 0, y: 40, duration: 0.9, delay: i * 0.1,
      ease: 'power3.out'
    });
  });

  /* Series cards */
  gsap.utils.toArray('.series-card').forEach((c, i) => {
    gsap.from(c, {
      scrollTrigger: { trigger: c, start: 'top 88%' },
      opacity: 0, y: 40, duration: 0.8, delay: i * 0.1,
      ease: 'power3.out'
    });
  });

  /* About — intro + facts */
  gsap.from('.about-intro', {
    scrollTrigger: { trigger: '.about-intro', start: 'top 80%' },
    opacity: 0, y: 40, duration: 1
  });
  gsap.utils.toArray('.about-fact').forEach((f, i) => {
    gsap.from(f, {
      scrollTrigger: { trigger: f, start: 'top 88%' },
      opacity: 0, y: 20, duration: 0.7,
      delay: i * 0.08, ease: 'power3.out'
    });
  });

  /* About — number counters */
  document.querySelectorAll('.about-stat__v[data-count]').forEach(num => {
    const target = parseInt(num.dataset.count);
    if (isNaN(target)) return;
    ScrollTrigger.create({
      trigger: num, start: 'top 88%', once: true,
      onEnter: () => {
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target, duration: 2, ease: 'power2.out',
          onUpdate: () => { num.textContent = Math.round(obj.v); }
        });
      }
    });
  });

  /* Call */
  gsap.from('.call-title', {
    scrollTrigger: { trigger: '.call-title', start: 'top 80%' },
    opacity: 0, y: 40, duration: 1
  });
  gsap.from('.call-btn', {
    scrollTrigger: { trigger: '.call-btn', start: 'top 85%' },
    opacity: 0, y: 30, duration: 0.8, delay: 0.3
  });

  /* Vessels */
  gsap.utils.toArray('.vessel').forEach((v, i) => {
    gsap.from(v, {
      scrollTrigger: { trigger: v, start: 'top 88%' },
      opacity: 0, y: 40, duration: 0.9,
      delay: i * 0.12, ease: 'power3.out'
    });
  });

  /* Signal */
  gsap.from('.signal-title', {
    scrollTrigger: { trigger: '.signal-title', start: 'top 80%' },
    opacity: 0, y: 40, duration: 0.8
  });
  gsap.from('.signal-email', {
    scrollTrigger: { trigger: '.signal-email', start: 'top 85%' },
    opacity: 0, y: 30, duration: 0.8, ease: 'power3.out'
  });


  /* ══════════════════════════════════
     HEADER — Show after hero
     ══════════════════════════════════ */
  ScrollTrigger.create({
    trigger: '.z--hero',
    start: 'bottom 80%',
    onEnter: () => document.getElementById('hd').classList.add('is-visible'),
    onLeaveBack: () => document.getElementById('hd').classList.remove('is-visible')
  });


  /* ══════════════════════════════════
     MAGNETIC BUTTONS
     ══════════════════════════════════ */
  if (!isTouch) {
    document.querySelectorAll('[data-magnetic]').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.3, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
      });
    });
  }


  /* ══════════════════════════════════
     HAMBURGER MENU
     ══════════════════════════════════ */
  const ham = document.getElementById('ham');
  const mob = document.getElementById('mob');
  if (ham && mob) {
    ham.addEventListener('click', () => {
      ham.classList.toggle('is-open');
      mob.classList.toggle('is-open');
      document.body.style.overflow = mob.classList.contains('is-open') ? 'hidden' : '';
    });
    mob.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        ham.classList.remove('is-open');
        mob.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }


  /* ══════════════════════════════════
     SMOOTH ANCHOR SCROLL
     ══════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  } /* end init */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
