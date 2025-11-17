
 const apiToken = "patdKlLsJLSL3C68A.7fc777b9e464f08c6a23cdbe39614c704abc8860070ccd95e36c43f138fcfa05";
    const baseId = "appEF5AiUAgBpCEuy";
    const tableName = "Workouts";
    const tableOptions = "Opciones"
    const airTableUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`
    const airtableOptions = `https://api.airtable.com/v0/${baseId}/${tableOptions}`
    const pagina = window.location.pathname;
    

window.addEventListener("DOMContentLoaded", () =>{
    // Carga de elementos del DOM

    const inputSearch = document.querySelector(".workouts__input-serch")
    const workoutsContainer = document.querySelector(".services__content")
    const checks = Array.from(document.querySelectorAll('.workouts__input'))
    

    //eventos
    inputSearch.addEventListener("input", aplicarFiltros)
    checks.forEach(ch => ch.addEventListener("change", aplicarFiltros))
    inputSearch.addEventListener("input", aplicarFiltros)
    //render de la pagina al cargarse
    let servicios = []

  async function init() {
      servicios = await obtenerServicios();  
      renderServicios(servicios)                    
  }

    init();


function aplicarFiltros() {
      workoutsContainer.innerHTML = ""
    
      const filtrados = servicios.filter(serv => {

    // NORMALIZACIÓN DE CAMPOS 
    const tipo = Array.isArray(serv.tipo_entrenamiento)
        ? serv.tipo_entrenamiento.map(t => t.toLowerCase())
        : [serv.tipo_entrenamiento?.toLowerCase()]
    
    const nivel = Array.isArray(serv.nivel_experiencia)
        ? serv.nivel_experiencia.map(n => n.toLowerCase())
        : [serv.nivel_experiencia?.toLowerCase()]
    
    const modo = Array.isArray(serv.modalidad)
        ? serv.modalidad.map(m => m.toLowerCase())
        : [serv.modalidad?.toLowerCase()]
    
    const categoriasDelItem = [
        ...tipo,
        ...nivel,
        ...modo,
        serv.popular ? "popular" : ""
    ]

    // -------- FILTRO POR CHECKBOX --------
    const checksMarcados = document.querySelectorAll('input[type="checkbox"]:checked')

    const seleccionados = Array.from(checksMarcados).map(chk => chk.value.toLowerCase())
    
    const coincideChecks = seleccionados.length === 0 || seleccionados.every(sel => categoriasDelItem.includes(sel))
    

    // -------- FILTRO POR BUSCADOR --------
    const txt = inputSearch.value.trim().toLowerCase()
    const coincideBuscador = serv.Name.toLowerCase().includes(txt) 

    return coincideChecks && coincideBuscador
})

    creacionDomServicios(filtrados)
}




async function obtenerServicios() {
    const res = await fetch(airTableUrl, {
        headers: {
            Authorization: `Bearer ${apiToken}`,
            "Content-Type": "application/json"
        }
    });

    const data = await res.json();

    return data.records.map(record => ({
        Name: record.fields.Name || "",
        imagen: record.fields.imagen || "",
        descripcion: record.fields.descripcion || "",
        modalidad: record.fields.modalidad || "",
        popular: record.fields.popular || false,
        tipo_entrenamiento: record.fields.tipo_entrenamiento || "",
        nivel_experiencia: record.fields.nivel_experiencia || "",
    }));
}




function creacionDomServicios(servicios){
    const contenedor = document.querySelector(".services__content");
    workoutsContainer.innerHTML = ""
    
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

 async function renderServicios(servicios) {

      creacionDomServicios(servicios)
      
}
})