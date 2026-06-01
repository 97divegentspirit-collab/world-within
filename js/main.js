console.log("World Within is alive.");
// main.js

let currentMood = "calm";
let emotionsData = {};

function setEmotion(emotion) {
  document.body.setAttribute("data-emotion", emotion);
}




document.addEventListener("DOMContentLoaded", async () => {
  await loadEmotions();

  // DO NOT set mood immediately
  // leave world in void state

  startExperience();
});

// Load emotional database
async function loadEmotions() {
  const res = await fetch("data/emotions.json");
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
