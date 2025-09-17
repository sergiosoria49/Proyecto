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