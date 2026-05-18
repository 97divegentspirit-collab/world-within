window.addEventListener("load", () => {

  const intro = document.getElementById("intro-screen");

  // OPEN BOOK
  setTimeout(() => {
    intro.classList.add("open");
  }, 600);

  // REMOVE INTRO
  setTimeout(() => {

    intro.style.opacity = "0";

    intro.style.transition = "opacity 1.5s ease";

    setTimeout(() => {
      intro.remove();
    }, 1600);

  }, 5500);

});
