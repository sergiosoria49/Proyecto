 const apiToken = "patdKlLsJLSL3C68A.7fc777b9e464f08c6a23cdbe39614c704abc8860070ccd95e36c43f138fcfa05";
    const baseId = "appEF5AiUAgBpCEuy";
    const tableName = "Workouts";
    const tableOptions = "Opciones"
    const airTableUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`
 



    // Obtener el ID del plan desde la URL (plan.html?id=xxxxx)
const urlParams = new URLSearchParams(window.location.search);
const planId = urlParams.get("id");
const container = document.getElementById("workoutPage");


// ---------------------
// FUNCIÓN PRINCIPAL
// ---------------------
async function loadPlan() {
    try {
        const response = await fetch(`${airTableUrl}/${planId}`,
            {
                headers: {
                    Authorization: `Bearer ${apiToken}`,
                },
            }
        );

        const data = await response.json();
        buildPage(data.fields);

    } catch (error) {
        console.error("Error al traer plan:", error);
        container.innerHTML = "<p>Error al cargar el plan.</p>";
    }
}

async function loadTestimonials() {
    try {
        const url = `https://api.airtable.com/v0/${baseId}/Testimonios`;

        const response = await fetch(url, {
            headers: { Authorization: `Bearer ${apiToken}` }
        });

        const data = await response.json();

        buildTestimonials(data.records);

    } catch (error) {
        console.error("Error al traer testimonios:", error);
    }
}


function buildPage(plan) {

    // HERO SECTION
    const hero = document.createElement("section");
    hero.className = "hero-section";

    const img = document.createElement("img")
    img.classList.add("plan-img")
    img.src = `${plan.imagen}`

    const containerHero = document.createElement("div")
    containerHero.classList.add("hero-info") 
    
    const tituloWorkout = document.createElement("h2")
    tituloWorkout.textContent = `${plan.Name}`
    const descripcionWorkout = document.createElement("p")
    descripcionWorkout.textContent = `${plan.descripcion_larga}`
    const btnBuy = document.createElement("button")
    btnBuy.classList.add("buy-btn")
    btnBuy.textContent = "Comprar plan"

    containerHero.append(tituloWorkout,descripcionWorkout,btnBuy)
    hero.append(img,containerHero)

    // PRECIO
    const priceSection = document.createElement("section");
    priceSection.className = "price-box";

    const tituloPrice = document.createElement("h3")
    tituloPrice.textContent = "Precio"
    const valorPrecio = document.createElement("p")
    valorPrecio.classList.add("price")
    valorPrecio.textContent = `$${plan.precio}`
    
    priceSection.append(tituloPrice,valorPrecio,btnBuy)

    container.appendChild(hero);
    container.appendChild(priceSection);
    


    const btnBuyAll = document.querySelectorAll(".buy-btn") 

    btnBuyAll.forEach(btn => {
        
                
        btn.addEventListener("click", () => {
        
        const planParaCarrito = {
            id: planId,
            Name: plan.Name,
            descripcion: plan.descripcion || "",
            precio: plan.precio || 0,
            imagen: plan.imagen || ""
        };
        agregarAlCarrito(planParaCarrito);
    });
        });
    
}

function buildTestimonials(records) {
    const containerTestimonios = document.querySelector(".testimoniosContainer")
    const testContainer = document.createElement("div");
    testContainer.className = "testimonios";

    records.forEach(record => {
        const f = record.fields;
        const card = document.createElement("div");
        card.className = "test-card";

        const imgTestimonio = document.createElement("img")
        imgTestimonio.src = `${f.Foto}`
        imgTestimonio.classList.add("test-img")
        const nombreTestimonio = document.createElement("p")
        nombreTestimonio.textContent = `${f.Nombre}`
        nombreTestimonio.classList.add("test-name")
        const testimonio = document.createElement("p")
        testimonio.classList.add("test-comment")
        testimonio.textContent = `${f.Comentario}`

        card.append(imgTestimonio,nombreTestimonio,testimonio)
        testContainer.appendChild(card);
    });

    containerTestimonios.appendChild(testContainer);
}


function agregarAlCarrito(plan) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const item = carrito.find(i => i.id === plan.id);

  if (item) {
    item.cantidad++;
} else {
      carrito.push({ ...plan, cantidad: 1 });

  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
    window.location.href = "carrito.html";
}



loadTestimonials()
loadPlan();