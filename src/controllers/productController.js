const path = require('path')
const Product = require(path.join(__dirname, '..', 'models', 'Product'));

// [1] LEER PRODUCTOS
exports.visualizarProductos = async function (req, res) {
    try {
      const productos = await Product.findAll();
      res.json(productos);
    } catch (err) {
      res.status(500).send('Error al leer la base de datos');
    }
};

// [2] LEER PRODUCTO SEGÚN SU ID
exports.visualizarProducto = async function (req, res) {
    try {
        const producto = await Product.findByPk(req.params.id);
        if (!producto) {
        return res.status(404).send('Producto no encontrado');
        }
        res.json(producto);
    } catch (err) {
        res.status(500).send('Error al leer la base de datos');
    }
};

// [3] FORMULARIO PARA CREAR PRODUCTO
exports.formularioCrearProducto = async function (req, res) {
    res.render(path.join(__dirname, '..', 'views', 'products', 'productCreate.ejs'))
};

// [4] CREAR PRODUCTO
exports.crearProducto = async function (req, res) {
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
};


// [5] FORMULARIO EDITAR PRODUCTO
exports.formularioEditarProducto = async function (req, res) {
    try {
        const producto = await Product.findByPk(req.params.id);
        if (!producto) {
            return res.status(404).send('Producto no encontrado');
        }
        res.render('../views/products/productEdit.ejs', { producto });
        } catch (err) {
        res.status(500).send('Error al leer la base de datos');
    }
};

// [6] EDITAR PRODUCTO
exports.editarProducto = async function (req, res) {
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
};

// [7] RUTA: ELIMINAR PRODUCTO
exports.eliminarProducto = async function (req, res) {
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
};