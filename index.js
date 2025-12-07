const express = require('express');
const cors = require('cors');
const path = require('path');
const productosRoutes = require('./src/router/productosRutes.js');

const app = express();
const port = 3000; 

// Para leer JSON
app.use(express.json())

// Habilitar CORS
app.use(cors());

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API
app.use('/api/productos', productosRoutes);


// Ruta para la vista principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/view/index.html'));
});

// Ruta para otra vista
app.get('/productos', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/view/productos.html'));
});


// iniciar el servidor
app.listen(port, ()=>{
    console.log("Servidor iniciado en http://localhost:" + port);
})