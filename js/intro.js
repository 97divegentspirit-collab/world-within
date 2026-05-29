

window.addEventListener("load", () => {

  const intro = document.getElementById("intro-screen");
  const introScreen2 = document.getElementById("intro-screen2");
  const enterButton = document.getElementById("enter-experience");

  // safety check
  if (!intro || !introScreen2 || !enterButton) return;

  // OPEN BOOK
  setTimeout(() => {
    intro.classList.add("open");
  }, 600);

  // TRANSITION INTO WEBSITE
  setTimeout(() => {

    intro.classList.add("fade-out");

    document.body.classList.remove("loading");
    document.body.classList.add("loaded");

    // SHOW SECOND INTRO (FLOW BRIDGE)
    setTimeout(() => {
      introScreen2.classList.add("show");
    }, 1200);

    // SOFT HIDE FIRST INTRO (NOT HARD REMOVE)
    setTimeout(() => {
      intro.style.visibility = "hidden";
      intro.style.pointerEvents = "none";
    }, 2200);

  }, 5200);

  // BUTTON INSIDE SECOND INTRO
  enterButton.addEventListener("click", () => {

    introScreen2.style.opacity = "0";
    introScreen2.style.visibility = "hidden";

  });

});
