 const apiToken = "patdKlLsJLSL3C68A.7fc777b9e464f08c6a23cdbe39614c704abc8860070ccd95e36c43f138fcfa05";
    const baseId = "appEF5AiUAgBpCEuy";
    const tableName = "Workouts";
    const tableOptions = "Opciones"
    const airTableUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`
    const airtableOptions = `https://api.airtable.com/v0/${baseId}/${tableOptions}`
    const cloudName = "dtcxlrla4";  
    const uploadPreset = "ml_default";  
 
    //Bandera
    let modo = "crear"
    let idEditando = null;
 /// CREAR PRODUCTO DESDE LA PAGINA WEB ENVIANDO A TRAVES DE UN FORMULARIO 
    const containerAdmin = document.querySelector(".admin__container")
    const formCreate = document.getElementById("form");

    formCreate.style.display = "none"

  const btnCrearProducto = document.createElement("button")
  btnCrearProducto.textContent = "Crear Producto"
  containerAdmin.appendChild(btnCrearProducto)

 

  btnCrearProducto.addEventListener("click", () =>{
    modo = "crear"
    console.log(modo)
    mostrarForm()
    mostrarBackground()
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
      input_imagen.type = "file"
      label_img.appendChild(input_imagen)

      const previewImg = document.createElement("img")
      const btnDeleteImg = document.createElement("button")
      previewImg.style.display = "none"
      btnDeleteImg.style.display = "none"
      btnDeleteImg.textContent = "Eliminar foto"

      const formCreate_submit = document.createElement("button")
      formCreate_submit.textContent = "Confirmar"
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
      formCreate.appendChild(previewImg)
      formCreate.appendChild(btnDeleteImg)
      formCreate.appendChild(formCreate_submit)
      formCreate.appendChild(formCreate_close)
      armarSelects()


   function mostrarForm () {
      form.reset() 
      formCreate.style.display = "block"
  }

  const overlayForm = document.querySelector(".overlay__form")

  function mostrarBackground(){
    overlayForm.style.display = "block"
  }

  function quitarBackground(){
    overlayForm.style.display = "none"
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
  
    formCreate_close.addEventListener("click", (e) =>{
      e.preventDefault()
      formCreate.style.display = "none"
      quitarBackground()
    })

    // boton con evento para crear producto mandando info a traves de un fetch "POST"

    overlayForm.addEventListener("click", (e) =>{
      if(e.target === overlayForm){
        quitarBackground()
      }
    })

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

 
    async function subirACloudinary(file) {
    const urlCloudinary = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const res = await fetch(urlCloudinary, {
        method: "POST",
        body: formData
    });

    const data = await res.json();
    return data.secure_url; 
}

  formCreate.addEventListener("submit", async (e) =>{
      e.preventDefault()
      const valuesTipoEntrenamiento = Array.from(select_tipo_entrenamiento.selectedOptions).map(opt => opt.value);
      const valuesExperiencia = Array.from(select_experiencia.selectedOptions).map(opt => opt.value)

      const file = input_imagen.files[0];

        let urlImagen = "";
      
         urlImagen =  await subirACloudinary(file);
            console.log("Imagen subida:", urlImagen);
        
      const nuevo ={
          Name:input_nombre.value,
          tipo_entrenamiento:valuesTipoEntrenamiento,
          descripcion:input_descripcion.value,
          modalidad: select_modalidad.value,
          nivel_experiencia: valuesExperiencia,
          popular: inputCheck_popular.checked,
          precio: Number(input_precio.value),
          imagen: urlImagen
      }
          console.log(nuevo)
        if(modo === "crear"){
          crearProducto(nuevo);
        }else if (modo ==="editar"){
          editarRegistro(idEditando,nuevo)
        }

        quitarBackground()

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
        modo = "editar"
        formCreate.style.display = "block"
        mostrarEditForm(r)
    })


    tr.appendChild(editBtn)
    tr.appendChild(btn)
  })}



// basicamente es el mismo que el de crear registro
  function mostrarEditForm(r) {
    mostrarForm()
    mostrarBackground()
    idEditando = r.id;
    const url = r.fields.imagen;

     if (url) {
        previewImg.src = url;
        previewImg.style.display = "block";
        btnDeleteImg.style.display = "inline-block";
    }

    input_nombre.value = r.fields.Name || "";
    const valoresTipoEntrenamiento = r.fields.tipo_entrenamiento || "";
    Array.from(select_tipo_entrenamiento.options).forEach(opt => {
        opt.selected = valoresTipoEntrenamiento.includes(opt.value)
    });
    input_descripcion.value = r.fields.descripcion || "";
    select_modalidad.value = r.fields.modalidad || "";
    const valoresExperiencia = r.fields.nivel_experiencia
    Array.from(select_experiencia.options).forEach(opt =>{
        opt.selected = valoresExperiencia.includes(opt.value)
    })
    inputCheck_popular.checked = r.fields.popular
    input_precio.value = r.fields.precio || "";
    
  }




  btnDeleteImg.addEventListener("click",async (e) =>{
    e.preventDefault()
    console.log(idEditando)
    await fetch(`${airTableUrl}/${idEditando}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fields: {
                imagen: null   
            }
        })
  })
    previewImg.style.display = "none"
    btnDeleteImg.style.display = "none"
})



  // editForm.addEventListener("submit",async (e) =>{
  //   e.preventDefault()

  //   const camposActualizado = {
  //       Name: document.getElementById("editName").value,
  //       tipo_entrenamiento: document.getElementById("editTipo").value,
  //       descripcion: document.getElementById("editDescripcion").value,
  //       precio: Number(document.getElementById("editPrecio").value)
  //   }
  //   console.log(camposActualizado)

  //   await editarRegistro(idEditando, camposActualizado);
  //   editForm.style.display = "none"; 
  // })








  

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