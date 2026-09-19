/* =============================================
   experience-progress.js
   - Tracks scroll position → highlights progress dots
   - Restores the atmosphere chosen on the homepage, if any

   NOTE: setData / selectEmotion / toggleSymbol / selectPurpose /
   selectColor / handleFileUpload / submitProfile used to also be
   defined here, duplicating form-handler.js. That caused this
   file's older, non-validating versions to silently win depending
   on script order. Those now live only in form-handler.js — this
   file no longer defines any of them.
============================================== */

(function () {

  /* ── Restore atmosphere chosen on the homepage, if any ── */
  document.addEventListener('DOMContentLoaded', function () {
    var savedEmotion = localStorage.getItem('worldWithin_emotion');
    if (savedEmotion) {
      document.body.setAttribute('data-emotion', savedEmotion);

      var matchingCard = document.querySelector(
        '.emotion-card[data-feel="' + savedEmotion + '"], .emotion-card[onclick*="' + savedEmotion + '"]'
      );
      if (matchingCard) matchingCard.classList.add('selected');
    }
  });

  /* ── PROGRESS BAR — highlight dot based on scroll position ── */
  function updateProgress() {
    var scenes = document.querySelectorAll('.scene[data-scene]');
    var dots = document.querySelectorAll('.progress-dot[data-scene]');
    if (!scenes.length || !dots.length) return;

    var viewportCenter = window.scrollY + (window.innerHeight / 2);
    var activeScene = 1;

    scenes.forEach(function (scene) {
      var top = scene.offsetTop;
      var bottom = top + scene.offsetHeight;
      if (viewportCenter >= top && viewportCenter < bottom) {
        activeScene = parseInt(scene.getAttribute('data-scene'), 10);
      }
    });

    dots.forEach(function (dot) {
      var num = parseInt(dot.getAttribute('data-scene'), 10);
      dot.classList.remove('active', 'done');
      if (num === activeScene) {
        dot.classList.add('active');
      } else if (num < activeScene) {
        dot.classList.add('done');
      }
    });
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  document.addEventListener('DOMContentLoaded', updateProgress);

})();
