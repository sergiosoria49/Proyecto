 const apiToken = "patdKlLsJLSL3C68A.7fc777b9e464f08c6a23cdbe39614c704abc8860070ccd95e36c43f138fcfa05";
    const baseId = "appEF5AiUAgBpCEuy";
    const tableName = "Workouts";
    const airTableUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`
 
 /// CREAR PRODUCTO DESDE LA PAGINA WEB ENVIANDO A TRAVES DE UN FORMULARIO 

        const form = document.getElementById("form");
        const div = document.querySelector(".workouts__list")
        const editForm = document.querySelector("#editForm");
        editForm.style.display = "none"

        async function crearProducto(nuevo){
            const response = await fetch(airTableUrl,{
                method: 'POST',
                headers : {
                    'Authorization': `Bearer ${apiToken}`,
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fields: nuevo
                
            })
            
        
        })
        obtenerWorkouts()
    }

        form.addEventListener("submit", (e) =>{
            e.preventDefault()

            const nuevo ={
                Name:document.getElementById("Name").value,
                tipo_entrenamiento:document.getElementById("tipo_entrenamiento").value,
                descripcion:document.getElementById("descripcion").value
            }
                console.log(nuevo)
            crearProducto(nuevo);
        })
// editar producto 

async function obtenerWorkouts() {
  const response = await fetch(airTableUrl,{
    headers:{
        'Authorization':`Bearer ${apiToken}`,
        'Content-Type': 'application/json'
    }
  })

  const data = await response.json();
  console.log(data.records)
  mostrarWorkouts(data.records);
}
async function eliminarWorkout(id){
    const response = await fetch(`${airTableUrl}/${id}`,{
        method:'delete',
        headers : {
            'Authorization' : `Bearer ${apiToken}`
        }
    })
    await obtenerWorkouts();
}

function mostrarWorkouts(records) {
    div.innerHTML = "";

  records.forEach((r) => {
    const divInterno = document.createElement("div");
    divInterno.classList.add("workout-item");
    const titulo = document.createElement("p");
    const tipo_entrenamiento = document.createElement("p")
    const descripcion = document.createElement("p")
    const modalidad = document.createElement("p")
    const nivel_experiencia = document.createElement("p")
    const popular = document.createElement("input")
    popular.type = "checkbox";
    popular.disabled = true;
    const precio = document.createElement("p")
    const imagen = document.createElement("img")

    titulo.textContent = `${r.fields.Name}`

    tipo_entrenamiento.textContent = `${r.fields.tipo_entrenamiento}`

    descripcion.textContent = `${r.fields.descripcion}`

    modalidad.textContent = `${r.fields.modalidad}`

    nivel_experiencia.textContent = `${r.fields.nivel_experiencia}`

    popular.checked =!!r.fields.popular

    precio.textContent = `${r.fields.precio}`
    imagen.src = `${r.fields.imagen}`
    imagen

    

    divInterno.append(titulo,tipo_entrenamiento,descripcion,modalidad,nivel_experiencia,popular,precio,imagen)
    console.log(divInterno)


    const btn = document.createElement("button");
    btn.textContent = "Eliminar";
    btn.addEventListener("click", () => {
        eliminarWorkout(`${r.id}`)
    })

    const editBtn = document.createElement("button");
    editBtn.textContent = "Editar"
    editBtn.addEventListener("click", () =>{
        cargarEditForm(r)
    })


    divInterno.appendChild(editBtn)
    divInterno.appendChild(btn)

    div.appendChild(divInterno);
  })}

    function cargarEditForm(r) {
    editForm.style.display = "block";
    idEditando = r.id;

    document.getElementById("editName").value = r.fields.Name || "";
    document.getElementById("editTipo").value = r.fields.tipo_entrenamiento || "";
    document.getElementById("editDescripcion").value = r.fields.descripcion || "";
    document.getElementById("editPrecio").value = r.fields.precio || "";
  }

  editForm.addEventListener("submit",async (e) =>{
    e.preventDefault()

    const camposActualizado = {
        Name: document.getElementById("editName").value,
        tipo_entrenamiento: document.getElementById("editTipo").value,
        descripcion: document.getElementById("editDescripcion").value,
        precio: Number(document.getElementById("editPrecio").value)
    }
    console.log(camposActualizado)

    await editarRegistro(idEditando, camposActualizado);
    editForm.style.display = "none"; // ocultar form otra vez
  })

  async function editarRegistro(id,campo){
        const response = await fetch (`${airTableUrl}/${id}`,{
            method:'PATCH',
            headers:{
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                fields: campo
            })
        })
        const dataActualizada = await response.json()

        console.log("Cambio realizado con exito", dataActualizada)
        obtenerWorkouts();
  }



  

// inicializacion 
obtenerWorkouts();


if (document.querySelector(".logout-admin")) {
  // Si no está logueado, lo mandamos al login
  const isAdmin = localStorage.getItem("isAdmin");
  if (isAdmin !== "true") {
    window.location.href = "index.html";
  }

  // Botón de logout
  document.querySelector(".logout-admin").addEventListener("click", () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "index.html";
  });
}