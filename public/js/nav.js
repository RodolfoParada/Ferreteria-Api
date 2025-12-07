async function Footer() {
    const resp = await fetch('/public/componentes/nav.html');
    const html = await resp.text();
    document.getElementById('nav').innerHTML = html;
}

Footer();