// Por si solas las validaciones (/validators/) no se muestran al usuario,
// se deben asociar a la ruta como middleware y enviar por controlador.
const { validationResult } = require('express-validator');
const db = require('../database/models') // "db" contiene todos los modelos

// CREAR OBJETO CON LOS CONTROLADORES
let productController = {

    index: function(req, res) {
        db.Product.findAll({
            // Combinar tablas para obtener nombre de marca y categoría, sino renderizo el ID.
            include: [
                {
                    model: db.Brand,
                    attributes: ['name'],
                },
                {
                    model: db.Category,
                    attributes: ['name'],
                }
            ],
        })
        .then(function(data) {
                return res.render('products/productList', { data });
            })
        .catch(function(e) {
                console.log(e);
                return res.status(500).send('Error al obtener los productos');
        });
    },
    // ------------------------------------------------------------------------
    create: function(req, res) {
        // Hacer consultas en paralelo
        Promise.all([
            db.Brand.findAll(),
            db.Category.findAll(),
            db.Color.findAll()
        ])
        .then(([brands, categories, colors]) => {
            // Renderizar la vista
            return res.render('products/productCreate', { brands, categories, colors });
        })
        .catch(error => {
            return res.status(500).send(error);
        });
    },      
    // ------------------------------------------------------------------------
    show: function(req, res) {

        // Obtener el ID de la consulta y convertir a Int (entero)
        const productId = parseInt(req.params.id);

        db.Product.findByPk(productId, {
            include: [
                {
                    model: db.Brand,
                    attributes: ['name']
                },
                {
                    model: db.Category,
                    attributes: ['name']
                },
                {
                    model: db.Color,
                    attributes: ['name']
                }
            ]
        })
        .then(function(data){
            return res.render('products/productDetail', { data });
            })
        .catch(function(e) {
                console.log(e);
                return res.status(500).send('Error al obtener los productos');
        });

    },
    // ------------------------------------------------------------------------
    store: function (req, res) {

        // Crear contenedor de errores (validaciones)
        const result = validationResult(req);

        // Obtener  datos del formulario
        const { name, brand, description, category, colors, officialWeb, size, price } = req.body;

        // Convertir color en arreglo si se elige uno solo o ninguno
        const colorsArray = Array.isArray(colors) ? colors : (colors ? colors.split(',') : []);

        // Si hay errores envia una respuesta con los errores.
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        // Verificar que el producto no exista
        db.Product.findOne({ where: { name: name } })
        .then(function(data) {
            if (data) {
                // Si el nombre del producto ya existe
                return res.status(400).send('Error: El producto ya fue registrado.');
            } else {
                // Crear un nuevo producto con los datos proporcionados
                const nuevoProducto = {
                    name,
                    description,
                    officialWeb,
                    size,
                    brand_id: parseInt(brand),
                    category_id: parseInt(category),
                    image: req.file ? req.file.filename : null,
                    price: parseFloat(price) || 0.00
                };

                return db.Product.create(nuevoProducto)
            }
        })
        .then((productoCreado) => {
            // Insertar colores asociados al producto
            const colorPromises = colorsArray.map(colorId => {
                return db.ProductColor.create({
                    product_id: productoCreado.id,
                    color_id: parseInt(colorId)
                });
            });

            return Promise.all(colorPromises);
        })
        .then(() => {
            return res.redirect(`/products/create`)
        })
        .catch(function(e) {
            console.log(e);
            return res.status(500).send('Error: producto no creado');
        });
    },

    // ------------------------------------------------------------------------
    edit: function(req, res) {
        const productId = req.params.id;
    
        Promise.all([
            db.Product.findByPk(productId, { 
                include: [{ model: db.Brand }, { model: db.Category }, { model: db.Color }] 
            }),
            db.Brand.findAll(),
            db.Category.findAll(),
            db.Color.findAll()
        ])
        .then(([product, brands, categories, colors]) => {
            // Verificar si se encontró el producto
            if (!product) {
                return res.status(404).send('Producto no encontrado');
            }

            // Renderizar la vista
            return res.render('products/productEdit', { product, brands, categories, colors });
        })
        .catch(error => {
            return res.status(500).send(error);
        });
    },
    // ------------------------------------------------------------------------
    update: function(req, res) {
        const productId = req.params.id;
    
        // Crear contenedor de errores (validaciones)
        const result = validationResult(req);
        
        // Si hay errores, enviar una respuesta con los errores.
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
    
        // Obtener los datos del formulario
        const { name, description, price, category, brand, colors, size, officialWeb } = req.body;
    
        // Convertir color en arreglo si se elige uno solo o ninguno
        const colorsArray = Array.isArray(colors) ? colors : (colors ? colors.split(',') : []);
    
        const actualProducto = {
            name,
            description,
            category_id: parseInt(category),
            brand_id: parseInt(brand),
            size,
            price: parseFloat(price) || 0.00,
            officialWeb
        };
    
        // Verificar si se subió una nueva imagen del producto
        if (req.file) {
            actualProducto.image = req.file.filename;
        }
    
        // Comprobar si el nombre del producto ya está en uso
        db.Product.findOne({ where: { name: name, id: { [db.Sequelize.Op.ne]: productId } } })
            .then(product => {
                if (product) {
                    throw new Error('Error: El nombre del producto ya está en uso.');
                }
                // Actualizar el producto con los nuevos datos
                return db.Product.update(actualProducto, { where: { id: productId } });
            })
            .then(([updatedRows]) => {
                if (updatedRows === 0) {
                    throw new Error('No se actualizó el producto. Asegúrate de que el ID es correcto.');
                }
    
                // Eliminar los colores actuales
                return db.ProductColor.destroy({ where: { product_id: productId } });
            })
            .then(() => {
                // Insertar colores asociados al producto
                const colorPromises = colorsArray.map(colorId => {
                    return db.ProductColor.create({
                        product_id: productId,
                        color_id: parseInt(colorId)
                    });
                });
    
                return Promise.all(colorPromises);
            })
            .then(() => {
                return res.redirect(`/products/${productId}`);
            })
            .catch(function(e) {
                console.error("Error en el controlador de actualización de producto:", e.message);
                return res.status(500).send('Error al actualizar el producto');
            });
    },      
    // ------------------------------------------------------------------------
    delete: function(req, res) {

        // Obtener ID del producto desde la URL
        const productId = req.params.id;

        db.Product.destroy({ where: { id: productId } })
        .then(function(deletedCount) {
            // Si se elimina el registro
            if (deletedCount === 1) {
                return res.redirect('/products');
            }
            // Si no se elimina el registro
            else {
                return res.status(404).send('Producto no encontrado');
            }
        })
        .catch(function(e) {
            console.log(e);
            return res.status(500).send('Error al eliminar el producto');
        });
    },
    // ------------------------------------------------------------------------
    search: function (req, res) {
        const searchQuery = req.query.search?.toLowerCase() || "";
    
        db.Product.findAll({
            include: [
                {
                    model: db.Brand,
                    required: false
                },
                {
                    model: db.Category,
                    required: false 
                }
            ],
            where: {
                [db.Sequelize.Op.or]: [
                    db.Sequelize.where(
                        db.Sequelize.fn('LOWER', db.Sequelize.col('Product.name')),
                        'LIKE',
                        `%${searchQuery}%`
                    ),
                    db.Sequelize.where(
                        db.Sequelize.fn('LOWER', db.Sequelize.col('Brand.name')),
                        'LIKE',
                        `%${searchQuery}%`
                    ),
                    db.Sequelize.where(
                        db.Sequelize.fn('LOWER', db.Sequelize.col('Category.name')),
                        'LIKE',
                        `%${searchQuery}%`
                    )
                ]
            }
        })
        .then(products => {
            res.render('products/productSearch', { products, searchQuery });
        })
        .catch(error => {
            console.log("Error en la búsqueda:", error);
            res.status(500).send('Error en la búsqueda');
        });
    },
    // ------------------------------------------------------------------------
    cart: function(req, res) {
        return res.render('products/productCart')
    },


    // ------------------------------------------------------------------------
    addToCart: function(req, res) {
        const productId = parseInt(req.body.productId); // ID del producto a agregar
        const quantity = parseInt(req.body.quantity) || 1; // Cantidad del producto (por defecto 1)
        const userId = req.session.user.id; // Obtener el ID del usuario desde la sesión

        // Verificar si el carrito ya existe para el usuario
        db.ShoppingCart.findOne({
            where: {
                user_id: userId,
                // Puedes agregar un estado de carrito si es necesario (activo, pendiente, etc.)
            },
            include: [
                {
                    model: db.CartItem, // Incluimos CartItem para ver los productos en el carrito
                    where: {
                        product_id: productId // Comprobamos si el producto ya está en el carrito
                    },
                    required: false
                }
            ]
        })
        .then(cart => {
            if (cart) {
                // Si el carrito ya existe
                const cartItem = cart.CartItems[0]; // Obtener el CartItem asociado al producto

                if (cartItem) {
                    // Si el producto ya está en el carrito, actualizamos la cantidad
                    return cartItem.update({ quantity: cartItem.quantity + quantity })
                        .then(() => {
                            // Recalcular el total del carrito
                            return cart.updateTotal();
                        })
                        .then(() => {
                            return res.redirect('/cart'); // Redirigir a la página del carrito
                        });
                } else {
                    // Si el producto no está en el carrito, agregamos un nuevo CartItem
                    return db.CartItem.create({
                        cart_id: cart.id,
                        product_id: productId,
                        quantity: quantity
                    })
                    .then(() => {
                        // Recalcular el total del carrito
                        return cart.updateTotal();
                    })
                    .then(() => {
                        return res.redirect('/cart'); // Redirigir a la página del carrito
                    });
                }
            } else {
                // Si el carrito no existe, creamos uno nuevo
                return db.ShoppingCart.create({
                    user_id: userId,
                    total: 0 // Inicializamos el total a 0
                })
                .then(newCart => {
                    // Agregar el producto al nuevo carrito
                    return db.CartItem.create({
                        cart_id: newCart.id,
                        product_id: productId,
                        quantity: quantity
                    })
                    .then(() => {
                        // Recalcular el total del carrito
                        return newCart.updateTotal();
                    })
                    .then(() => {
                        return res.redirect('/cart'); // Redirigir a la página del carrito
                    });
                });
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send('Error al agregar producto al carrito');
        });
    },




    // ------------------------------------------------------------------------
    showCart: function(req, res) {
        const userId = req.session.user.id; // Obtener el ID del usuario desde la sesión
    
        // Buscar el carrito del usuario, incluyendo los productos
        db.ShoppingCart.findOne({
            where: {
                user_id: userId
            },
            include: [
                {
                    model: db.CartItem,
                    include: [
                        { 
                            model: db.Product, 
                            attributes: ['name', 'price', 'image', 'Category.name'] // Asegúrate de incluir los atributos del producto
                        }
                    ]
                }
            ]
        })
        .then(cart => {
            if (!cart) {
                return res.render('cart', { cart: [], message: 'Tu carrito está vacío.' });
            }
            
            // Pasar los productos asociados al carrito (CartItems)
            const cartItems = cart.CartItems.map(item => {
                return {
                    ...item.toJSON(),
                    product: item.Product // Relacionar el producto con cada CartItem
                };
            });
    
            return res.render('cart', { cart: cartItems, message: 'Aquí están los productos en tu carrito.' });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send('Error al obtener el carrito');
        });
    }

};

module.exports = productController;
