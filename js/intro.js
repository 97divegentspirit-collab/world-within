/* =============================================
   intro.js  — World Within
   Mobile-safe version with multiple fallbacks
============================================== */

(function () {

  var introScreen  = document.getElementById('intro-screen');
  var introScreen2 = document.getElementById('intro-screen2');
  var siteContent  = document.getElementById('site-content');
  var enterBtn     = document.getElementById('enter-experience');

  // ── REVEAL SITE — called from multiple places ──
  var revealed = false;
  function revealSite() {
    if (revealed) return;   // only run once
    revealed = true;

    clearTimeout(safetyTimer);
    clearTimeout(autoTimer);

    // Force site visible with inline styles (beats any CSS)
    if (siteContent) {
      siteContent.style.opacity    = '1';
      siteContent.style.visibility = 'visible';
      siteContent.style.transition = 'opacity 1.4s ease';
      siteContent.classList.add('visible');
    }

    // Hide intros
    if (introScreen) {
      introScreen.style.opacity    = '0';
      introScreen.style.visibility = 'hidden';
      introScreen.style.pointerEvents = 'none';
    }
    if (introScreen2) {
      introScreen2.style.opacity    = '0';
      introScreen2.style.visibility = 'hidden';
      introScreen2.style.pointerEvents = 'none';
    }

    // Restore scroll
    document.body.style.overflow  = '';
    document.documentElement.style.overflow = '';
  }

  // ── SAFETY NET — site always appears, no matter what ──
  // 8 seconds on desktop, 6 on mobile (slower devices)
  var isMobile = window.innerWidth <= 768;
  var safetyTimer = setTimeout(revealSite, isMobile ? 6000 : 8000);

  // ── If no intro screen in HTML at all, show site now ──
  if (!introScreen && !introScreen2) {
    revealSite();
    return;
  }

  // ── STAGE 1: open the book ──
  if (introScreen) {
    setTimeout(function () {
      introScreen.classList.add('open');
    }, 600);
  }

  // ── STAGE 2: book fades, invitation appears ──
  setTimeout(function () {
    if (introScreen)  introScreen.classList.add('fade-out');
    if (introScreen2) introScreen2.classList.add('show');
  }, 3800);

  // ── STAGE 3: button click reveals site ──
  var autoTimer;
  if (enterBtn) {
    enterBtn.addEventListener('click', function () {
      if (introScreen2) {
        introScreen2.classList.add('fade-out');
        introScreen2.classList.remove('show');
      }
      setTimeout(revealSite, 400);
    });
  } else {
    // No button — auto-reveal 3s after invitation appears
    autoTimer = setTimeout(revealSite, 7000);
  }

  // ── VISIBILITY CHANGE — if user switches tabs and back ──
  // Some mobile browsers suspend timers; this restarts them
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden && !revealed) {
      // Page became visible again — check if we're stuck
      setTimeout(function () {
        if (!revealed) revealSite();
      }, 500);
    }
  });

})();
