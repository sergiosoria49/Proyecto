 const apiToken = "patdKlLsJLSL3C68A.7fc777b9e464f08c6a23cdbe39614c704abc8860070ccd95e36c43f138fcfa05";
    const baseId = "appEF5AiUAgBpCEuy";
    const tableName = "Workouts";
    const airTableUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`
 
 /// CREAR PRODUCTO DESDE LA PAGINA WEB ENVIANDO A TRAVES DE UN FORMULARIO 
    const containerAdmin = document.querySelector(".admin__container")
    const formCreate = document.getElementById("form");
    const editForm = document.querySelector("#editForm");
    editForm.style.display = "none"
    formCreate.style.display = "none"

  const btnCrearProducto = document.createElement("button")
  btnCrearProducto.textContent = "Crear Producto"
  containerAdmin.appendChild(btnCrearProducto)

  btnCrearProducto.addEventListener("click", () =>{
    cargarCrearproducto()
  })

  function cargarCrearproducto () {
      formCreate.style.display = "block"
      
  }

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



//  eliminar registro
async function eliminarWorkout(id){
    const response = await fetch(`${airTableUrl}/${id}`,{
        method:'delete',
        headers : {
            'Authorization' : `Bearer ${apiToken}`
        }
    })
    await obtenerWorkouts();
}

//Obtener y mostrar registros
async function obtenerWorkouts() {
  const response = await fetch(airTableUrl,{
    headers:{
        'Authorization':`Bearer ${apiToken}`,
        'Content-Type': 'application/json'
    }
  })

  const data = await response.json();
  mostrarWorkouts(data.records);
}



function mostrarWorkouts(records) {
  const tbody = document.querySelector("tbody")
  tbody.innerHTML = "";
    

  records.forEach((r) => {
    const tr = document.createElement("tr")

    const td_nombre = document.createElement("td")
    td_nombre.textContent = `${r.fields.Name}`


    
    const td_tipo_entrenamiento = document.createElement("td")
    td_tipo_entrenamiento.textContent = `${r.fields.tipo_entrenamiento}`


    const td_descripcion = document.createElement("td")
    td_descripcion.textContent = `${r.fields.descripcion}`


    const td_modalidad = document.createElement("td")
    td_modalidad.textContent = `${r.fields.modalidad}`
  

    const td_nivel_experiencia = document.createElement("td")
    td_nivel_experiencia.textContent = `${r.fields.nivel_experiencia}`
    

    const td_popular = document.createElement("td")
    const popular = document.createElement("input")
    popular.type = "checkbox";
    popular.disabled = true;
    popular.checked =!!r.fields.popular
    td_popular.appendChild(popular)

    const td_precio = document.createElement("td")
    td_precio.textContent = `${r.fields.precio}`
    
    const imagen = document.createElement("img")
    const td_imagen = document.createElement("td")
    imagen.src = `${r.fields.imagen}`
    td_imagen.appendChild(imagen)

    tr.appendChild(td_nombre)
    tr.appendChild(td_tipo_entrenamiento)
    tr.appendChild(td_descripcion)
    tr.appendChild(td_modalidad)
    tr.appendChild(td_nivel_experiencia)
    tr.appendChild(td_popular)
    tr.appendChild(td_precio)
    tr.appendChild(td_imagen)

    tbody.appendChild(tr);

  

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


    tr.appendChild(editBtn)
    tr.appendChild(btn)
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
    editForm.style.display = "none"; 
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