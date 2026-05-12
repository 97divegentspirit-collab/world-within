// interactions.js

function selectEmotion(emotion) {
  console.log("User selected:", emotion);

  // communicate with main system
  if (window.setMood) {
    window.setMood(emotion);
  }
}

// Example: selecting a visual card
function selectCard(cardElement, value) {
  cardElement.classList.add("selected");

  selectEmotion(value);
}
