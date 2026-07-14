// particles.js

const MAX_PARTICLES = window.innerWidth < 768 ? 30 : 60;
const particles = [];

function createParticle() {
  if (particles.length >= MAX_PARTICLES) return;

  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.position = "fixed";
  particle.style.width = "6px";
  particle.style.height = "6px";
  particle.style.borderRadius = "50%";
  particle.style.background = "rgba(255,255,255,0.6)";
  particle.style.left = Math.random() * window.innerWidth + "px";
  particle.style.top = "0px";
  particle.style.willChange = "transform";

  document.body.appendChild(particle);
  particles.push({ el: particle, y: Math.random() * window.innerHeight });
}

function animateParticles() {
  for (const p of particles) {
    p.y -= 0.5;
    if (p.y < 0) p.y = window.innerHeight;
    p.el.style.transform = `translateY(${p.y}px)`;
  }
  requestAnimationFrame(animateParticles);
}

for (let i = 0; i < MAX_PARTICLES; i++) createParticle();
animateParticles();
