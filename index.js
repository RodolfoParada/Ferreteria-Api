const express = require('express');
const app = express();
const productos = require('./data/productos.json');

// Servir carpeta pública
app.use(express.static('public'));

// Endpoint para obtener productos
app.get('/productos', (req, res) => {
  res.json(productos);
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
