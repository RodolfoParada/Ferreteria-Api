// ===============================
// ESTADO GLOBAL (memoria)
// ===============================

let tiendasGlobales = [];

// ===============================
// CREAR FILTRO
// ===============================

function crearFiltroTiendas(tiendas) {
  const filtro = document.getElementById("filtro-tiendas");
  if (!filtro) return;

  const direcciones = [...new Set(tiendas.map(t => t.direccion))];

  filtro.innerHTML = `
    <select id="select-direccion">
      <option value="todas">Todas las direcciones</option>
      ${direcciones.map(d => `<option value="${d}">${d}</option>`).join("")}
    </select>
  `;

  document
    .getElementById("select-direccion")
    .addEventListener("change", e => {
      filtrarTiendas(e.target.value);
    });
}

// ===============================
// RENDER TIENDAS
// ===============================

function renderTiendas(tiendas) {
  const container = document.getElementById("tiendas-container");
  if (!container) return;

  container.innerHTML = "";

  tiendas.forEach(tienda => {
    const card = document.createElement("article");
    card.className = "tienda-card";

    card.innerHTML = `
      <h2>${tienda.nombre} / <span>${tienda.direccion}</span></h2>
      <p>
        <strong>Tienda Abierta:</strong> ${tienda.horario} /
        <span>Teléfono</span> ${tienda.telefono}
      </p>
      <ul>
        ${tienda.servicios.map(s => `<li>${s}</li>`).join("")}
      </ul>
      <button>Ir al Mapa</button>
    `;

    container.appendChild(card);
  });
}

// ===============================
// FILTRAR SIN RECARGAR
// ===============================

function filtrarTiendas(direccion) {
  if (direccion === "todas") {
    renderTiendas(tiendasGlobales);
    return;
  }

  const filtradas = tiendasGlobales.filter(
    t => t.direccion === direccion
  );

  renderTiendas(filtradas);
}

// ===============================
// CARGA INICIAL (UNA SOLA VEZ)
// ===============================

async function cargarTiendas() {
  const container = document.getElementById("tiendas-container");
  if (!container) return;

  container.innerHTML = "<p>Cargando ferreterías...</p>";

  try {
    const resp = await fetch("/api/tiendas");
    if (!resp.ok) throw new Error("Error al consumir API");

    tiendasGlobales = await resp.json();

    crearFiltroTiendas(tiendasGlobales);
    renderTiendas(tiendasGlobales);

    console.log("✅ Tiendas cargadas y filtro listo");

  } catch (error) {
    console.error("❌ Error:", error);
    container.innerHTML = "<p>Error cargando ferreterías</p>";
  }
}

window.cargarTiendas = cargarTiendas;
