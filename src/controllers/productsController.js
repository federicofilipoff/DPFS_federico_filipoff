// Por si solas las validaciones (/validators/) no se muestran al usuario,
// se deben asociar a la ruta como middleware y enviar por controlador.
const { validationResult } = require("express-validator");
const { Sequelize } = require("sequelize");
const db = require("../database/models"); // "db" contiene todos los modelos

// CREAR OBJETO CON LOS CONTROLADORES
let productController = {
  productList: function (req, res) {
    db.Product.findAll({
      // Combinar tablas para obtener nombre de marca y categoría, sino renderizo el ID.
      include: [
        {
          model: db.Brand,
          attributes: ["name"],
        },
        {
          model: db.Category,
          attributes: ["name"],
        },
      ],
    })
      .then(function (data) {
        return res.render("products/productList", { data });
      })
      .catch(function (e) {
        console.log(e);
        return res.status(500).send("Error al obtener los productos");
      });
  },
  // ------------------------------------------------------------------------
  index: async function (req, res) {
    try {
      // Obtener todos los productos con sus relaciones
      const products = await db.Product.findAll({
        include: [
          {
            model: db.Brand,
            attributes: ["name"],
          },
          {
            model: db.Category,
            attributes: ["name"],
          },
          {
            model: db.Color,
            attributes: ["name"],
          },
        ],
      });

      // Contar el total de productos
      const count = products.length;

      // Contar los productos por categoría
      const countByCategory = products.reduce((acc, product) => {
        const categoryName = product.Category.name;
        if (!acc[categoryName]) {
          acc[categoryName] = 0;
        }
        acc[categoryName] += 1;
        return acc;
      }, {});

      // Crear un array con la colección de productos
      const productDetails = products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.Category.name,
        brand: product.Brand.name,
        colors: product.Colors.map((color) => color.name),
        detail: `/products/${product.id}`,
      }));

      // Consultas a la tabla Sales
      const [totalUnitsSold, totalSalesAmount, latestSales, topProducts] =
        await Promise.all([
          // Total de productos vendidos en unidades
          db.Sale.sum("quantity"),

          // Suma total de productos vendidos en valor monetario
          db.Sale.sum("total"),

          // Últimos 5 productos vendidos
          db.Sale.findAll({
            include: [{ model: db.Product, attributes: ["name"] }],
            order: [["sale_date", "DESC"]],
            limit: 5,
          }),

          // Top 5 productos más vendidos
          db.Sale.findAll({
            attributes: [
              "product_id",
              [Sequelize.fn("SUM", Sequelize.col("quantity")), "totalSold"],
            ],
            include: [{ model: db.Product, attributes: ["name"] }],
            group: ["product_id", "Product.id"],
            order: [[Sequelize.literal("totalSold"), "DESC"]],
            limit: 5,
          }),
        ]);

      // Formatear los últimos 5 productos vendidos
      const latestSalesDetails = latestSales.map((sale) => ({
        productName: sale.Product
          ? sale.Product.name
          : "Producto no encontrado",
        quantity: sale.quantity,
        total: sale.total,
        saleDate: sale.sale_date,
      }));

      // Formatear los 5 productos más vendidos
      const topProductsDetails = topProducts.map((sale) => ({
        productName: sale.Product
          ? sale.Product.name
          : "Producto no encontrado",
        totalSold: sale.dataValues.totalSold,
      }));

      // Respuesta en formato JSON
      return res.json({
        count: count,
        countByCategory: countByCategory,
        totalUnitsSold: totalUnitsSold || 0,
        totalSalesAmount: totalSalesAmount || 0.0,
        latestSales: latestSalesDetails || 0,
        topProducts: topProductsDetails || 0,
        products: productDetails,
      });
    } catch (error) {
      console.error("Error en el controlador index:", error);
      return res.status(500).send("Error al obtener los productos");
    }
  },
  // ------------------------------------------------------------------------
  create: function (req, res) {
    // Hacer consultas en paralelo
    Promise.all([db.Brand.findAll(), db.Category.findAll(), db.Color.findAll()])
      .then(([brands, categories, colors]) => {
        // Renderizar la vista
        return res.render("products/productCreate", {
          brands,
          categories,
          colors,
        });
      })
      .catch((error) => {
        return res.status(500).send(error);
      });
  },
  // ------------------------------------------------------------------------
  show: function (req, res) {
    // Obtener el ID de la consulta y convertir a Int (entero)
    const productId = parseInt(req.params.id);

    db.Product.findByPk(productId, {
      include: [
        {
          model: db.Brand,
          attributes: ["name"],
        },
        {
          model: db.Category,
          attributes: ["name"],
        },
        {
          model: db.Color,
          attributes: ["name"],
        },
      ],
    })
      .then(function (data) {
        return res.render("products/productDetail", { data });
      })
      .catch(function (e) {
        console.log(e);
        return res.status(500).send("Error al obtener los productos");
      });
  },
  // ------------------------------------------------------------------------
  showApi: function (req, res) {
    // Obtener el ID de la consulta y convertir a Int (entero)
    const productId = parseInt(req.params.id);

    db.Product.findByPk(productId, {
      include: [
        {
          model: db.Brand,
          attributes: ["name"],
        },
        {
          model: db.Category,
          attributes: ["name"],
        },
        {
          model: db.Color,
          attributes: ["name"],
        },
      ],
    })
      .then(function (product) {
        // Verificar si se encuentra el producto
        if (!product) {
          return res.status(404).json({ message: "Producto no encontrado" });
        }

        // Estructura del objeto a devolver
        const productDetail = {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          brand: product.Brand.name,
          category: product.Category.name,
          colors: product.Colors.map((color) => color.name),
          size: product.size,
          imageUrl: `/images/products/${product.image}`,
        };

        // Devolver el objeto en formato JSON
        return res.json(productDetail);
      })
      .catch(function (error) {
        console.log(error);
        return res.status(500).send("Error al obtener el producto");
      });
  },
  // ------------------------------------------------------------------------
  store: function (req, res) {
    // Crear contenedor de errores (validaciones)
    const result = validationResult(req);

    // Obtener  datos del formulario
    const {
      name,
      brand,
      description,
      category,
      colors,
      officialWeb,
      size,
      price,
    } = req.body;

    // Convertir color en arreglo si se elige uno solo o ninguno
    const colorsArray = Array.isArray(colors)
      ? colors
      : colors
      ? colors.split(",")
      : [];

    // Si hay errores envia una respuesta con los errores.
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    // Verificar que el producto no exista
    db.Product.findOne({ where: { name: name } })
      .then(function (data) {
        if (data) {
          // Si el nombre del producto ya existe
          return res.status(400).send("Error: El producto ya fue registrado.");
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
            price: parseFloat(price) || 0.0,
          };

          return db.Product.create(nuevoProducto);
        }
      })
      .then((productoCreado) => {
        // Insertar colores asociados al producto
        const colorPromises = colorsArray.map((colorId) => {
          return db.ProductColor.create({
            product_id: productoCreado.id,
            color_id: parseInt(colorId),
          });
        });

        return Promise.all(colorPromises);
      })
      .then(() => {
        return res.redirect(`/products/create`);
      })
      .catch(function (e) {
        console.log(e);
        return res.status(500).send("Error: producto no creado");
      });
  },

  // ------------------------------------------------------------------------
  edit: function (req, res) {
    const productId = req.params.id;

    Promise.all([
      db.Product.findByPk(productId, {
        include: [
          { model: db.Brand },
          { model: db.Category },
          { model: db.Color },
        ],
      }),
      db.Brand.findAll(),
      db.Category.findAll(),
      db.Color.findAll(),
    ])
      .then(([product, brands, categories, colors]) => {
        // Verificar si se encontró el producto
        if (!product) {
          return res.status(404).send("Producto no encontrado");
        }

        // Renderizar la vista
        return res.render("products/productEdit", {
          product,
          brands,
          categories,
          colors,
        });
      })
      .catch((error) => {
        return res.status(500).send(error);
      });
  },
  // ------------------------------------------------------------------------
  update: function (req, res) {
    const productId = req.params.id;

    // Crear contenedor de errores (validaciones)
    const result = validationResult(req);

    // Si hay errores, enviar una respuesta con los errores.
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    // Obtener los datos del formulario
    const {
      name,
      description,
      price,
      category,
      brand,
      colors,
      size,
      officialWeb,
    } = req.body;

    // Convertir color en arreglo si se elige uno solo o ninguno
    const colorsArray = Array.isArray(colors)
      ? colors
      : colors
      ? colors.split(",")
      : [];

    const actualProducto = {
      name,
      description,
      category_id: parseInt(category),
      brand_id: parseInt(brand),
      size,
      price: parseFloat(price) || 0.0,
      officialWeb,
    };

    // Verificar si se subió una nueva imagen del producto
    if (req.file) {
      actualProducto.image = req.file.filename;
    }

    // Comprobar si el nombre del producto ya está en uso
    db.Product.findOne({
      where: { name: name, id: { [db.Sequelize.Op.ne]: productId } },
    })
      .then((product) => {
        if (product) {
          throw new Error("Error: El nombre del producto ya está en uso.");
        }
        // Actualizar el producto con los nuevos datos
        return db.Product.update(actualProducto, { where: { id: productId } });
      })
      .then(([updatedRows]) => {
        if (updatedRows === 0) {
          throw new Error(
            "No se actualizó el producto. Asegúrate de que el ID es correcto."
          );
        }

        // Eliminar los colores actuales
        return db.ProductColor.destroy({ where: { product_id: productId } });
      })
      .then(() => {
        // Insertar colores asociados al producto
        const colorPromises = colorsArray.map((colorId) => {
          return db.ProductColor.create({
            product_id: productId,
            color_id: parseInt(colorId),
          });
        });

        return Promise.all(colorPromises);
      })
      .then(() => {
        return res.redirect(`/products/${productId}`);
      })
      .catch(function (e) {
        console.error(
          "Error en el controlador de actualización de producto:",
          e.message
        );
        return res.status(500).send("Error al actualizar el producto");
      });
  },
  // ------------------------------------------------------------------------
  delete: function (req, res) {
    // Obtener ID del producto desde la URL
    const productId = req.params.id;

    db.Product.destroy({ where: { id: productId } })
      .then(function (deletedCount) {
        // Si se elimina el registro
        if (deletedCount === 1) {
          return res.redirect("/products");
        }
        // Si no se elimina el registro
        else {
          return res.status(404).send("Producto no encontrado");
        }
      })
      .catch(function (e) {
        console.log(e);
        return res.status(500).send("Error al eliminar el producto");
      });
  },
  // ------------------------------------------------------------------------
  search: function (req, res) {
    const searchQuery = req.query.search?.toLowerCase() || "";

    db.Product.findAll({
      include: [
        {
          model: db.Brand,
          required: false,
        },
        {
          model: db.Category,
          required: false,
        },
      ],
      where: {
        [db.Sequelize.Op.or]: [
          db.Sequelize.where(
            db.Sequelize.fn("LOWER", db.Sequelize.col("Product.name")),
            "LIKE",
            `%${searchQuery}%`
          ),
          db.Sequelize.where(
            db.Sequelize.fn("LOWER", db.Sequelize.col("Brand.name")),
            "LIKE",
            `%${searchQuery}%`
          ),
          db.Sequelize.where(
            db.Sequelize.fn("LOWER", db.Sequelize.col("Category.name")),
            "LIKE",
            `%${searchQuery}%`
          ),
        ],
      },
    })
      .then((products) => {
        res.render("products/productSearch", { products, searchQuery });
      })
      .catch((error) => {
        console.log("Error en la búsqueda:", error);
        res.status(500).send("Error en la búsqueda");
      });
  },
  // ------------------------------------------------------------------------
  addToCart: async (req, res) => {
    try {
      const userId = req.session.user.id;
      const productId = req.params.id;
      const quantity = parseInt(req.body.quantity, 10) || 1;

      if (!userId) {
        return res.status(400).send("Usuario no autenticado");
      }

      // Buscar o crear el carrito del usuario
      let cart = await db.ShoppingCart.findOne({ where: { user_id: userId } });
      if (!cart) {
        cart = await db.ShoppingCart.create({ user_id: userId, total: 0 });
      }

      // Buscar o crear el item en el carrito
      let cartItem = await db.CartItem.findOne({
        where: { cart_id: cart.id, product_id: productId },
      });

      const product = await db.Product.findByPk(productId);
      if (!product) {
        return res.status(404).send("Producto no encontrado");
      }

      if (cartItem) {
        // Actualizar cantidad y precio del item existente
        cartItem.quantity += quantity;
        cartItem.price = product.price * cartItem.quantity;
        await cartItem.save();
      } else {
        // Crear un nuevo item en el carrito
        await db.CartItem.create({
          cart_id: cart.id,
          product_id: productId,
          quantity,
          price: product.price * quantity,
        });
      }

      // Recalcular el total del carrito
      const cartItems = await db.CartItem.findAll({
        where: { cart_id: cart.id },
      });
      const newTotal = cartItems.reduce((sum, item) => {
        return sum + Number(item.price);
      }, 0);

      console.log("-".repeat(80));
      console.log("Nuevo total calculado:", newTotal);
      console.log("-".repeat(80));

      if (isNaN(newTotal)) {
        throw new Error("El total calculado no es un número válido.");
      }

      cart.total = newTotal;
      await cart.save();

      res.redirect(`/products/${productId}`);
    } catch (error) {
      console.error("Error en addToCart:", error.message);
      res.status(500).send("Error al agregar producto al carrito");
    }
  },
  // ------------------------------------------------------------------------
  showCart: async (req, res) => {
    try {
      const userId = req.session.user.id;

      let cart = await db.ShoppingCart.findOne({
        where: { user_id: userId },
        include: [
          {
            model: db.CartItem,
            include: [{ model: db.Product }],
          },
        ],
      });

      if (!cart || cart.CartItems.length === 0) {
        return res.render("products/productCart", {
          cartItems: [],
          cartTotal: 0,
        });
      }

      const cartItems = cart.CartItems;

      // Calcula el total del carrito como suma de precios de todos los ítems
      const cartTotal = cartItems.reduce((sum, item) => {
        return sum + Number(item.price);
      }, 0);

      res.render("products/productCart", { cartItems, cartTotal });
    } catch (error) {
      console.error("Error en showCart:", error.message);
      res.status(500).send("Error al mostrar el carrito.");
    }
  },
  // ------------------------------------------------------------------------
  increaseItem: async (req, res) => {
    try {
      const cartItemId = req.params.id;

      let cartItem = await db.CartItem.findByPk(cartItemId);
      if (!cartItem) {
        console.error("CartItem no encontrado");
        return res.status(404).send("Producto no encontrado en el carrito.");
      }

      const product = await db.Product.findByPk(cartItem.product_id);
      if (!product) {
        console.error("Producto no encontrado");
        return res.status(404).send("Producto no encontrado.");
      }

      // Incrementar la cantidad y actualizar el precio
      cartItem.quantity += 1;
      cartItem.price = parseFloat(
        (product.price * cartItem.quantity).toFixed(2)
      ); // Asegura que sea decimal
      await cartItem.save();

      // Actualizar el total del carrito
      let cart = await db.ShoppingCart.findByPk(cartItem.cart_id);
      if (!cart) {
        console.error("Carrito no encontrado");
        return res.status(404).send("Carrito no encontrado.");
      }

      // Recalcular el total sumando los precios de los items en el carrito
      const total = await db.CartItem.sum("price", {
        where: { cart_id: cart.id },
      });
      cart.total = parseFloat(total.toFixed(2));
      await cart.save();

      res.redirect("/products/cart");
    } catch (error) {
      console.error("Error en increaseItem:", error);
      res.status(500).send("Error al aumentar la cantidad del producto.");
    }
  },
  // ------------------------------------------------------------------------
  decreaseItem: async (req, res) => {
    try {
      const cartItemId = req.params.id;

      let cartItem = await db.CartItem.findByPk(cartItemId);
      if (!cartItem) {
        return res.status(404).send("Producto no encontrado en el carrito.");
      }

      const product = await db.Product.findByPk(cartItem.product_id);
      if (!product) {
        return res.status(404).send("Producto no encontrado.");
      }

      cartItem.quantity -= 1;
      cartItem.price -= product.price; // Actualiza el precio total del item

      if (cartItem.quantity <= 0) {
        await cartItem.destroy(); // Elimina el producto si la cantidad es 0
      } else {
        await cartItem.save();
      }

      let cart = await db.ShoppingCart.findByPk(cartItem.cart_id);
      cart.total -= product.price; // Actualiza el total del carrito
      await cart.save();

      res.redirect("/products/cart");
    } catch (error) {
      console.error("Error en decreaseItem:", error.message);
      res.status(500).send("Error al disminuir la cantidad del producto.");
    }
  },
  // ------------------------------------------------------------------------
  removeItem: async (req, res) => {
    try {
      const cartItemId = req.params.id;

      let cartItem = await db.CartItem.findByPk(cartItemId);
      if (!cartItem) {
        return res.status(404).send("Producto no encontrado en el carrito.");
      }

      let cart = await db.ShoppingCart.findByPk(cartItem.cart_id);
      cart.total -= cartItem.price; // Resta el precio total del item del total del carrito
      await cart.save();

      await cartItem.destroy(); // Elimina el producto del carrito

      res.redirect("/products/cart");
    } catch (error) {
      console.error("Error en removeItem:", error.message);
      res.status(500).send("Error al eliminar el producto del carrito.");
    }
  },
  // ------------------------------------------------------------------------
  checkout: async (req, res) => {
    try {
      const userId = req.session.user.id;

      if (!userId) {
        return res.status(401).send("Usuario no autenticado.");
      }

      // Obtener el carrito del usuario
      const cart = await db.ShoppingCart.findOne({
        where: { user_id: userId },
      });
      if (!cart) {
        return res.status(404).send("Carrito no encontrado.");
      }

      const cartItems = await db.CartItem.findAll({
        where: { cart_id: cart.id },
        include: [{ model: db.Product }],
      });

      if (cartItems.length === 0) {
        return res.status(400).send("El carrito está vacío.");
      }

      // Validar que cada item tenga un id válido antes de continuar
      for (const item of cartItems) {
        if (isNaN(item.product_id)) {
          return res.status(400).send("ID de producto inválido en el carrito.");
        }

        const product = await db.Product.findByPk(item.product_id);
        if (!product) {
          return res
            .status(404)
            .send(`Producto con ID ${item.product_id} no encontrado.`);
        }

        // Registrar cada venta en la tabla Sales
        await db.Sale.create({
          user_id: userId,
          product_id: item.product_id,
          quantity: item.quantity,
          total: item.price,
          sale_date: new Date(),
        });
      }

      // Limpiar el carrito después de la compra
      await db.CartItem.destroy({ where: { cart_id: cart.id } });
      cart.total = 0;
      await cart.save();

      // Renderizar la confirmación de la compra
      res.render("products/checkoutConfirmation", {
        message: "¡Compra realizada con éxito!",
      });
    } catch (error) {
      console.error("Error en checkout:", error);
      res.status(500).send("Error al procesar la compra.");
    }
  },
};

module.exports = productController;
