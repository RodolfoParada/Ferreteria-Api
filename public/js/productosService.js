async function cargarProductos() {
    try {
        const resp = await fetch('http://localhost:3000/api/productos');
        const data = await resp.json();

        const contenedor = document.getElementById('lista-productos');

        // Mostrar productos
        contenedor.innerHTML = data.data.map(prod => `
            <div>
                <h3>${prod.nombre}</h3>
                <p>Precio: $${prod.precio}</p>
            </div>
            <hr>
        `).join('');

    } catch (error) {
        console.error("Error cargando productos:", error);
    }
}

cargarProductos();
