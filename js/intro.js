/* =============================================
   intro.js — World Within
   Bulletproof version: always shows the site
============================================== */
(function () {

  var introScreen  = document.getElementById('intro-screen');
  var introScreen2 = document.getElementById('intro-screen2');
  var siteContent  = document.getElementById('site-content');
  var enterBtn     = document.getElementById('enter-experience');
  var revealed     = false;

  /* ── Always reveal site — called by button OR safety timer ── */
  function revealSite() {
    if (revealed) return;
    revealed = true;

    clearTimeout(safety);

    /* Force inline styles — beats any CSS rule */
    if (siteContent) {
      siteContent.style.transition  = 'opacity 1.4s ease';
      siteContent.style.opacity     = '1';
      siteContent.style.visibility  = 'visible';
      siteContent.classList.add('visible');
    }

    /* Hide both intro screens */
    [introScreen, introScreen2].forEach(function(el) {
      if (!el) return;
      el.style.transition   = 'opacity 0.8s ease';
      el.style.opacity      = '0';
      el.style.visibility   = 'hidden';
      el.style.pointerEvents = 'none';
    });

    /* Restore scroll */
    document.body.style.overflow           = '';
    document.body.style.height             = '';
    document.documentElement.style.overflow = '';
  }

  /* ── Safety net — site WILL appear no matter what ── */
  var isMobile = window.innerWidth <= 768;
  var safety   = setTimeout(revealSite, isMobile ? 5500 : 7500);

  /* ── If no intro elements exist, show site immediately ── */
  if (!introScreen && !introScreen2) {
    revealSite();
    return;
  }

  /* ── STAGE 1: open book ── */
  setTimeout(function () {
    if (introScreen) introScreen.classList.add('open');
  }, 500);

  /* ── STAGE 2: book fades → invitation appears ── */
  setTimeout(function () {
    if (introScreen)  introScreen.classList.add('fade-out');
    if (introScreen2) introScreen2.classList.add('show');
  }, 3600);

  /* ── STAGE 3: button → reveal site ── */
  if (enterBtn) {
    enterBtn.addEventListener('click', function () {
      if (introScreen2) {
        introScreen2.classList.remove('show');
        introScreen2.classList.add('fade-out');
      }
      setTimeout(revealSite, 350);
    });

    /* Touch fallback for mobile tap */
    enterBtn.addEventListener('touchend', function (e) {
      e.preventDefault();
      if (introScreen2) {
        introScreen2.classList.remove('show');
        introScreen2.classList.add('fade-out');
      }
      setTimeout(revealSite, 350);
    });
  }

  /* ── Tab switch recovery ── */
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden && !revealed) {
      setTimeout(function () { if (!revealed) revealSite(); }, 300);
    }
  });

})();
       
