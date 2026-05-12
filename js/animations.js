// animations.js

function pulseElement(element) {
  element.style.transition = "transform 2s ease-in-out";
  element.style.transform = "scale(1.05)";

  setTimeout(() => {
    element.style.transform = "scale(1)";
  }, 2000);
}

// Gentle fade in
function fadeIn(element) {
  element.style.opacity = 0;
  element.style.transition = "opacity 2s ease";

  setTimeout(() => {
    element.style.opacity = 1;
  }, 100);
}
