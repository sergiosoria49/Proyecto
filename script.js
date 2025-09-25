// const iconoHamburguesa = document.querySelector('hamburger')
// const hamburguesa = document.querySelector('navbar__nav')

// iconoHamburguesa.addEventListener('click', () =>{
//     alert("hola")
// })

const hamburger = document.querySelector('.hamburger')
const navLinks = document.querySelector('.navbar__nav')
const navLinksLogin = document.querySelector('.navbar__nav__login')

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active')
  navLinksLogin.classList.toggle('active')
});

function setVH(){
  // window.innerHeight = alto visible real en pixeles
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`)
  console.log("Se ejercuto la funcion")
}

setVH();

window.addEventListener('resize',setVH);