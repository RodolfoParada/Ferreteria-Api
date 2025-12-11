async function cargarVista(vista, replaceState = false) {
    const main = document.getElementById("vista");
    if (!main) return;

    main.innerHTML = "Cargando...";

    let archivo = "";

    // --- MAPEO CORRECTO ---
    if (vista === "inicio") archivo = "index.html";
    else archivo = `${vista}.html`; // productos.html, sobre-nosotros.html, etc.

    const resp = await fetch(`/views/${archivo}`);

    if (!resp.ok) {
        main.innerHTML = `<p>Error: no se encontró ${archivo}</p>`;
        return;
    }

    const html = await resp.text();
    main.innerHTML = html;

    // --- Actualiza la URL ---
    let url = "/" + vista;
    if (vista === "inicio") url = "/inicio";

    if (replaceState) history.replaceState({ vista }, "", url);
    else history.pushState({ vista }, "", url);

    // --- Cargar script de productos SI corresponde ---
    if (vista === "productos") {
        const script = document.createElement("script");
        script.src = "/js/productosService.js";
        document.body.appendChild(script);
    }
}

// Links SPA
document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-view]");
    if (!link) return;
    e.preventDefault();
    cargarVista(link.dataset.view);
});

// Botón atrás
window.addEventListener("popstate", () => {
    let vista = location.pathname.replace("/", "") || "inicio";
    cargarVista(vista, true);
});

// Carga inicial
document.addEventListener("DOMContentLoaded", () => {
    let vista = location.pathname.replace("/", "") || "inicio";
    cargarVista(vista, true);
});
