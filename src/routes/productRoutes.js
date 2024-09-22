const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Registrar producto
router.get('/register', (req, res) => {
    res.render('../views/products/productCreate.ejs')
})

router.post('/register', async (req, res) => {

    try {
        const product = await Product.create(req.body);
        res.json(product);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al guardar el producto' });
    }
});

const articulos = [
    {id:0, nombre: "teclado A", precio: 100},
    {id:1, nombre: "teclado B", precio: 200},
    {id:2, nombre: "teclado C", precio: 300},
    {id:3, nombre: "teclado D", precio: 400},
    {id:4, nombre: "teclado E", precio: 500},
]

router.get('/id/:id', (req, res) => {
    const art = articulos.find(a => a.id === parseInt(req.params.id));
    if (!art) return res.status(404).send("Artículo no encontrado")
    else res.send(art)
})

router.get('/nombre/:nombre', (req, res) => {
    const art = articulos.find(a => a.nombre === req.params.nombre);
    if (!art) return res.status(404).send("Artículo no encontrado")
    else res.send(art)
})

// router.get('/edit', (req, res) => {
    //     res.render('../views/products/productEdit.ejs')
    // })
    
// Mostrar producto existente
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ error: 'Producto no encontrado' })
        else res.send(product)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});


// Editar/Actualizar un producto existente
// router.put('/:id', async (req, res) => {
//     try {
//         const product = await Product.findByPk(req.params.id);
//         if (!product) {
//             return res.status(404).json({ error: 'Producto no encontrado' });
//         }
//         await product.update(req.body);
//         res.json(product);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Error al actualizar el producto' });
//     }
// });


// router.post('/edit', async (req, res) => {

//     try {
//         const product = await Product.create(req.body);
//         res.json(product);

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Error al guardar el usuario' });
//     }
// });


router.get('/detail', (req, res) => {
    res.render('../views/products/productDetail.ejs')
})


// router.get('/carrito', (req, res) => {
//     res.render('products/productCart')
// })

module.exports = router;
