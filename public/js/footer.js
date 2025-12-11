async function cargarFooter() {
  try {
    const resp = await fetch('/componentes/footer.html');
    if (!resp.ok) throw new Error('Footer no encontrado: ' + resp.status);
    const html = await resp.text();
    document.getElementById('footer').innerHTML = html;
  } catch (err) {
    console.error('Error cargando footer:', err);
  } finally {
    if (typeof verificarCarga === 'function') verificarCarga();
  }
}

cargarFooter();
