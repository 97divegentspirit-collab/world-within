function openDoor(id) {
  var overlay = document.getElementById('overlay-' + id);
  if (overlay) overlay.classList.add('open');
}
function closeDoor(id) {
  var overlay = document.getElementById('overlay-' + id);
  if (overlay) overlay.classList.remove('open');
}
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('door-overlay')) e.target.classList.remove('open');
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.door-overlay.open').forEach(function (o) { o.classList.remove('open'); });
  }
});
