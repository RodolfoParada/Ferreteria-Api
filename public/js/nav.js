async function cargarNav() {
  try {
    const resp = await fetch('/componentes/nav.html');
    if (!resp.ok) throw new Error('Nav no encontrado: ' + resp.status);
    const html = await resp.text();
    document.getElementById('nav').innerHTML = html;
  } catch (err) {
    console.error('Error cargando nav:', err);
  } finally {
    // notifica que nav ya fue cargado (aunque haya error)
    if (typeof verificarCarga === 'function') verificarCarga();
  }
}

cargarNav();