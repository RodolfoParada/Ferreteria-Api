const express = require('express');
const router = express.Router();

// 1. 📦 Importar el controlador de tiendas
// La ruta es: desde router/ vamos a ../controllers/tiendasController
const tiendasController = require('../controller/tiendaController'); 

// 2. 🗺️ Definir la ruta GET
// Cuando el servidor recibe GET /api/productos, ejecuta el método getTiendas
router.get('/', tiendasController.getTiendas);

// Aquí podrías añadir otras rutas en el futuro:
// router.get('/:id', tiendasController.getTiendaById);

module.exports = router;