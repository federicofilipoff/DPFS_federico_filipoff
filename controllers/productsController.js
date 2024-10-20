const fs = require('fs');
const path = require('path');

// IMPORTAR DATOS
const productList = require('../data/products.json');

// CREAR OBJETO CON LOS CONTROLADORES
let productController = {
    index: function(req, res) {
        return res.render('products/productList', { products: productList })
    },
    create: function(req, res) {
        return res.render('products/productCreate')
    },
    detail: function(req, res) {

        // Obtener el ID de la consulta y convertir a Int (entero)
        const productId = parseInt(req.params.id);

        // Buscar el ID en la lista de productos "productList"
        const product = productList.find(p => p.id === productId);
        if (product) {
            return res.render('products/productDetail', { product });
        } else {
            return res.status(404).send('Producto no encontrado');
        }
    },
    store: function (req, res) {

        // Manejar los datos del formulario, incluyendo el archivo de imagen           
        const { name, description, category, colors, officialWeb, price } = req.body;
        let newProduct = {
            id: productList.length > 0 ? Math.max(...productList.map(p => p.id)) + 1 : 1,
            name: name,
            description: description,
            image: req.file ? req.file.filename : null,
            category: category,
            colors: Array.isArray(colors) ? colors : [colors],
            officialWeb: officialWeb,
            price: parseFloat(price) || 0.00
        };

        // Guardar el nuevo producto en el archivo JSON
        let productsFilePath = path.join(__dirname, '../data/products.json');
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        products.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

        return res.redirect(`/products/create`);
    },
    edit: function (req, res) {
        const productId = parseInt(req.params.id);
        const product = productList.find(p => p.id === productId);
    
        if (product) {
            return res.render('products/productEdit', { product });
        } else {
            return res.status(404).send('Producto no encontrado');
        }
    },
    update: function (req, res) {
        const productId = parseInt(req.params.id);
        const productIndex = productList.findIndex(p => p.id === productId);
    
        if (productIndex === -1) {
            return res.status(404).send('Producto no encontrado');
        }
    
        // Procesar la nueva imagen si se sube una
        let updatedImage = req.file ? req.file.filename : productList[productIndex].image;
    
        // Actualizar el producto con los datos del formulario
        productList[productIndex] = {
            ...productList[productIndex], // Mantener los datos anteriores
            name: req.body.name || productList[productIndex].name,
            description: req.body.description || productList[productIndex].description,
            image: updatedImage,  // Asignar la nueva imagen si se subió una
            category: req.body.category || productList[productIndex].category,
            colors: Array.isArray(req.body.colors) ? req.body.colors : [req.body.colors],
            officialWeb: req.body.officialWeb || productList[productIndex].officialWeb,
            price: parseFloat(req.body.price) || productList[productIndex].price
        };
    
        // Guardar los cambios en el archivo JSON
        fs.writeFileSync(
            path.join(__dirname, '../data/products.json'), 
            JSON.stringify(productList, null, 2)
        );
    
        // Redirigir a la página de detalles del producto actualizado
        return res.redirect(`/products/${productId}`);
    },
    delete: function(req, res) {

        const productId = parseInt(req.params.id);
        const productIndex = productList.findIndex(p => p.id === productId);

        if (productIndex === -1) {
            return res.status(404).send('Producto no encontrado');
        }

        // Eliminar el producto de la lista
        productList.splice(productIndex, 1);

        // Guardar los cambios en el archivo JSON
        fs.writeFileSync(
            path.join(__dirname, '../data/products.json'), 
            JSON.stringify(productList, null, 2)
        );

        // Redirigir a la lista de productos
        return res.redirect('/products');
    },
    cart: function(req, res) {
        return res.render('products/productCart')
    }
};

module.exports = productController;
