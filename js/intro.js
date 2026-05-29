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
    setTimeout(() => {
      intro.remove();
    }, 1600);

  }, 5200);

});

const introScreen2 =
  document.getElementById("intro-screen2");

const enterButton =
  document.getElementById("enter-experience");

enterButton.addEventListener("click", () => {

  introScreen.style.opacity = "0";
  introScreen.style.visibility = "hidden";

});
