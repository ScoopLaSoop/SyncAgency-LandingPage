(function () {
  'use strict';

  // ── Plan configuration ────────────────────────────────────────────────────
  var PLANS = {
    chatting: { name: 'Core Operations', price: 59, rate: 0.40, rateLabel: '40%', perRef: 23.60 },
    marketing: { name: 'Growth Marketing', price: 89, rate: 0.10, rateLabel: '10%', perRef: 8.90 }
  };

  var planKey = new URLSearchParams(window.location.search).get('plan') || 'chatting';
  var plan = PLANS[planKey] || PLANS.chatting;

  // ── Update page title with plan rate ─────────────────────────────────────
  document.title = 'SyncAgency Affiliate — ' + plan.rateLabel + ' recurring commission';

  // ── Update all data-plan-* elements ──────────────────────────────────────
  document.querySelectorAll('[data-plan-percent]').forEach(function (el) {
    el.textContent = plan.rateLabel;
  });
  document.querySelectorAll('[data-plan-name]').forEach(function (el) {
    el.textContent = plan.name;
  });
  document.querySelectorAll('[data-plan-price]').forEach(function (el) {
    el.textContent = plan.price + '€';
  });
  document.querySelectorAll('[data-plan-perref]').forEach(function (el) {
    el.textContent = plan.perRef.toFixed(2) + '€';
  });

  // ── Update Tarifs/FAQ nav links to match current plan's landing page ─────
  // Supports both Vanilla (index.html#) and Astro (/#) link formats
  var basePage = planKey === 'marketing' ? 'marketing.html' : 'index.html';
  var baseSlug = planKey === 'marketing' ? '/marketing' : '/';
  document.querySelectorAll('a[href^="index.html#"]').forEach(function (a) {
    a.setAttribute('href', basePage + '#' + a.getAttribute('href').split('#')[1]);
  });
  document.querySelectorAll('a[href^="/#"]').forEach(function (a) {
    var anchor = a.getAttribute('href').split('#')[1];
    a.setAttribute('href', baseSlug + '#' + anchor);
  });

  // ── Update calculator note ────────────────────────────────────────────────
  var noteEl = document.getElementById('affiNote');
  if (noteEl) {
    noteEl.textContent = '* Based on ' + plan.price + '€/month × ' + plan.rateLabel + ' = ' + plan.perRef.toFixed(2) + '€ per active subscription';
  }

  // ── Lucide icons ──────────────────────────────────────────────────────────
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ── prefers-reduced-motion guard ──────────────────────────────────────────
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Header scroll : toggle .scrolled au scroll > 20px ───────────────────
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ── Fade-in-up au scroll (IntersectionObserver) ──────────────────────────
  var fadeEls = document.querySelectorAll('.fade-in-up');
  if (prefersReduced) {
    fadeEls.forEach(function (el) { el.classList.add('in-view'); });
  } else {
    var fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    fadeEls.forEach(function (el) { fadeObserver.observe(el); });
  }

  // ── Spotlight follow-mouse ────────────────────────────────────────────────
  if (!prefersReduced) {
    document.querySelectorAll('.spotlight-zone').forEach(function (zone) {
      zone.addEventListener('mousemove', function (e) {
        var r = zone.getBoundingClientRect();
        var x = ((e.clientX - r.left) / r.width) * 100;
        var y = ((e.clientY - r.top) / r.height) * 100;
        zone.style.setProperty('--mx', x + '%');
        zone.style.setProperty('--my', y + '%');
      });
      zone.addEventListener('mouseleave', function () {
        zone.style.setProperty('--mx', '50%');
        zone.style.setProperty('--my', '50%');
      });
    });
  }

  // ── Mobile menu ───────────────────────────────────────────────────────────
  var mobileMenuBtn = document.getElementById('mobileMenuBtn');
  var mobileNav = document.getElementById('mobileNav');
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', function () {
      var isOpen = mobileNav.classList.contains('open');
      mobileNav.classList.toggle('open', !isOpen);
      mobileMenuBtn.setAttribute('aria-expanded', String(!isOpen));
      mobileNav.setAttribute('aria-hidden', String(isOpen));
      var icon = mobileMenuBtn.querySelector('[data-lucide]');
      if (icon) {
        icon.setAttribute('data-lucide', isOpen ? 'menu' : 'x');
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        var icon = mobileMenuBtn.querySelector('[data-lucide]');
        if (icon) {
          icon.setAttribute('data-lucide', 'menu');
          if (typeof lucide !== 'undefined') lucide.createIcons();
        }
      });
    });
  }

  // ── Nav dropdown Produit ──────────────────────────────────────────────────
  var navProductBtn = document.getElementById('navProductBtn');
  var navProductDropdown = document.getElementById('navProductDropdown');
  if (navProductBtn && navProductDropdown) {
    var dropdownPanel = navProductDropdown.querySelector('.nav-dropdown-panel');
    navProductBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = navProductDropdown.classList.contains('open');
      navProductDropdown.classList.toggle('open', !isOpen);
      navProductBtn.setAttribute('aria-expanded', String(!isOpen));
    });
    document.addEventListener('click', function () {
      if (navProductDropdown.classList.contains('open')) {
        navProductDropdown.classList.remove('open');
        navProductBtn.setAttribute('aria-expanded', 'false');
      }
    });
    if (dropdownPanel) {
      dropdownPanel.addEventListener('click', function (e) { e.stopPropagation(); });
    }
    navProductBtn.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        navProductDropdown.classList.remove('open');
        navProductBtn.setAttribute('aria-expanded', 'false');
        navProductBtn.focus();
      }
    });
  }

  // ── Chat widget SAV ───────────────────────────────────────────────────────
  (function () {
    var widget   = document.getElementById('chatWidget');
    var bubble   = document.getElementById('chatBubble');
    var panel    = document.getElementById('chatPanel');
    var closeBtn = document.getElementById('chatClose');
    if (!widget || !bubble || !panel) return;
    function openChat()  { widget.classList.add('is-open'); bubble.setAttribute('aria-expanded', 'true'); panel.setAttribute('aria-hidden', 'false'); }
    function closeChat() { widget.classList.remove('is-open'); bubble.setAttribute('aria-expanded', 'false'); panel.setAttribute('aria-hidden', 'true'); }
    bubble.addEventListener('click', function () { widget.classList.contains('is-open') ? closeChat() : openChat(); });
    if (closeBtn) closeBtn.addEventListener('click', closeChat);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeChat(); });
  })();

  // ── Slider calculator ─────────────────────────────────────────────────────
  var slider          = document.getElementById('affiSlider');
  var sliderCount     = document.getElementById('sliderCount');
  var sliderAmount    = document.getElementById('sliderAmount');

  function updateSlider() {
    if (!slider) return;
    var val = parseInt(slider.value, 10);
    var earnings = Math.round(val * plan.perRef);
    var pct = (val / parseInt(slider.max, 10)) * 100;
    slider.style.background = 'linear-gradient(to right, #8AA5FF 0%, #8AA5FF ' + pct + '%, rgba(255,255,255,0.08) ' + pct + '%, rgba(255,255,255,0.08) 100%)';
    if (sliderCount) {
      sliderCount.textContent = val + (val === 1 ? ' agency referred' : ' agencies referred');
    }
    if (sliderAmount) {
      sliderAmount.textContent = earnings + '€';
    }
  }

  if (slider) {
    slider.addEventListener('input', updateSlider);
    updateSlider();
  }

  // ── CTA tracking (Vercel Analytics) ──────────────────────────────────────
  document.querySelectorAll('[data-cta]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cta = btn.getAttribute('data-cta');
      var section = btn.getAttribute('data-section');
      try {
        if (window.va) {
          window.va('event', { name: 'landing_cta_clicked', cta: cta, section: section });
        }
      } catch (err) {
        // Tracking non bloquant
      }
    });
  });

})();
