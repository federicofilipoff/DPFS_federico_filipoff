var express = require('express');
var router = express.Router();

// Importar controladores
var productController = require('../controllers/productsController')

// Importar middlewares
const upload = require('../middlewares/upload')
const isAdmin = require('../middlewares/isAdmin');

// Rutas
router.get('/', productController.index);

// Incoporar middleware para verificar que sea admin.
router.post('/', isAdmin, upload.single('image'), productController.store);
router.get('/create', isAdmin, productController.create);
router.get('/cart', productController.cart);
router.get('/:id/edit', isAdmin, productController.edit);
router.put('/:id', isAdmin, upload.single('image'), productController.update);
router.get('/:id', productController.detail);
router.delete('/:id', isAdmin, productController.delete);

module.exports = router;
