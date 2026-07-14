/* ==========================================================================
   Alon Gallery — main.js
   ניווט · מצב כהה/בהיר · החלפת שפה · גלריה + לייטבוקס · טוסטים · פופאפ יציאה
   ========================================================================== */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ── THEME ──────────────────────────────────────────────────────────── */
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('ag-theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);

  document.querySelectorAll('.theme-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      localStorage.setItem('ag-theme', next);
    });
  });

  /* ── NAV SCROLL ─────────────────────────────────────────────────────── */
  const nav = document.getElementById('mainNav');
  if (nav && !nav.classList.contains('scrolled')) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── MOBILE MENU ────────────────────────────────────────────────────── */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu-close');
  const closeMenu = () => mobileMenu && mobileMenu.classList.remove('open');
  if (hamburger && mobileMenu) hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  if (mobileMenu) mobileMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));

  /* ── "עוד" DROPDOWN ── */
  const moreEl = document.querySelector('.nav-more');
  if (moreEl) {
    const moreBtn = moreEl.querySelector('.nav-more-btn');
    moreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = moreEl.classList.toggle('open');
      moreBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', (e) => {
      if (!moreEl.contains(e.target)) { moreEl.classList.remove('open'); moreBtn.setAttribute('aria-expanded', 'false'); }
    });
  }

  /* ── SCROLL-SPY (homepage sections → nav highlight) ── */
  const spyLinks = document.querySelectorAll('[data-spy]');
  if (spyLinks.length) {
    const heroEl = document.querySelector('.hero');
    const spyTargets = [];
    if (heroEl) spyTargets.push(heroEl);
    ['services', 'portfolio', 'about', 'blog', 'faq', 'contact'].forEach((id) => {
      const el = document.getElementById(id); if (el) spyTargets.push(el);
    });
    if (spyTargets.length) {
      const setActive = (id) => spyLinks.forEach((l) => l.classList.toggle('active', l.getAttribute('data-spy') === id));
      const spyO = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target === heroEl ? 'home' : e.target.id); });
      }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
      spyTargets.forEach((el) => spyO.observe(el));
    }
  }

  /* ── i18n ───────────────────────────────────────────────────────────── */
  const I18N = {
    'nav.home': 'Home', 'nav.gallery': 'Gallery', 'nav.about': 'About', 'nav.blog': 'Blog', 'nav.contact': 'Contact',
    'nav.services': 'Services', 'nav.faq': 'FAQ', 'nav.more': 'More',
    'hero.eyebrow': 'ART & PHOTOGRAPHY',
    'hero.title1': 'Photos that sell', 'hero.title2': 'the place',
    'hero.sub': "Cabin, real-estate and architecture photography in the north. A good photo brings clients. That's the whole story.",
    'hero.cta1': 'Portfolio', 'hero.cta2': 'Book a shoot',
    'stats.projects': 'Successful projects', 'stats.years': 'Years of experience', 'stats.happy': 'Happy clients', 'stats.hours': 'Turnaround',
    'services.label': 'Services', 'services.title': 'What I ', 'services.title.em': 'shoot',
    'services.sub': "Every property has its own character. I come, get it, and shoot it right.",
    'services.zimmer': 'Cabin Photography', 'services.zimmer.desc': 'Cabins, lodges and boutique stays. A photo that shows the vibe — and fills the calendar.',
    'services.realestate': 'Real Estate Photography', 'services.realestate.desc': 'Villas, apartments and commercial buildings. A professional photo shortens the sale, draws serious buyers and raises the price.',
    'services.interior': 'Interior Photography', 'services.interior.desc': "Interior design, hospitality and hotels. Right light, clean lines, every detail in place.",
    'services.more': 'More on this service →',
    'portfolio.label': 'Portfolio', 'portfolio.title.em': 'Selected', 'portfolio.title': 'work',
    'portfolio.sub': 'A small selection from hundreds of projects in the north.',
    'portfolio.cta': 'View full portfolio',
    'reviews.label': 'Reviews', 'reviews.title': 'What clients ', 'reviews.title.em': 'say',
    'reviews.cta': 'Leave a review', 'reviews.empty': 'No reviews yet',
    'cta.label': "Let's work together", 'cta.title': 'Time for photos that ', 'cta.title.em': 'bring clients',
    'cta.sub': "Every project starts with a call. A price quote within 24 hours. No obligation.", 'cta.btn1': 'Book a shoot',
    'footer.rights': '© 2025 Alon Gallery. All rights reserved.', 'footer.terms': 'Terms', 'footer.privacy': 'Privacy',
    'review.modal.title': 'Write a review', 'review.name.ph': 'Your name', 'review.text.ph': 'A few words about your experience',
    'review.send': 'Send review', 'review.pending': 'Your review will be published after approval',
    'contact.title': 'Get in ', 'contact.title.em': 'touch',
    'contact.sub': "New project? A question? Leave your details and get a quote within 24 hours. Simple and clear.",
    'contact.name': 'Full name *', 'contact.phone': 'Phone *', 'contact.email': 'Email', 'contact.service': 'Service type',
    'contact.chip1': 'Cabin photography', 'contact.chip2': 'Real estate', 'contact.chip3': 'Interior', 'contact.chip4': 'Other',
    'contact.msg': 'Message *', 'contact.send': 'Send message', 'contact.note': "I'll get back to you within 24 hours",
  };

  function translateNode(el, lang) {
    const key = el.getAttribute('data-i18n');
    if (!el.dataset.he) el.dataset.he = el.innerHTML;
    if (lang === 'en' && I18N[key] != null) el.textContent = I18N[key];
    else el.innerHTML = el.dataset.he;
  }
  function translatePlaceholder(el, lang) {
    const key = el.getAttribute('data-i18n-ph');
    if (!el.dataset.heph) el.dataset.heph = el.getAttribute('placeholder') || '';
    el.setAttribute('placeholder', lang === 'en' && I18N[key] != null ? I18N[key] : el.dataset.heph);
  }
  function applyLang(lang) {
    document.querySelectorAll('[data-i18n]').forEach((el) => translateNode(el, lang));
    document.querySelectorAll('[data-i18n-ph]').forEach((el) => translatePlaceholder(el, lang));
    root.setAttribute('lang', lang === 'en' ? 'en' : 'he');
    root.setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');
    document.body.classList.toggle('en', lang === 'en');
    document.querySelectorAll('.lang-btn').forEach((b) => (b.textContent = lang === 'en' ? 'עב' : 'EN'));
    localStorage.setItem('ag-lang', lang);
  }
  let curLang = localStorage.getItem('ag-lang') || 'he';
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => { curLang = curLang === 'en' ? 'he' : 'en'; applyLang(curLang); });
  });
  if (curLang === 'en') applyLang('en'); else document.querySelectorAll('.lang-btn').forEach((b) => (b.textContent = 'EN'));

  /* ── REVEAL ON SCROLL ───────────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach((el) => io.observe(el));
  }

  /* ── COUNTERS ───────────────────────────────────────────────────────── */
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target; cio.unobserve(el);
        const target = parseFloat(el.dataset.counter) || 0;
        const suffix = el.dataset.suffix || '';
        const dur = 1400; const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const val = Math.round(target * (1 - Math.pow(1 - p, 3)));
          el.textContent = val + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    counters.forEach((el) => cio.observe(el));
  }

  /* ── GALLERY (gallery.html) ─────────────────────────────────────────── */
  const galleryGrid = document.getElementById('galleryGrid');
  const GALLERY_COUNT = 35;
  const GALLERY_TAGS_HE = ['עיצוב פנים', 'אדריכלות', 'אירוח בוטיק', 'נדל״ן יוקרה', 'מרחבי מגורים', 'אור וטקסטורה'];
  const GALLERY_TAGS_EN = ['Interior Design', 'Architecture', 'Boutique Stays', 'Luxury Real Estate', 'Living Spaces', 'Light & Texture'];
  let galleryData = [];
  if (galleryGrid) {
    for (let i = 1; i <= GALLERY_COUNT; i++) {
      const num = String(i).padStart(2, '0');
      galleryData.push({
        src: `images/gallery-${num}.jpg`,
        he: GALLERY_TAGS_HE[(i - 1) % GALLERY_TAGS_HE.length],
        en: GALLERY_TAGS_EN[(i - 1) % GALLERY_TAGS_EN.length],
      });
    }
    galleryGrid.innerHTML = galleryData.map((g, i) => `
      <div class="masonry-item reveal" data-index="${i}">
        <img src="${g.src}" alt="${g.he} — Alon Gallery" loading="lazy">
        <div class="masonry-overlay">
          <div class="masonry-title">${g.he}</div>
          <div class="masonry-sub">צפון הארץ</div>
        </div>
        <div class="masonry-zoom"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg></div>
      </div>`).join('');
    // re-observe newly added reveal items
    const gio = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); gio.unobserve(e.target); } });
    }, { threshold: 0.05 });
    galleryGrid.querySelectorAll('.reveal').forEach((el) => gio.observe(el));
  }

  /* ── LIGHTBOX ───────────────────────────────────────────────────────── */
  const lb = document.getElementById('lightbox');
  if (lb) {
    const lbImg = document.getElementById('lbImg');
    const lbCaption = document.getElementById('lbCaption');
    const lbClose = document.getElementById('lbClose');
    const lbPrev = document.getElementById('lbPrev');
    const lbNext = document.getElementById('lbNext');
    let lbIndex = 0;

    const openLb = (i) => {
      lbIndex = i;
      const g = galleryData[i];
      if (!g) return;
      lbImg.src = g.src;
      lbImg.alt = g.he;
      if (lbCaption) lbCaption.textContent = curLang === 'en' ? g.en : g.he;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    const closeLb = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
    const step = (d) => openLb((lbIndex + d + galleryData.length) % galleryData.length);

    if (galleryGrid) {
      galleryGrid.addEventListener('click', (e) => {
        const item = e.target.closest('.masonry-item');
        if (item) openLb(parseInt(item.dataset.index, 10));
      });
    }
    if (lbClose) lbClose.addEventListener('click', closeLb);
    if (lbPrev) lbPrev.addEventListener('click', () => step(-1));
    if (lbNext) lbNext.addEventListener('click', () => step(1));
    lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowRight') step(curLang === 'en' ? 1 : -1);
      if (e.key === 'ArrowLeft') step(curLang === 'en' ? -1 : 1);
    });
  }

  /* ── GLOBAL HELPERS ─────────────────────────────────────────────────── */
  function ensureToastWrap() {
    let w = document.querySelector('.toast-wrap');
    if (!w) { w = document.createElement('div'); w.className = 'toast-wrap'; document.body.appendChild(w); }
    return w;
  }
  window.showToast = function (msg, type) {
    const wrap = ensureToastWrap();
    const t = document.createElement('div');
    t.className = 'toast' + (type ? ' ' + type : '');
    t.textContent = msg;
    wrap.appendChild(t);
    setTimeout(() => { t.style.transition = 'opacity .3s ease, transform .3s ease'; t.style.opacity = '0'; t.style.transform = 'translateY(-8px)'; }, 3200);
    setTimeout(() => t.remove(), 3600);
  };

  window.spinnerSVG = function (color) {
    color = color || 'currentColor';
    return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="animation:spin .8s linear infinite;vertical-align:middle">
      <circle cx="12" cy="12" r="9" stroke="${color}" stroke-opacity="0.25" stroke-width="3"/>
      <path d="M21 12a9 9 0 0 0-9-9" stroke="${color}" stroke-width="3" stroke-linecap="round"/></svg>`;
  };

  /* ── EXIT / SCROLL POPUP ────────────────────────────────────────────── */
  window.initExitPopup = function () {
    if (sessionStorage.getItem('ag-exit-shown')) return;
    let built = false, shown = false;
    const build = () => {
      if (built) return; built = true;
      const ov = document.createElement('div');
      ov.className = 'exit-popup-overlay';
      ov.innerHTML = `
        <div class="exit-popup">
          <button class="exit-popup-close" aria-label="סגור">✕</button>
          <div class="section-label" style="justify-content:center">רגע לפני שהולכים</div>
          <h3>תמונות ש<em>מביאות לקוחות</em></h3>
          <p>הצעת מחיר תוך 24 שעות. בלי התחייבות.</p>
          <div style="display:flex;gap:0.8rem;justify-content:center;flex-wrap:wrap">
            <a href="contact.html#contactForm" class="btn btn-primary">לתיאום צילום</a>
            <button class="btn btn-ghost" data-exit-dismiss>אולי אחר כך</button>
          </div>
        </div>`;
      document.body.appendChild(ov);
      const close = () => { ov.classList.remove('open'); sessionStorage.setItem('ag-exit-shown', '1'); };
      ov.querySelector('.exit-popup-close').addEventListener('click', close);
      ov.querySelector('[data-exit-dismiss]').addEventListener('click', close);
      ov.addEventListener('click', (e) => { if (e.target === ov) close(); });
      requestAnimationFrame(() => ov.classList.add('open'));
    };
    const trigger = () => {
      if (shown) return;
      const scrolled = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrolled >= 0.75) { shown = true; build(); window.removeEventListener('scroll', trigger); }
    };
    window.addEventListener('scroll', trigger, { passive: true });
    // also on exit intent (desktop)
    document.addEventListener('mouseout', function onOut(e) {
      if (!shown && e.clientY <= 0) { shown = true; build(); document.removeEventListener('mouseout', onOut); }
    });
  };
})();
