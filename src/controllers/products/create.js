const { validationResult } = require("express-validator");
const db = require("../../database/models");

let productCreateController = {
  create: async function (req, res) {
    try {
      const [brands, categories, colors] = await Promise.all([
        db.Brand.findAll(),
        db.Category.findAll(),
        db.Color.findAll(),
      ]);
      return res.render("products/productCreate", {
        brands,
        categories,
        colors,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("Error al cargar los datos para crear el producto.");
    }
  },

  store: async function (req, res) {
    try {
      const result = validationResult(req);

      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

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

      const colorsArray = Array.isArray(colors)
        ? colors
        : colors
        ? colors.split(",")
        : [];

      const existingProduct = await db.Product.findOne({ where: { name } });
      if (existingProduct) {
        return res.status(400).send("Error: El producto ya fue registrado.");
      }

      const nuevoProducto = await db.Product.create({
        name,
        description,
        officialWeb,
        size,
        brand_id: parseInt(brand),
        category_id: parseInt(category),
        image: req.file ? req.file.filename : null,
        price: parseFloat(price) || 0.0,
      });

      // Insertar colores asociados al producto
      const colorPromises = colorsArray.map((colorId) =>
        db.ProductColor.create({
          product_id: nuevoProducto.id,
          color_id: parseInt(colorId),
        })
      );

      await Promise.all(colorPromises);

      return res.redirect(`/products/create`);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error: producto no creado");
    }
  },
};

module.exports = productCreateController;
