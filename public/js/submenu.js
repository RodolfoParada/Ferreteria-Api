async function cargarSubmenu() {
    const contenedor = document.getElementById("contenedor-submenu");
    if (!contenedor) return;

    // Cargar HTML
    const resp = await fetch("/componentes/submenu.html");
    contenedor.innerHTML = await resp.text();

    // Inicializar eventos del submenu
    inicializarSubmenu();
}

function inicializarSubmenu() {
    const submenu = document.querySelector(".submenu-categorias");
    if (!submenu) return;

    submenu.addEventListener("click", (e) => {
        const btn = e.target.closest(".btn-filtro");
        if (!btn) return;

        // UI activa
        document.querySelectorAll(".btn-filtro")
            .forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // 🔹 cambiar filtro
        window.categoriaSeleccionada = btn.dataset.categoria;

        // 🔹 recargar productos SIN romper nada
        if (typeof cargarProductos === "function") {
            cargarProductos();
        }
    });
}
