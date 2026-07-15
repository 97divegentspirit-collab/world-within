/* =============================================
   intro.js — World Within
   
   SEQUENCE (tightened for continuity):
   0s     — Page loads, book visible CLOSED
   1s     — Pause so you see the closed book
   1s     — Covers begin swinging open (2.2s duration)
   1.3s   — Logo begins fading in (finishes ~2.5s)
   3.2s   — Book fades away
   3.2s   — Invitation screen begins showing (same moment — true crossfade)
   ∞      — Waits for button click. Never auto-fades.
============================================== */
(function () {

  var screen1  = document.getElementById('intro-screen');
  var screen2  = document.getElementById('intro-screen2');
  var site     = document.getElementById('site-content');
  var btn      = document.getElementById('enter-experience');
  var revealed = false;

  /* ── Reveal site — only called by button ── */
  function revealSite() {
    if (revealed) return;
    revealed = true;

    if (screen2) {
      screen2.classList.add('fade-out');
      screen2.classList.remove('show');
    }

    setTimeout(function () {
      if (site) {
        site.style.transition = 'opacity 1.6s ease';
        site.style.opacity    = '1';
        site.style.visibility = 'visible';
        site.classList.add('visible');
      }
      if (screen1) screen1.style.display = 'none';


    //repairs

      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
       }, 700);
  }

  /* ── Safety net — 45s, so normal users always click button ── */
  var safety = setTimeout(function () {
    if (!revealed) {
      revealed = true;
      if (site) { site.style.opacity = '1'; site.style.visibility = 'visible'; }
      if (screen1) screen1.style.display = 'none';
      if (screen2) screen2.style.display = 'none';

      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }
  }, 45000);

  /* ── STAGE 0: Book is visible CLOSED on load ──
     No JS needed — CSS shows it closed by default.
     We just wait 1000ms so the person SEES it closed. ── */


/* ── STAGE 1: Begin opening — covers AND logo move together ── */
  setTimeout(function () {
    if (screen1) screen1.classList.add('open');
  }, 1000); /* 1s of seeing it closed first */

  /* ── STAGE 2: Book fades — screen2 invitation appears AT THE SAME TIME ──
     Covers finish opening ~3.2s in, logo finishes ~2.5s in —
     so for over a second, book and logo are visible together.
     Screen2 starts its own fade-in the instant screen1 starts
     fading out, so they crossfade as one motion, not two. ── */
  setTimeout(function () {
    if (screen1) screen1.classList.add('fade-out');
    if (screen2) screen2.classList.add('show');
  }, 3200); /* Total: ~3.2s of book experience before crossfade begins */



   

  /* ── STAGE 3: Button is the ONLY gate to the site ── */
  function handleEnter(e) {
    if (e && e.type === 'touchend') e.preventDefault();
    clearTimeout(safety);
    revealSite();
  }

  if (btn) {
    btn.addEventListener('click',    handleEnter);
    btn.addEventListener('touchend', handleEnter);
  }

  /* ── Tab visibility recovery ── */
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden && !revealed) {
      if (screen1 && screen1.classList.contains('fade-out')) {
        if (screen2 && !screen2.classList.contains('show')) {
          screen2.classList.add('show');
        }
      }
    }
  });

})();
