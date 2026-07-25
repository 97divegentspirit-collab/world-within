// main.js

let currentMood = "calm";
let emotionsData = {};

function setEmotion(emotion) {
  document.body.setAttribute("data-emotion", emotion);
}


//main.js 

document.addEventListener("DOMContentLoaded", async () => {
  // Load emotions data, but don't let a failure here block
  // anything else on the page — this used to be a single
  // unguarded `await`, so if this fetch failed (wrong path,
  // missing file, etc.) it silently stopped every line after
  // it from ever running, including the scroll-reveal setup
  // below. That's why sections could stay invisible forever
  // on pages where this file failed to load.
  try {
    await loadEmotions();
  } catch (err) {
    console.warn("Could not load emotions.json — continuing without it.", err);
  }

  // DO NOT set mood immediately
  // leave world in void state

  startExperience();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('in-view');
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('section').forEach(s => observer.observe(s));

});

// Load emotional database
async function loadEmotions() {
  const res = await fetch("data/emotions.json");
  if (!res.ok) throw new Error("emotions.json fetch failed: " + res.status);
  emotionsData = await res.json();
  console.log("Emotions loaded:", emotionsData);
}

// Start the guided journey
function startExperience() {
  console.log("Experience started");

  showScene("arrival");
}

// Change emotional state
function setMood(mood) {
  currentMood = mood;

  const data = emotionsData[mood];
  if (!data) return;

  setEmotion(mood); // THIS triggers CSS system

  console.log("Mood set to:", mood);
}
// Scene controller (you will expand this later)
function showScene(sceneName) {
  console.log("Now showing scene:", sceneName);
}
