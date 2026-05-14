(function () {
  var STORAGE_KEY = 'syncagency_ref';
  var APP_REGISTER = 'https://app.syncagency.fr/register';

  function getRef() {
    var fromUrl = new URLSearchParams(window.location.search).get('ref');
    if (fromUrl && fromUrl.trim()) {
      try { localStorage.setItem(STORAGE_KEY, fromUrl.trim()); } catch (e) {}
      return fromUrl.trim();
    }
    try { return localStorage.getItem(STORAGE_KEY) || null; } catch (e) { return null; }
  }

  function patchLinks() {
    var ref = getRef();
    if (!ref) return;
    document.querySelectorAll('a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href && href.indexOf(APP_REGISTER) === 0) {
        try {
          var url = new URL(href);
          url.searchParams.set('ref', ref);
          a.setAttribute('href', url.toString());
        } catch (e) {}
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', patchLinks);
  } else {
    patchLinks();
  }
  setTimeout(patchLinks, 500);
})();
