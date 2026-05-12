// form-handler.js

let userProfile = {
  emotions: [],
  symbols: [],
  text: ""
};

function saveEmotion(value) {
  userProfile.emotions.push(value);
}

function saveTextInput(text) {
  userProfile.text = text;
}

function submitProfile() {
  console.log("Final emotional profile:", userProfile);

  alert("Thank you for sharing your world.");
}
