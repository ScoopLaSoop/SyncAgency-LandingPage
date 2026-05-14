(function() {
  var mobileMenuBtn = document.getElementById('mobileMenuBtn');
  var mobileNav = document.getElementById('mobileNav');
  if (!mobileMenuBtn || !mobileNav) return;

  mobileMenuBtn.addEventListener('click', function() {
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

  mobileNav.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
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
})();
