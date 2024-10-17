var express = require('express');
var router = express.Router();

// Importar controladores
var productController = require('../controllers/productController')

// Rutas
router.get('/index', productController.index);
router.get('/cart', productController.cart);
router.get('/create', productController.create);
router.get('/edit', productController.edit);
// router.get('/:id', productController.detail);

module.exports = router;
