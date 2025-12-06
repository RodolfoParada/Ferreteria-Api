async function Footer() {
    const resp = await fetch('/public/componentes/footer.html');
    const html = await resp.text();
    document.getElementById('footer').innerHTML = html;
}

Footer();