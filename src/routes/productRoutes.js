const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const productController = require(path.join(__dirname, '..', 'controllers', 'productController'));
const productValidator = require(path.join(__dirname, '..', 'validators', 'productValidator'));

// ----------------------------------------------------------------------------
// Configuración de Multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', '..', 'public', 'images', 'users'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });
upload.single('image');

// ----------------------------------------------------------------------------
// RUTA DE PRODUCTOS
// Respetar orden de rutas: rutas específicas vs rutas dinámicas
router.get('/create', productController.formularioCrearProducto);
router.post('/', upload.single('image'), productValidator, productController.crearProducto);
router.get('/', productController.visualizarProductos);
router.get('/:id', productController.visualizarProducto);
router.put('/:id', productController.editarProducto);
router.delete('/:id', productController.eliminarProducto);
router.get('/:id/edit', productController.formularioEditarProducto);

// Falta rutas para ver Detalle del producto y el carrito
// Además podría incluir Multer en el fichero de middlewares para no duplicar código,
//  ya que el mismo está incluido en userRouters.js también.

// ----------------------------------------------------------------------------
// Exportar rutas
module.exports = router;
