/* =============================================
   experience-progress.js
   - Tracks scroll position → highlights progress dots
   - selectEmotion / toggleSymbol / selectPurpose / selectColor
   - setData → collects all answers into one object
   - Restores atmosphere from homepage selection
============================================== */

(function () {

  /* ── Master data object — everything the AI generator will use ── */
  window.worldWithinData = window.worldWithinData || {};

  /* Load any previously saved data (in case user returns) */
  try {
    var saved = localStorage.getItem('worldWithinData');
    if (saved) window.worldWithinData = JSON.parse(saved);
  } catch (e) {}

  /* Persist on every change */
  function persist() {
    try {
      localStorage.setItem('worldWithinData', JSON.stringify(window.worldWithinData));
    } catch (e) {}
  }

  /* ── setData — generic field setter, called by inputs/textareas ── */
  window.setData = function (key, value) {
    window.worldWithinData[key] = value;
    persist();
  };

  /* ── selectEmotion — sets atmosphere, retints particles/glow,
       marks card as selected, persists choice ── */
  window.selectEmotion = function (emotion, cardEl) {
    document.body.setAttribute('data-emotion', emotion);
    localStorage.setItem('worldWithin_emotion', emotion);
    window.worldWithinData.atmosphere = emotion;
    persist();

    // Visual selection state — only one card selected at a time
    if (cardEl) {
      var siblings = cardEl.parentElement.querySelectorAll('.emotion-card');
      siblings.forEach(function (c) { c.classList.remove('selected'); });
      cardEl.classList.add('selected');
    }
  };

  /* ── toggleSymbol — multi-select for symbols scene ── */
  window.toggleSymbol = function (symbol, cardEl) {
    if (!window.worldWithinData.symbols) window.worldWithinData.symbols = [];
    var arr = window.worldWithinData.symbols;
    var idx = arr.indexOf(symbol);

    if (idx > -1) {
      arr.splice(idx, 1);
      if (cardEl) cardEl.classList.remove('selected');
    } else {
      arr.push(symbol);
      if (cardEl) cardEl.classList.add('selected');
    }
    persist();
  };

  /* ── selectPurpose — single select ── */
  window.selectPurpose = function (purpose, cardEl) {
    window.worldWithinData.purpose = purpose;
    persist();

    if (cardEl) {
      var siblings = cardEl.parentElement.querySelectorAll('.emotion-card');
      siblings.forEach(function (c) { c.classList.remove('selected'); });
      cardEl.classList.add('selected');
    }
  };

  /* ── selectColor — single select for color swatches ── */
  window.selectColor = function (color, swatchEl) {
    window.worldWithinData.colorVibe = color;
    persist();

    if (swatchEl) {
      var siblings = swatchEl.parentElement.querySelectorAll('.color-swatch');
      siblings.forEach(function (s) { s.classList.remove('selected'); });
      swatchEl.classList.add('selected');
    }
  };

  /* ── handleFileUpload — store file names (actual upload happens
       on submit via Firebase Storage, see form-handler.js) ── */
  window.handleFileUpload = function (input) {
    if (!input.files) return;
    var names = [];
    for (var i = 0; i < input.files.length; i++) {
      names.push(input.files[i].name);
    }
    window.worldWithinData.uploadedFileNames = names;
    window.worldWithinData._files = input.files; // kept in memory for submit
    persist();
  };

  /* ── submitProfile — called by the "Continue Forward" button ── */
  window.submitProfile = function () {
    window.worldWithinData.submittedAt = new Date().toISOString();
    window.worldWithinData.sessionId = window.worldWithinData.sessionId ||
      Date.now().toString();
    persist();

    // If Firebase is connected (form-handler.js), it will pick this up.
    if (typeof window.saveProfileToDatabase === 'function') {
      window.saveProfileToDatabase(window.worldWithinData);
    }

    // Smooth scroll to the "thank you / final connection" section
    var lastSection = document.querySelector('section:last-of-type');
    if (lastSection) {
      lastSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* ── RESTORE atmosphere from homepage on load ── */
  document.addEventListener('DOMContentLoaded', function () {
    var savedEmotion = localStorage.getItem('worldWithin_emotion');
    if (savedEmotion) {
      document.body.setAttribute('data-emotion', savedEmotion);

      // Highlight the matching card if present on this page
      var matchingCard = document.querySelector(
        '.emotion-card[data-feel="' + savedEmotion + '"], .emotion-card[onclick*="' + savedEmotion + '"]'
      );
      if (matchingCard) matchingCard.classList.add('selected');
    }

    // Restore symbol selections
    if (window.worldWithinData.symbols) {
      window.worldWithinData.symbols.forEach(function (sym) {
        var card = document.querySelector('.emotion-card[onclick*="' + sym + '"]');
        if (card) card.classList.add('selected');
      });
    }

    // Restore purpose selection
    if (window.worldWithinData.purpose) {
      var pCard = document.querySelector('.emotion-card[onclick*="' + window.worldWithinData.purpose + '"]');
      if (pCard) pCard.classList.add('selected');
    }

    // Restore color selection
    if (window.worldWithinData.colorVibe) {
      var cSwatch = document.querySelector('.color-swatch[data-color="' + window.worldWithinData.colorVibe + '"]');
      if (cSwatch) cSwatch.classList.add('selected');
    }

    // Restore text inputs
    ['brandName','tagline','offering','threeWords','audience','socialLinks','freeText'].forEach(function (key) {
      if (window.worldWithinData[key]) {
        var field = document.querySelector('[oninput*="' + key + '"]');
        if (field) field.value = window.worldWithinData[key];
      }
    });
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

