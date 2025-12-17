// public/js/tiendasService.js

async function cargarTiendas() {
    const container = document.getElementById("tiendas-container");

    if (!container) {
        console.warn("❌ #tiendas-container no existe");
        return;
    }

    container.innerHTML = "<p class='loading'>Cargando ferreterías...</p>";

    try {
        const resp = await fetch("/api/tiendas");
        if (!resp.ok) throw new Error("Error al consumir API");

        const tiendas = await resp.json();
        container.innerHTML = "";

        tiendas.forEach(tienda => {
            const card = document.createElement("article");
            card.className = "tienda-card";

            card.innerHTML = `
                <h2>${tienda.nombre} / <span>${tienda.direccion}<span></h2>
                <p><strong>Tienda Abierta:</strong> ${tienda.horario} / <span>Teléfono<span>${tienda.telefono}</p>
                <ul>
                    ${tienda.servicios.map(s => `<li>${s}</li>`).join("")}
                </ul>
                <button>Ir al Mapa</button>
            `;

            container.appendChild(card);
        });

        console.log("✅ Tiendas renderizadas");

    } catch (error) {
        console.error("❌ Error:", error);
        container.innerHTML = "<p class='error'>Error cargando ferreterías</p>";
    }
}

window.cargarTiendas = cargarTiendas;
