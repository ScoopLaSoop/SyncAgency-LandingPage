(function () {
  // Generic click-to-play/pause for VSL + testimonial overlays
  function initVideoToggle(videoId, overlayId) {
    var video   = document.getElementById(videoId);
    var overlay = document.getElementById(overlayId);
    if (!video || !overlay) return;

    function toggle() {
      if (video.paused) {
        overlay.classList.add('is-playing');
        video.play().catch(function () {});
      } else {
        overlay.classList.remove('is-playing');
        video.pause();
      }
    }
    overlay.addEventListener('click', toggle);
    overlay.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
    video.addEventListener('ended', function () {
      overlay.classList.remove('is-playing');
      video.currentTime = 0;
    });
  }

  initVideoToggle('vslChatting',  'vslChattingOverlay');
  initVideoToggle('vslMarketing', 'vslMarketingOverlay');
  initVideoToggle('testiVideo',   'testiOverlay');

  // Lazy autoplay: solution videos play when they enter the viewport, pause when they leave
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-video-toggle] video').forEach(function (v) {
      v.play().catch(function () {});
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var video = entry.target;
      if (entry.isIntersecting) {
        video.play().catch(function () {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.25 });

  document.querySelectorAll('[data-video-toggle] video').forEach(function (video) {
    observer.observe(video);
  });
})();
