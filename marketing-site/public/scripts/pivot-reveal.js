(function() {
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pivotEl = document.querySelector('.pivot-content');
  if (!pivotEl) return;

  if (prefersReduced) {
    pivotEl.classList.add('pivot-is-visible');
    return;
  }

  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('pivot-is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  obs.observe(pivotEl);
})();
