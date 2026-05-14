(function() {
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var elements = document.querySelectorAll('.fade-in-up');

  if (prefersReduced) {
    elements.forEach(function(el) { el.classList.add('in-view'); });
    return;
  }

  if (!('IntersectionObserver' in window)) {
    elements.forEach(function(el) { el.classList.add('in-view'); });
    return;
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(function(el) { observer.observe(el); });
})();
