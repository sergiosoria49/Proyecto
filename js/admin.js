 const apiToken = "patdKlLsJLSL3C68A.7fc777b9e464f08c6a23cdbe39614c704abc8860070ccd95e36c43f138fcfa05";
    const baseId = "appEF5AiUAgBpCEuy";
    const tableName = "Workouts";
    const tableOptions = "Opciones"
    const airTableUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`
    const airtableOptions = `https://api.airtable.com/v0/${baseId}/${tableOptions}`
 
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
    mostrarCrearproducto()
    btnCrearProducto.style.display = "none"
  })
  // formulario para crear producto
 const label_nombre = document.createElement("label")
      const input_nombre = document.createElement("input")
      // input_nombre.id = "input_nombre"
      label_nombre.textContent = "Nombre del Plan"
      label_nombre.appendChild(input_nombre)

      const div_tipo_entrenamiento = document.createElement("div")
      const label_tipo_entrenamiento = document.createElement("label")
      label_tipo_entrenamiento.textContent = "Tipo de entreno"
      const select_tipo_entrenamiento = document.createElement("select")
      select_tipo_entrenamiento.setAttribute("multiple", true)
      select_tipo_entrenamiento.size = 1
      select_tipo_entrenamiento.setAttribute("id","tipo_entrenamiento")
      div_tipo_entrenamiento.appendChild(label_tipo_entrenamiento)
      div_tipo_entrenamiento.appendChild(select_tipo_entrenamiento)
      
      const label_descripcion = document.createElement("label")
      const input_descripcion = document.createElement("input")
      label_descripcion.textContent = "Descripcion"
      label_descripcion.appendChild(input_descripcion)

      const div_modalidad = document.createElement("div")
      const label_modalidad = document.createElement("label")
      label_modalidad.textContent = "Modalidad"
      const select_modalidad = document.createElement("select")
      select_modalidad.setAttribute("id","modalidad")
      div_modalidad.appendChild(label_modalidad)
      div_modalidad.appendChild(select_modalidad)

       const div_experiencia = document.createElement("div")
      const label_experiencia = document.createElement("label")
      label_experiencia.textContent = "experiencia"
      const select_experiencia = document.createElement("select")
      select_experiencia.setAttribute("multiple",true)
      select_experiencia.size = 1
      select_experiencia.setAttribute("id","experiencia")
      div_experiencia.appendChild(label_experiencia)
      div_experiencia.appendChild(select_experiencia)

      const label_popular = document.createElement("label")
      const inputCheck_popular = document.createElement("input")
      inputCheck_popular.type = "checkbox"
      label_popular.textContent = "Popular"
      label_popular.appendChild(inputCheck_popular)

      const label_precio = document.createElement("label")
      const input_precio = document.createElement("input")
      label_precio.textContent = "Precio"
      label_precio.appendChild(input_precio)

      const label_img = document.createElement("label")
      const input_imagen = document.createElement("input")
      label_img.textContent = "imagen"
      // input_imagen.type = "file"
      label_img.appendChild(input_imagen)

      const formCreate_submit = document.createElement("input")
      formCreate_submit.value = "Crear producto"
      formCreate_submit.id = "submit_crearForm"
      formCreate_submit.type = "submit"

      const formCreate_close = document.createElement("button")
      formCreate_close.textContent = "Cerrar"
      formCreate_close.id = "close_crearForm"


      formCreate.appendChild(label_nombre)
      formCreate.appendChild(div_tipo_entrenamiento)
      formCreate.appendChild(label_descripcion)
      formCreate.appendChild(div_modalidad)
      formCreate.appendChild(div_experiencia)
      formCreate.appendChild(label_popular)
      formCreate.appendChild(label_precio)
      formCreate.appendChild(label_img)
      formCreate.appendChild(formCreate_submit)
      formCreate.appendChild(formCreate_close)

      armarSelects()


   function mostrarCrearproducto () {
      formCreate.style.display = "block"
  }




  // carga opciones para los select - asi se evita errores del usuario 
  async function cargarOpciones() {
    const response = await fetch(airtableOptions, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-type' : 'application/json'
      }
    });

    const data = await response.json();
    console.log(data.records)

    return data.records;
}


async function armarSelects() {
  const opciones = await cargarOpciones();

  const selectTipo = document.getElementById("tipo_entrenamiento");
  const selectModalidad = document.getElementById("modalidad");
  const selectExperiencia = document.getElementById("experiencia");

  opciones.forEach(opt => {
    if (opt.fields.campo == "tipo_entrenamiento") {
      const option = document.createElement("option");
      option.value = opt.fields.valor;
      option.textContent = opt.fields.valor;
      selectTipo.appendChild(option);
    }

    if (opt.fields.campo == "modalidad") {
      const option = document.createElement("option");
      option.value = opt.fields.valor;
      option.textContent = opt.fields.valor;
      selectModalidad.appendChild(option);
    }

    if (opt.fields.campo == "nivel_experiencia") {
      const option = document.createElement("option");
      option.value = opt.fields.valor;
      option.textContent = opt.fields.valor;
      selectExperiencia.appendChild(option);
    }
  });
}
  // boton que cierra el form crear producto 
  const closeBtnFormCrear = document.querySelector("#close_crearForm")
    closeBtnFormCrear.addEventListener("click", () =>{
      formCreate.style.display = "none"
      btnCrearProducto.style.display = "block"
    })

    // boton con evento para crear producto mandando info a traves de un fetch "POST"
    const submitBtnFormCrear = document.querySelector("#submit_crearForm")



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
         const data = await response.json();
          console.log("data",data)
        obtenerWorkouts()
  }

  formCreate.addEventListener("submit", (e) =>{
      e.preventDefault()
      const valuesTipoEntrenamiento = Array.from(select_tipo_entrenamiento.selectedOptions).map(opt => opt.value);
      const valuesExperiencia = Array.from(select_experiencia.selectedOptions).map(opt => opt.value)
    console.log("Tipos seleccionados:", valuesTipoEntrenamiento);
    console.log(inputCheck_popular.checked)
    console.log(input_imagen.value)
      const nuevo ={
          Name:input_nombre.value,
          tipo_entrenamiento:valuesTipoEntrenamiento,
          descripcion:input_descripcion.value,
          modalidad: select_modalidad.value,
          nivel_experiencia: valuesExperiencia,
          popular: inputCheck_popular.checked,
          precio: Number(input_precio.value),
          imagen: input_imagen.value
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