(function() {
  // Keyboard nav pour les details/summary
  document.querySelectorAll('details.accordion-item').forEach(function(details) {
    details.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        details.removeAttribute('open');
        details.querySelector('summary').focus();
      }
    });
  });

  // Single-open: ferme les autres quand on en ouvre un
  var allDetails = Array.from(document.querySelectorAll('details.accordion-item'));
  allDetails.forEach(function(details) {
    details.addEventListener('toggle', function() {
      if (details.open) {
        allDetails.forEach(function(other) {
          if (other !== details) other.removeAttribute('open');
        });
      }
    });
  });
})();
