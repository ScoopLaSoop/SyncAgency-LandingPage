(function () {
  'use strict';

  // ── Plan configuration ────────────────────────────────────────────────────
  var PLANS = {
    chatting: { name: 'Core Chatting', price: 59, rate: 0.40, rateLabel: '40%', perRef: 23.60 },
    marketing: { name: 'Growth Marketing', price: 89, rate: 0.10, rateLabel: '10%', perRef: 8.90 }
  };

  var planKey = new URLSearchParams(window.location.search).get('plan') || 'chatting';
  var plan = PLANS[planKey] || PLANS.chatting;

  // ── Update page title with plan rate ─────────────────────────────────────
  document.title = 'Affiliation SyncAgency — ' + plan.rateLabel + ' commission à vie';

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
  var baseSlug = planKey === 'marketing' ? '/marketing' : '/';
  document.querySelectorAll('a[href^="/#"]').forEach(function (a) {
    var anchor = a.getAttribute('href').split('#')[1];
    a.setAttribute('href', baseSlug + '#' + anchor);
  });

  // ── Update calculator note ────────────────────────────────────────────────
  var noteEl = document.getElementById('affiNote');
  if (noteEl) {
    noteEl.textContent = '* Basé sur ' + plan.price + '€/mois × ' + plan.rateLabel + ' = ' + plan.perRef.toFixed(2) + '€ par abonnement actif';
  }

  // ── prefers-reduced-motion (for slider animation only) ───────────────────
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Slider calculator ─────────────────────────────────────────────────────
  var slider          = document.getElementById('affiSlider');
  var sliderCount     = document.getElementById('sliderCount');
  var sliderAmount    = document.getElementById('sliderAmount');

  var currentEarnings = 0;
  var currentCount    = 0;

  function animateValue(el, from, to, duration, formatter) {
    if (!el) return;
    if (prefersReduced || from === to) { el.textContent = formatter(to); return; }
    var start = null;
    var raf = requestAnimationFrame(function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var ease = 1 - Math.pow(1 - p, 3);
      el.textContent = formatter(Math.round(from + (to - from) * ease));
      if (p < 1) requestAnimationFrame(step);
    });
    return raf;
  }

  function updateSlider() {
    if (!slider) return;
    var val      = parseInt(slider.value, 10);
    var earnings = Math.round(val * plan.perRef);
    var pct      = (val / parseInt(slider.max, 10)) * 100;
    slider.style.background = 'linear-gradient(to right, #8AA5FF 0%, #8AA5FF ' + pct + '%, rgba(255,255,255,0.08) ' + pct + '%, rgba(255,255,255,0.08) 100%)';
    animateValue(sliderAmount, currentEarnings, earnings, 400, function (v) { return v + '€'; });
    animateValue(sliderCount,  currentCount,    val,      400, function (v) { return v + (v === 1 ? ' agence parrainée' : ' agences parrainées'); });
    currentEarnings = earnings;
    currentCount    = val;
  }

  if (slider) {
    slider.addEventListener('input', updateSlider);
    updateSlider();
  }

})();
