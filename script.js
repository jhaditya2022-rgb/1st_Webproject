const slides = document.querySelectorAll('.slide');
let index = 0;

setInterval(() => {
  slides[index].classList.remove('active');
  index = (index + 1) % slides.length;
  slides[index].classList.add('active');
}, 5000);

// Drawer Logic
const infoBtn = document.getElementById('info-trigger-btn');
const drawer = document.getElementById('info-drawer');
const closeBtn = document.getElementById('close-drawer');

infoBtn.addEventListener('click', () => {
  drawer.classList.toggle('active');
});

closeBtn.addEventListener('click', () => {
  drawer.classList.remove('active');
});

// Close drawer if user clicks anywhere else on the screen
window.addEventListener('click', (e) => {
  if (!drawer.contains(e.target) && !infoBtn.contains(e.target)) {
    drawer.classList.remove('active');
  }
});