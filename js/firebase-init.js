import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAhTPuc6ete9BoJCOdAf8FDIsZAf-GbFGg",
  authDomain: "world-within-1774.firebaseapp.com",
  projectId: "world-within-1774",
  storageBucket: "world-within-1774.firebasestorage.app",
  messagingSenderId: "905956424295",
  appId: "1:905956424295:web:b4f86e24982faaecb1f2c2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ---- Saves experience.html answers ----
window.saveProfileToDatabase = async function (data) {
  try {
    await addDoc(collection(db, "profiles"), {
      ...data,
      createdAt: serverTimestamp()
    });
    console.log("Profile saved.");
  } catch (e) {
    console.error("Error saving profile:", e);
  }
};

// ---- Handles the contact form ----
window.submitContactForm = async function (event, formEl) {
  event.preventDefault();

  var name = formEl.querySelector('[name="name"]').value.trim();
  var email = formEl.querySelector('[name="email"]').value.trim();
  var message = formEl.querySelector('[name="message"]').value.trim();
  var reflectionEl = document.getElementById('final-reflection');
  var reflection = reflectionEl ? reflectionEl.value.trim() : '';

  var statusEl = document.getElementById('contact-status');
  var submitBtn = formEl.querySelector('button[type="submit"]');

  if (!name || !email || !message) {
    if (statusEl) { statusEl.textContent = "Please fill in your name, email, and message."; statusEl.className = "form-status error"; }
    return;
  }

  if (submitBtn) submitBtn.disabled = true;
  if (statusEl) { statusEl.textContent = "Sending..."; statusEl.className = "form-status"; }

  try {
    await addDoc(collection(db, "messages"), {
      name: name, email: email, message: message, reflection: reflection,
      createdAt: serverTimestamp()
    });
    if (statusEl) { statusEl.textContent = "Thank you. Your reflection has been received."; statusEl.className = "form-status success"; }
    formEl.reset();
  } catch (e) {
    console.error("Error sending message:", e);
    if (statusEl) { statusEl.textContent = "Something went wrong. Please try again."; statusEl.className = "form-status error"; }
  } finally {
    if (submitBtn) submitBtn.disabled = false;
  }
};
