/* =============================================
   intro.js — World Within
   
   SEQUENCE:
   0s    — Page loads, book visible CLOSED
   1.5s  — Pause so you see the closed book
   1.5s  — Covers begin slowly swinging open
   ~7s   — Covers fully open, logo fully visible
   9s    — Book fades away
   9.8s  — Invitation screen appears
   ∞     — Waits for button click. Never auto-fades.
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
     We just wait 1500ms so the person SEES it closed. ── */

  /* ── STAGE 1: Begin opening — slow and majestic ── */
  setTimeout(function () {
    if (screen1) screen1.classList.add('open');
  }, 1500); /* 1.5s of seeing it closed first */

  /* ── STAGE 2: Book fades — screen2 invitation appears ── */
  /* Covers take 5.5s to open fully + 1.5s delay = 7s, then logo visible ~2s more */
  setTimeout(function () {
    if (screen1) screen1.classList.add('fade-out');
    setTimeout(function () {
      if (screen2) screen2.classList.add('show');
    }, 600);
  }, 7700); /* Total: 10s of book experience before invitation */

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
