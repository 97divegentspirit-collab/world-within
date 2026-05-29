window.addEventListener("load", () => {

  const intro =
    document.getElementById("intro-screen");

  const introScreen2 =
    document.getElementById("intro-screen2");

  const enterButton =
    document.getElementById("enter-experience");

  // safety check
  if (!intro) return;

  // OPEN BOOK
  setTimeout(() => {
    intro.classList.add("open");
  }, 600);

  // TRANSITION
  setTimeout(() => {

    intro.classList.add("fade-out");

    // SHOW SECOND SCREEN
    introScreen2.classList.add("show");

    document.body.classList.remove("loading");
    document.body.classList.add("loaded");

    // REMOVE FIRST INTRO
    setTimeout(() => {
      intro.remove();
    }, 1600);

  }, 5200);

  // ENTER BUTTON
  enterButton.addEventListener("click", () => {

    introScreen2.style.opacity = "0";
    introScreen2.style.visibility = "hidden";

  });

});
