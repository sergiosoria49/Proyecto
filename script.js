
// metodo hamburgesa 
const hamburger = document.querySelector('.hamburger')
const navLinks = document.querySelector('.navbar__nav')
const navLinksLogin = document.querySelector('.navbar__nav__login')

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active')
  navLinksLogin.classList.toggle('active')
});

// Calcular la altura de la pantalla 
function setVH(){
  // window.innerHeight = alto visible real en pixeles
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

setVH();

window.addEventListener('resize',setVH);

// carousel

const track = document.querySelector('.about-me__carousel-wrapper')
const slides = Array.from(track.children)
const nextButton = document.querySelector('.next')
const prevButton = document.querySelector('.prev')

let currentIndex = 0;

function updateSlide() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  }

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlide();
  });

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlide();
  });

  window.addEventListener('resize', updateSlide);
