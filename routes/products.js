var express = require('express');
var router = express.Router();

// Importar controladores
var productController = require('../controllers/productController')

// Importar middlewares
const upload = require('../middlewares/upload')

// Rutas
router.get('/', productController.index);
router.post('/', upload.single('image'), productController.store);
router.get('/create', productController.create);
router.get('/cart', productController.cart);
router.get('/:id/edit', productController.edit);
router.put('/:id', upload.single('image'), productController.update);
router.get('/:id', productController.detail);
router.delete('/:id', productController.delete);

module.exports = router;
