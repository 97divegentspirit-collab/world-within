/* =============================================
   intro.js — World Within
   Screen 2 ONLY dismisses on button click.
   Never auto-fades. Safety net only reveals
   site — never hides screen 2 prematurely.
============================================== */
(function () {

  var screen1  = document.getElementById('intro-screen');
  var screen2  = document.getElementById('intro-screen2');
  var site     = document.getElementById('site-content');
  var btn      = document.getElementById('enter-experience');
  var revealed = false;

  /* ── Reveal site (called ONLY after button click) ── */
  function revealSite() {
    if (revealed) return;
    revealed = true;

    if (screen2) {
      screen2.classList.add('fade-out');
      screen2.classList.remove('show');
    }

    setTimeout(function () {
      if (site) {
        site.style.transition  = 'opacity 1.6s ease';
        site.style.opacity     = '1';
        site.style.visibility  = 'visible';
        site.classList.add('visible');
      }
      if (screen1) {
        screen1.style.display = 'none';
      }
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }, 600);
  }

  /* ── Safety net — only shows site if everything broke ──
     Does NOT hide screen2 before button is clicked.
     Waits a long time so normal flow runs first. ── */
  var safetyTimer = setTimeout(function () {
    if (!revealed) {
      // Something broke — just show the site directly
      revealed = true;
      if (site) {
        site.style.opacity    = '1';
        site.style.visibility = 'visible';
      }
      if (screen1) screen1.style.display = 'none';
      if (screen2) screen2.style.display = 'none';
      document.body.style.overflow = '';
    }
  }, 30000); // 30 seconds — very long, normal users will click button

  /* ── STAGE 1: open book after short pause ── */
  setTimeout(function () {
    if (screen1) screen1.classList.add('open');
  }, 1200); /* 1.2s breath before doors begin moving */

  /* ── STAGE 2: book fades → screen2 appears ──
     Screen2 then WAITS for button. No timeout. ── */
  setTimeout(function () {
    if (screen1) screen1.classList.add('fade-out');
    setTimeout(function () {
      if (screen2) screen2.classList.add('show');
    }, 800);
  }, 8500); /* book open 8.5s total — slow, intentional */

  /* ── STAGE 3: button is the ONLY gate ── */
  function handleEnter(e) {
    if (e) e.preventDefault();
    clearTimeout(safetyTimer);
    revealSite();
  }

  if (btn) {
    btn.addEventListener('click',    handleEnter);
    btn.addEventListener('touchend', handleEnter);
  }

  /* ── Tab recovery — if page was hidden and restored ── */
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden && !revealed) {
      /* Don't auto-reveal — just make sure screen2 is showing */
      if (screen2 && !screen2.classList.contains('show')) {
        /* If book already faded, show screen2 */
        if (screen1 && screen1.classList.contains('fade-out')) {
          screen2.classList.add('show');
        }
      }
    }
  });

})();
