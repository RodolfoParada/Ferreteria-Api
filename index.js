const express = require('express');
const cors = require('cors');
const path = require('path');

const productosRoutes = require('./src/router/productosRutes.js');
const tiendasRoutes = require('./src/router/tiendasRutes.js');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/views', express.static(path.join(__dirname, 'src/view')));
app.use('/data', express.static(path.join(__dirname, 'src/data')));
app.use('/componentes', express.static(path.join(__dirname, 'public/componentes')));

// API
// app.use('/api/productos', productosRoutes);

// ===============================
// RUTAS SPA
// ===============================


app.use('/api/productos', productosRoutes);
app.use('/api/tiendas', tiendasRoutes);

// Ruta explícita para /inicio
app.get('/inicio', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/view/index.html'));
});

// SPA pages
app.get('/sobre-nosotros', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/view/index.html'));
});

app.get('/productos', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/view/index.html'));
});

app.get('/busca-tienda', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/view/index.html'));
});

// Cualquier otra ruta → SPA
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/view/index.html'));
});

// 404 Controlado (opcional)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'src/view/index.html'));
});

app.get("/api/tiendas", (req, res) => {
    res.sendFile(__dirname + "/data/ferreterias.json");
});

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
