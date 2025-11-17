 const apiToken = "patdKlLsJLSL3C68A.7fc777b9e464f08c6a23cdbe39614c704abc8860070ccd95e36c43f138fcfa05";
    const baseId = "appEF5AiUAgBpCEuy";
    const tableName = "Workouts";
    const tableOptions = "Opciones"
    const airTableUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`


    // Obtener el ID del plan desde la URL (plan.html?id=xxxxx)
const urlParams = new URLSearchParams(window.location.search);
const planId = urlParams.get("id");
console.log(urlParams)
console.log(planId)
// Contenedor principal donde se va a generar todo
const container = document.getElementById("workoutPage");

console.log("URL completa:", `${airTableUrl}/${planId}`);
console.log("planId:", planId);
console.log("URL Params:", window.location.search);
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


// ---------------------
// CREAR TODA LA PÁGINA CON DOM
// ---------------------
function buildPage(plan) {

    // HERO SECTION
    const hero = document.createElement("section");
    hero.className = "hero-section";

    hero.innerHTML = `
        <img src="${plan.imagen}" class="plan-img">

        <div class="hero-info">
            <h2>${plan.Name}</h2>
            <p>${plan.descripcion_larga}</p>

            

            <button class="buy-btn" id="btnComprar">Comprar plan</button>
        </div>
    `;


    // QUÉ INCLUYE
    const includes = document.createElement("section");
    includes.className = "includes";

    // includes.innerHTML = `
    //     <h3>📦 Qué incluye</h3>
    //     <ul>
    //         ${plan.Incluye.split("\n").map(i => `<li>${i}</li>`).join("")}
    //     </ul>
    // `;


    // PRECIO
    const price = document.createElement("section");
    price.className = "price-box";

    price.innerHTML = `
        <h3>💰 Precio</h3>
        <p class="price">$${plan.precio}</p>
        <button class="buy-btn" id="btnComprar2">Comprar plan</button>
    `;


    // TESTIMONIOS
    // const testimonials = document.createElement("section");
    // testimonials.className = "testimonials";

    // testimonials.innerHTML = `
    //     <h3>⭐ Opiniones</h3>
    //     <div class="tests-container">
    //         ${plan.testimonios.map(t => `
    //             <div class="test-card">
    //                 <img src="https://cdn-icons-png.flaticon.com/512/456/456212.png">
    //                 <p><strong>${t.nombre}</strong></p>
    //                 <p>${t.texto}</p>
    //             </div>
    //         `).join("")}
    //     </div>
    // `;

    // Insertar todo en la página
    container.appendChild(hero);
    // container.appendChild(includes);
    container.appendChild(price);
    // container.appendChild(testimonials);



    // LÓGICA LOGIN
    document.querySelectorAll(".buy-btn").forEach(btn => {
        btn.addEventListener("click", () => {

            const logged = localStorage.getItem("userLogged");

            if (!logged) {
                window.location.href = `login.html?return=${window.location.href}`;
            } else {
                window.location.href = "checkout.html?id=" + planId;
            }

        });
    });
}

function buildTestimonials(records) {
    const containerTestimonios = document.querySelector(".testimoniosContainer")
    console.log(containerTestimonios)
    const testContainer = document.createElement("div");
    testContainer.className = "testimonios";

    records.forEach(record => {
        const f = record.fields;
        const card = document.createElement("div");
        card.className = "test-card";

        card.innerHTML = `
            <img src="${f.Foto || 'default.png'}" class="test-img">
            <p class="test-name">${f.Nombre}</p>
            <p class="test-comment">${f.Comentario}</p>
        `;

        testContainer.appendChild(card);
    });

    containerTestimonios.appendChild(testContainer);
}

loadTestimonials()
loadPlan();