// public/js/filtroComponent.js

function crearFiltroTiendas(tiendas, callbackSeleccion) {
    const filterContainer = document.createElement("div");
    filterContainer.className = "filter-container";
    // Estilos básicos para evitar que se oculte o desplace mal
    filterContainer.style.padding = "20px"; 

    filterContainer.innerHTML = `
        <label for="filtro-tiendas" style="display:block; margin-bottom:10px; color:#1A4C6E; font-weight:bold;">
            Filtrar por Sucursal:
        </label>
        <select id="filtro-tiendas" style="padding:10px; width:100%; max-width:400px; border-radius:10px; border:1px solid #ccc;">
            <option value="todas">--- Todas las tiendas ---</option>
            ${tiendas.map(t => `<option value="${t.id}">${t.nombre}</option>`).join('')}
        </select>
    `;

    const select = filterContainer.querySelector("#filtro-tiendas");
    select.addEventListener("change", (e) => {
        callbackSeleccion(e.target.value);
    });

    return filterContainer;
}