


function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const cont = document.getElementById("carritoContainer");
    cont.innerHTML = "";

    if (carrito.length === 0) {
        const vacio = document.createElement("p");
        vacio.textContent = "Tu carrito está vacío.";
        cont.appendChild(vacio);
        return;
    }

    let totalPagar = 0

    carrito.forEach(item => {
        const subtotal = item.cantidad * item.precio
        totalPagar += subtotal

        const card = document.createElement("div");
        card.className = "carrito-item";

        const img = document.createElement("img");
        img.src = item.imagen;

        const content = document.createElement("div");
        content.className = "carrito-info";

        const titulo = document.createElement("h3");
        titulo.textContent = item.name;

        const desc = document.createElement("p");
        desc.textContent = item.descripcion;

        const precio = document.createElement("p");
        precio.innerHTML = `Precio Unitario:<strong> $${item.precio}</strong>
                            Subtotal: <strong>$${subtotal}</strong>`;
        precio.classList.add("precio")

        const label = document.createElement("label");
        label.textContent = "Meses: ";

        const input = document.createElement("input");
        input.type = "number";
        input.min = "1";
        input.value = item.cantidad;
        input.onchange = () => cambiarCantidad(item.id, input.value);

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = "btn-eliminar";
        btnEliminar.onclick = () => eliminarItem(item.id);

        const total = document.createElement("div")
        total.innerHTML= `<p>Total: <span>$${totalPagar}</span> <button >Comprar</button></p>`





        content.appendChild(titulo);
        content.appendChild(desc);
        content.appendChild(precio);
        content.appendChild(label);
        content.appendChild(input);
        

        card.appendChild(img);
        card.appendChild(content);
        card.appendChild(btnEliminar);

        cont.appendChild(card);
        cont.append(total)
    });
}

function cambiarCantidad(id, nuevaCant) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const index = carrito.findIndex(p => p.id === id);
    carrito[index].cantidad = parseInt(nuevaCant); 
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito()
}

function eliminarItem(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
}



cargarCarrito();
