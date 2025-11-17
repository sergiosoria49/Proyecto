// estructura html
 const apiToken = "patdKlLsJLSL3C68A.7fc777b9e464f08c6a23cdbe39614c704abc8860070ccd95e36c43f138fcfa05";
    const baseId = "appEF5AiUAgBpCEuy";
    const tableName = "Workouts";
    const tableOptions = "Opciones"
    const airTableUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`
    const airtableOptions = `https://api.airtable.com/v0/${baseId}/${tableOptions}`
    const pagina = window.location.pathname;
    console.log(pagina)
    
    
async function obtenerServiciosPopular() {
  
  const res = await fetch(airTableUrl, {
    headers: {
      Authorization: `Bearer ${apiToken}`
    }
  });
  const data = await res.json();
  return data.records
  .filter(record => record.fields.popular) 
  .map(record => ({
    Name: record.fields.Name,
    imagen: record.fields.imagen,
    descripcion: record.fields.descripcion
  }));
}

async function obtenerServiciosAll() {
  
  const res = await fetch(airTableUrl, {
    headers: {
      Authorization: `Bearer ${apiToken}`
    }
  });
  const data = await res.json();
  return data.records
  .map(record => ({
    Name: record.fields.Name,
    imagen: record.fields.imagen,
    descripcion: record.fields.descripcion
  }));
}



function creacionDomServicios(servicios){
  const contenedor = document.querySelector(".services__content");
  servicios.forEach(servicio => {
    const item = document.createElement("div");
    item.classList.add("services__item");

    const h3 = document.createElement("h3");
    h3.classList.add("services__item__title");
    h3.textContent = servicio.Name;

    const containerImg = document.createElement("div");
    containerImg.classList.add("services__item__containerImg");

    const overlay = document.createElement("div");
    overlay.classList.add("services__item__overlay");

    const img = document.createElement("img");
    img.classList.add("services__item__img");
    img.src = servicio.imagen;
    img.alt = servicio.Name;

    const p = document.createElement("p");
    p.classList.add("services__item__text", "show-on-hover");
    p.textContent = servicio.descripcion;

    const button = document.createElement("button");
    button.classList.add("services__item__btn", "show-on-hover");
    button.textContent = "Ver plan";
    
    const buttonWorkout = document.createElement("button");
    buttonWorkout.classList.add("services__item__btn-workouts", "show-on-hover");
    buttonWorkout.textContent = "Ver todos los planes";

    button.addEventListener("click", () => {
      window.open("workoutPage.html", "_self"); 
    });

     buttonWorkout.addEventListener("click", () => {
      window.open("planes.html", "_self"); 
    });
    
      containerImg.append(overlay, img, p, button,buttonWorkout);
    

    item.append(h3, containerImg);
    contenedor.appendChild(item);
  });
}


 async function renderServicios() {
  const serviciosFiltradoPopular = await obtenerServiciosPopular();
    creacionDomServicios(serviciosFiltradoPopular)
 
}
  

// Llamar a la función
renderServicios();



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

  setInterval(updateSlide, 1000);



