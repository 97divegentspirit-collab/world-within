(function () {
  var nav = document.getElementById('world-door-nav');
  var toggle = document.getElementById('world-door-toggle');
  var panel = document.getElementById('world-door-panel');
  if (!nav || !toggle || !panel) return;

  function closeNav() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
  }

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    var isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    panel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  });

  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target)) closeNav();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });
})();
