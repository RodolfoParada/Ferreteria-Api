async function cargarProductos() {
    try {
        const resp = await fetch('http://localhost:3000/api/productos');
        const data = await resp.json();

        console.log(data)
        const contenedor = document.getElementById('lista-productos');

        // Mostrar productos
        contenedor.innerHTML = data.data.map(prod => `
            <div>
                <h3>${prod.nombre}</h3>
                <p>Descripción: ${prod.descripcion}</p>
                <p>Código: ${prod.codigo}</p>
                <p>Precio: $${prod.precio}</p>
                <p>Existencias: ${prod.existencias}</p>
                <img src="http://localhost:3000/imagenes/${prod.imagen}" alt="${prod.nombre}" width="200">
                <p>Categoria: ${prod.categoria}</p>
                <p>Subgrupo: ${prod.subgrupo}</p>
            </div>
            <hr>
        `).join('');

    } catch (error) {
        console.error("Error cargando productos:", error);
    }
}

cargarProductos();
