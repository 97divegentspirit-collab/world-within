// form-handler.js
// Collects every answer from experience.html (The Journey),
// saves it to Firestore via window.saveProfileToDatabase
// (defined in firebase-init.js), and resets the whole page
// after a successful submit so the next visitor — or the same
// person with a second idea — starts from a clean slate.

let userProfile = {
  symbols: []
};

// Holds the real files picked in Scene 3 until submit time —
// not part of userProfile since File objects can't go into Firestore.
let pendingImageFiles = [];

// ---- Generic setter used by every text input, textarea,
//      range slider, and the discovery-source chips ----
function setData(key, value) {
  userProfile[key] = value;
}

// ---- Scene 1: Atmosphere (single-select) ----
function selectEmotion(value, el) {
  var grid = el.closest('.emotion-grid');
  if (grid) {
    grid.querySelectorAll('.emotion-card.selected').forEach(function (c) {
      c.classList.remove('selected');
    });
  }
  el.classList.add('selected');
  setData('feel', value);
}

// ---- Scene 2: Symbols (multi-select) ----
function toggleSymbol(value, el) {
  el.classList.toggle('selected');
  var idx = userProfile.symbols.indexOf(value);
  if (el.classList.contains('selected')) {
    if (idx === -1) userProfile.symbols.push(value);
  } else if (idx !== -1) {
    userProfile.symbols.splice(idx, 1);
  }
}

// ---- Scene 3: Visual upload ----
// Files are held here and actually uploaded to Firebase Storage
// at submit time (see submitProfile below). Their URLs land in
// userProfile.uploadedImageUrls, so the saved Firestore record
// links straight to the real images.
function handleFileUpload(inputEl) {
  pendingImageFiles = Array.from(inputEl.files || []);
}

// ---- Scene 4: Purpose (single-select) ----
function selectPurpose(value, el) {
  var grid = el.closest('.emotion-grid');
  if (grid) {
    grid.querySelectorAll('.emotion-card.selected').forEach(function (c) {
      c.classList.remove('selected');
    });
  }
  el.classList.add('selected');
  setData('purpose', value);
}

// ---- Scene 10: Color instinct (single-select swatch) ----
function selectColor(value, el) {
  document.querySelectorAll('.color-swatch.selected').forEach(function (c) {
    c.classList.remove('selected');
  });
  el.classList.add('selected');
  setData('colorSwatch', value);

  // A picked swatch is a clear choice — clear any typed hex override
  var hexInput = document.getElementById('colorCodeInput');
  var preview = document.getElementById('colorCodePreview');
  if (hexInput) hexInput.value = '';
  userProfile.colorCodeCustom = '';
  if (preview) {
    preview.style.background = el.style.background;
    preview.style.borderColor = el.style.background;
  }
}

// ---- Reset everything after a successful save ----
function resetJourneyUI() {
  document.querySelectorAll('.scene input[type="text"], .scene textarea')
    .forEach(function (el) { el.value = ''; });

  document.querySelectorAll('.scene input[type="range"]')
    .forEach(function (el) { el.value = 50; });

  document.querySelectorAll('.scene input[type="file"]')
    .forEach(function (el) { el.value = ''; });

  document.querySelectorAll('.emotion-card.selected, .color-swatch.selected, .source-chip.selected')
    .forEach(function (el) { el.classList.remove('selected'); });

  var preview = document.getElementById('colorCodePreview');
  if (preview) {
    preview.style.background = 'rgba(255,255,255,0.05)';
    preview.style.borderColor = 'rgba(255,255,255,0.25)';
  }

  userProfile = { symbols: [] };
  pendingImageFiles = [];
}

// ---- Scene 14: Save everything to Firestore ----
async function submitProfile() {
  var btn = document.getElementById('journeySubmitBtn');
  var statusEl = document.getElementById('journey-status');

  if (btn) btn.disabled = true;
  if (statusEl) {
    statusEl.textContent = 'Saving your world...';
    statusEl.className = 'form-status';
  }

  try {
    if (pendingImageFiles.length > 0) {
      if (statusEl) statusEl.textContent = 'Uploading your images...';
      userProfile.uploadedImageUrls = await window.uploadJourneyImages(pendingImageFiles);
    }

    if (statusEl) statusEl.textContent = 'Saving your world...';
    await window.saveProfileToDatabase(userProfile);
    if (statusEl) {
      statusEl.textContent = 'Thank you for sharing your world.';
      statusEl.className = 'form-status success';
    }
    resetJourneyUI();
  } catch (e) {
    console.error('Error saving profile:', e);
    if (statusEl) {
      statusEl.textContent = 'Something went wrong. Please try again.';
      statusEl.className = 'form-status error';
    }
  } finally {
    if (btn) btn.disabled = false;
  }
}
