const db = require("../../database/models");

let cartControllers = {
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
      );
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

      // Elimina el producto si la cantidad es 0
      if (cartItem.quantity <= 0) {
        await cartItem.destroy();
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

  removeItem: async (req, res) => {
    try {
      const cartItemId = req.params.id;

      let cartItem = await db.CartItem.findByPk(cartItemId);
      if (!cartItem) {
        return res.status(404).send("Producto no encontrado en el carrito.");
      }

      let cart = await db.ShoppingCart.findByPk(cartItem.cart_id);
      cart.total -= cartItem.price;
      await cart.save();

      await cartItem.destroy();

      res.redirect("/products/cart");
    } catch (error) {
      console.error("Error en removeItem:", error.message);
      res.status(500).send("Error al eliminar el producto del carrito.");
    }
  },

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

module.exports = cartControllers;
