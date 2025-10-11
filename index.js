const express = require('express');
const path = require('path');
const app = express();

// Cargar el JSON
const productos = require(path.join(__dirname, 'data', 'productos.json'));

// Servir la carpeta 'public' (para acceder a las imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint que devuelve el JSON completo
app.get('/productos', (req, res) => {
  res.json(productos);
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
