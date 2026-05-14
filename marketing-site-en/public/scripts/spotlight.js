(function() {
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  var zones = document.querySelectorAll('.spotlight-zone');
  zones.forEach(function(zone) {
    zone.addEventListener('mousemove', function(e) {
      var rect = zone.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width * 100).toFixed(2);
      var y = ((e.clientY - rect.top) / rect.height * 100).toFixed(2);
      zone.style.setProperty('--mx', x + '%');
      zone.style.setProperty('--my', y + '%');
    });
    zone.addEventListener('mouseleave', function() {
      zone.style.setProperty('--mx', '50%');
      zone.style.setProperty('--my', '50%');
    });
  });
})();
