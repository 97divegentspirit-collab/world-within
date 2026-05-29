window.addEventListener("load", () => {

  const intro = document.getElementById("intro-screen");

  // safety check
  if (!intro) return;

  // OPEN BOOK (slight delay for atmosphere)
  setTimeout(() => {
    intro.classList.add("open");
  }, 600);

  // TRANSITION INTO WEBSITE
  setTimeout(() => {

    intro.classList.add("fade-out");

    document.body.classList.remove("loading");
    document.body.classList.add("loaded");

    intro.style.transition = "opacity 1.5s ease";
    intro.style.opacity = "0";

    // REMOVE INTRO AFTER FADE
    
// HIDE FIRST INTRO SMOOTHLY
    setTimeout(() => {

      intro.style.visibility = "hidden";
      intro.style.pointerEvents = "none";

    }, 2200);
  }, 5200);

});

setTimeout(() => {

  introScreen2.classList.add("show");

}, 1200);
const introScreen2 =
  document.getElementById("intro-screen2");

const enterButton =
  document.getElementById("enter-experience");

enterButton.addEventListener("click", () => {

  introScreen2.style.opacity = "0";
  introScreen2.style.visibility = "hidden";

});
