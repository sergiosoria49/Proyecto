


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

    carrito.forEach(item => {
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
        precio.innerHTML = `<strong>$${item.precio}</strong>`;

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

        content.appendChild(titulo);
        content.appendChild(desc);
        content.appendChild(precio);
        content.appendChild(label);
        content.appendChild(input);

        card.appendChild(img);
        card.appendChild(content);
        card.appendChild(btnEliminar);

        cont.appendChild(card);
    });
}

function cambiarCantidad(id, nuevaCant) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const index = carrito.findIndex(p => p.id === id);
    carrito[index].cantidad = parseInt(nuevaCant);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarItem(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
}

cargarCarrito();
