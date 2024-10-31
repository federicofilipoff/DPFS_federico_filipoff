// Importar "db" contiene todos los modelos
const db = require('../database/models')

// CREAR OBJETO CON LOS CONTROLADORES
let productController = {
    // ------------------------------------------------------------------------
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
        return res.render('products/productCreate')
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

        // Obtener  datos del formulario
        const { name, brand, description, category, colors, officialWeb, size, price } = req.body;

        // Verificar que el producto no exista
        db.Product.findOne({ where: { name: name } })
        .then(function(data) {
            if (data) { 
                // Si el usuario ya existe
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
            // Una vez creado el producto, insertar los colores en product_colors
            const colorPromises = colors.map(colorId => {
                return db.ProductColor.create({
                    product_id: productoCreado.id, // ID del producto recién creado
                    color_id: parseInt(colorId) // ID del color
                });
            });
    
            // Esperar a que se inserten todos los colores
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
        // Obtener el ID del producto desde los parámetros de la URL
        const productId = req.params.id;
    
        // Buscar el producto por ID
        db.Product.findByPk(productId, { 
            include: [{ model: db.Brand }, { model: db.Category }, { model: db.Color }] 
        })
        .then(function(product) {
            console.log(product)
            // Verificar si se encontró el producto
            if (!product) {
                return res.status(404).send('Producto no encontrado');
            }

            // Renderizar la vista de edición del producto
            return res.render('products/productEdit', { product });
        })
        .catch(function(e) {
            console.log(e);
            return res.status(500).send('Error al obtener el producto');
        });
    },

    // ------------------------------------------------------------------------
    update: function(req, res) {
        const productId = req.params.id;
    
        // Obtener los datos del formulario
        const { name, description, price, category, brand, colors, size, officialWeb } = req.body;
    
        const actualProducto = {
            name,
            description,
            category_id: parseInt(category),
            brand_id: parseInt(brand),
            colors,
            size,
            price: parseFloat(price) || 0.00,
            officialWeb
        };
    
        // Verificar si se subió una nueva imagen del producto
        if (req.file) {
            actualProducto.image = req.file.filename;
        }

        db.Product.findOne({ where: { name: name, id: { [db.Sequelize.Op.ne]: productId } } })
            .then(product => {
                if (product) {
                    throw new Error('Error: El nombre del producto ya está en uso.');
                }
                // Actualizar el producto con los nuevos datos
                return db.Product.update(actualProducto, { where: { id: productId } });
            })
            .then(() => {
                // Eliminar los colores actuales
                return db.ProductColor.destroy({ where: { product_id: productId } });
            })
            .then(() => {
                // Insertar los nuevos colores
                const colorPromises = colors.map(colorId => {
                    return db.ProductColor.create({
                        product_id: productId, // ID del producto que se está actualizando
                        color_id: parseInt(colorId) // ID del nuevo color
                    });
                });
                return Promise.all(colorPromises);
            })
            .then(() => {
                return res.redirect(`/products/${productId}`);
            })
            .catch(function(e) {
                console.log(e);
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
                    required: false  // Permite productos sin marca asociada
                },
                {
                    model: db.Category, // Asegúrate de que el modelo de Category esté correctamente configurado
                    required: false  // Permite productos sin categoría asociada
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
                        db.Sequelize.fn('LOWER', db.Sequelize.col('Category.name')), // Asegúrate de que 'name' sea el nombre de la columna correcta
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
    }
};

module.exports = productController;
