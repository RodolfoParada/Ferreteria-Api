


async function cargarProductos() {
    try {
        const resp = await fetch('/data/productos.json');
        const data = await resp.json();

        console.log(data)
        const contenedor = document.getElementById('lista-productos');

          // Aplanar JSON
        let productos = [];

        Object.values(data).forEach(categoria => {
            Object.values(categoria).forEach(subgrupo => {
                productos = productos.concat(subgrupo);
            });
        });
         
           // ==========================
        // 🔹 FILTRO POR CATEGORÍA
        // (CAMBIO MÍNIMO)
        // ==========================
       if (window.categoriaSeleccionada !== "todos") {
    productos = productos.filter(prod =>
        prod.categoria.toLowerCase() ===
        window.categoriaSeleccionada.toLowerCase()
    );
}



        // Mostrar productos
     contenedor.innerHTML = productos.map(prod => `
            <div class="producto-card">
                <img src="http://localhost:3000/imagenes/${prod.imagen}" 
                     alt="${prod.nombre}" 
                     class="card-imagen">
                
                <div class="card-cuerpo">
                    <h3 class="card-titulo">${prod.nombre}</h3>
                    <p class="card-precio">$${prod.precio}</p>
                    <p class="card-descripcion">${prod.descripcion}</p>
                    
                    <div class="card-detalles">
                        <p>Código: ${prod.codigo}</p>
                        <p>Existencias: ${prod.stock}</p>
                        <p>Categoría: ${prod.categoria}</p>
                    </div>
                    <div class="card-boton"> 
                    <button class="boton">Comprar</button>
                    </div>
                </div>
            </div>
        `).join(''); // Quitamos el <hr> que ya no es necesario

    } catch (error) {
        console.error("Error cargando productos:", error);
    }
}

cargarProductos();