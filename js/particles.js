// particles.js

function createParticle() {
  const particle = document.createElement("div");

  particle.className = "particle";

  particle.style.position = "fixed";
  particle.style.width = "6px";
  particle.style.height = "6px";
  particle.style.borderRadius = "50%";
  particle.style.background = "rgba(255,255,255,0.6)";
  particle.style.top = Math.random() * window.innerHeight + "px";
  particle.style.left = Math.random() * window.innerWidth + "px";

  document.body.appendChild(particle);

  animateParticle(particle);
}

function animateParticle(p) {
  let y = parseFloat(p.style.top);

  setInterval(() => {
    y -= 0.5;
    p.style.top = y + "px";

    if (y < 0) {
      y = window.innerHeight;
    }
  }, 30);
}

// Start atmosphere
setInterval(createParticle, 300);
