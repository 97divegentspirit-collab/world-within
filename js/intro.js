/* =============================================
   intro.js
   Handles the full 3-stage intro sequence:
   1. Book opens → logo + welcome revealed
   2. Book fades → screen 2 (invitation) appears
   3. Button clicked → screen 2 fades → site revealed
============================================== */

(function () {

  const introScreen  = document.getElementById('intro-screen');
  const introScreen2 = document.getElementById('intro-screen2');
  const siteContent  = document.getElementById('site-content');
  const enterBtn     = document.getElementById('enter-experience');

  // ── STAGE 1: Open the book after a short breath ──
  // Small delay lets the page paint and the user settle
  setTimeout(function () {
    introScreen.classList.add('open');
  }, 700);


  // ── STAGE 2: Book fades, invitation screen appears ──
  // 700ms delay + 2300ms for book to open + 800ms to read the logo = ~3800ms
  setTimeout(function () {
    introScreen.classList.add('fade-out');   // book fades away
    introScreen2.classList.add('show');      // invitation fades in
  }, 3800);


  // ── STAGE 3: Button click — invitation fades, site is revealed ──
  if (enterBtn) {
    enterBtn.addEventListener('click', function () {

      // Fade out screen 2
      introScreen2.classList.remove('show');
      introScreen2.classList.add('fade-out');

      // Reveal main site after transition starts
      setTimeout(function () {
        siteContent.classList.add('visible');

        // Allow body to scroll again
        document.body.classList.remove('loading');
        document.body.style.overflow = '';
      }, 400);

    });
  }

})();
