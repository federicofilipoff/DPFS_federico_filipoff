const express = require('express');
const path = require('path');
const router = express.Router();

// ----------------------------------------------------------------------------
// IMPORTAR MODELO
const Product = require(path.join(__dirname, '..', 'models', 'Product'));

// ----------------------------------------------------------------------------
// IMPORTAR MULTER Y CONFIGURAR DESTINO
const multer = require('multer');

// Configuración de Multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', '..', 'public', 'images', 'products'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Usar Multer
upload.single('image');

// ----------------------------------------------------------------------------
// [1] RUTA: LEER PRODUCTOS
router.get('/', async (req, res) => {
  try {
    const productos = await Product.findAll();
    res.json(productos);
  } catch (err) {
    res.status(500).send('Error al leer la base de datos');
  }
});

// [2] RUTA: FORMULARIO PARA CREAR PRODUCTO
router.get('/create', (req, res) => {
  res.render(path.join(__dirname, '..', 'views', 'products', 'productCreate.ejs'))
})

// [3] RUTA: LEER PRODUCTO SEGÚN SU ID
router.get('/:id', async (req, res) => {
  try {
    const producto = await Product.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).send('Producto no encontrado');
    }
    res.json(producto);
  } catch (err) {
    res.status(500).send('Error al leer la base de datos');
  }
});

// [4] RUTA: CREAR PRODUCTO
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { productName, productDescription, category, colors, size, productPrice } = req.body;
    const image = req.file ? req.file.filename : null;

    // Crear un nuevo producto
    const nuevoProducto = await Product.create({
      productName,
      productDescription,
      image,
      category,
      colors,
      size,
      productPrice
    });

    res.status(201).json(nuevoProducto);
  } catch (err) {
    console.error('Error al crear el producto:', err);
    res.status(500).send('Error al crear el producto');
  }
});

// [5] RUTA: FORMULARIO EDITAR PRODUCTO
router.get('/:id/edit', async (req, res) => {
  try {
      const producto = await Product.findByPk(req.params.id);
      if (!producto) {
          return res.status(404).send('Producto no encontrado');
      }
      res.render('../views/products/productEdit.ejs', { producto });
      } catch (err) {
      res.status(500).send('Error al leer la base de datos');
  }
});

// [6] RUTA: EDITAR PRODUCTO
router.put('/:id', async (req, res) => {
  try {
    const producto = await Product.findByPk(req.params.id);
    if (!producto) {
        return res.status(404).send('Producto no encontrado');
    }
    const { productName, productDescription, image, category, colors, size, productPrice } = req.body;
    await producto.update({ productName, productDescription, image, category, colors, size, productPrice });
    res.json(producto);
  } catch (err) {
      res.status(500).send('Error al actualizar el producto');
  }
});

// [7] RUTA: ELIMINAR PRODUCTO
router.delete('/:id', async (req, res) => {
  try {
    const producto = await Product.findByPk(req.params.id);
    if (!producto) {
        return res.status(404).send('Producto no encontrado');
    }
    await producto.destroy();
    res.status(204).send();
  } catch (err) {
      res.status(500).send('Error al eliminar el producto');
  }
});

// Exportar rutas
module.exports = router;
