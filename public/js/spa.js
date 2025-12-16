async function cargarVista(vista, replaceState = false) {
    const main = document.getElementById("vista");
    if (!main) return;

    main.innerHTML = "Cargando...";

    let archivo = "";

    // 🔴 NUNCA cargar index.html en una SPA
    if (vista === "inicio") archivo = "inicio.html";
    else archivo = `${vista}.html`;

    try {
        const resp = await fetch(`/views/${archivo}`);

        if (!resp.ok) {
            main.innerHTML = `<p>Error: no se encontró ${archivo}</p>`;
            return;
        }

        const html = await resp.text();
        main.innerHTML = html;

        // ✅ Inicializar JS específico por vista
        if (vista === "inicio" && window.initializeCarousel) {
            initializeCarousel();
        }

        if (vista === "productos") {
            const script = document.createElement("script");
            script.src = "/js/productosService.js";
            script.defer = true;
            document.body.appendChild(script);
        }

        // --- Actualizar URL ---
        let url = "/" + vista;
        if (vista === "inicio") url = "/inicio";

        if (replaceState) {
            history.replaceState({ vista }, "", url);
        } else {
            history.pushState({ vista }, "", url);
        }

    } catch (error) {
        main.innerHTML = "<p>Error al cargar la vista</p>";
        console.error(error);
    }
}

// ---------------------------
// Navegación SPA
// ---------------------------
document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-view]");
    if (!link) return;

    e.preventDefault();
    cargarVista(link.dataset.view);
});

// ---------------------------
// Botón atrás / adelante
// ---------------------------
window.addEventListener("popstate", () => {
    let vista = location.pathname.replace("/", "") || "inicio";
    cargarVista(vista, true);
});

// ---------------------------
// Carga inicial
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
    let vista = location.pathname.replace("/", "") || "inicio";
    cargarVista(vista, true);
});