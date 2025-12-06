const express = require('express');
const router = express.Router();
const productosController  = require('../controller/productosController.js')

router.get('/', productosController.getProductos);
router.get('/:id', productosController.getProductosById);
// router.post('/', productosController.postProductos);
// router.put('/:id', productosController.putProductos);
// router.delete('/:id', productosController.deleteProductos);

module.exports = router; 