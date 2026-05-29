
window.addEventListener("load", () => {

  const intro = document.getElementById("intro-screen");
  const introScreen2 = document.getElementById("intro-screen2");
  const enterButton = document.getElementById("enter-experience");

  if (!intro || !introScreen2 || !enterButton) return;

  // STEP 1: OPEN INTRO 1
  setTimeout(() => {
    intro.classList.add("open");
  }, 600);

  // STEP 2: FADE OUT INTRO 1
  setTimeout(() => {
    intro.classList.add("fade-out");
  }, 5200);

  // STEP 3: SHOW INTRO 2 (AFTER FADE STARTS)
  setTimeout(() => {
    introScreen2.classList.add("show");
  }, 6400);

  // STEP 4: CLEANUP INTRO 1
  setTimeout(() => {
    intro.style.visibility = "hidden";
    intro.style.pointerEvents = "none";
  }, 7200);

  // BUTTON FLOW
  enterButton.addEventListener("click", () => {
    introScreen2.classList.remove("show");
    introScreen2.style.opacity = "0";
    introScreen2.style.visibility = "hidden";
  });

});
