const { validationResult } = require("express-validator");
const db = require("../../database/models");

let productEditController = {
  edit: async function (req, res) {
    try {
      const productId = req.params.id;

      const [product, brands, categories, colors] = await Promise.all([
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
      ]);

      if (!product) {
        return res.status(404).send("Producto no encontrado");
      }

      return res.render("products/productEdit", {
        product,
        brands,
        categories,
        colors,
      });
    } catch (error) {
      console.error("Error al editar el producto:", error);
      return res.status(500).send("Error en el servidor");
    }
  },

  update: async function (req, res) {
    const productId = req.params.id;
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

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

    if (req.file) {
      actualProducto.image = req.file.filename;
    }

    try {
      const existingProduct = await db.Product.findOne({
        where: { name: name, id: { [db.Sequelize.Op.ne]: productId } },
      });

      if (existingProduct) {
        return res
          .status(400)
          .send("Error: El nombre del producto ya está en uso.");
      }

      // Actualizar el producto con los nuevos datos
      const [updatedRows] = await db.Product.update(actualProducto, {
        where: { id: productId },
      });

      if (updatedRows === 0) {
        return res
          .status(404)
          .send(
            "No se actualizó el producto. Asegúrate de que el ID es correcto."
          );
      }

      // Eliminar los colores actuales
      await db.ProductColor.destroy({ where: { product_id: productId } });

      // Insertar colores asociados al producto
      const colorPromises = colorsArray.map((colorId) => {
        return db.ProductColor.create({
          product_id: productId,
          color_id: parseInt(colorId),
        });
      });

      await Promise.all(colorPromises);

      return res.redirect(`/products/${productId}`);
    } catch (error) {
      console.error(
        "Error en el controlador de actualización de producto:",
        error.message
      );
      return res.status(500).send("Error al actualizar el producto");
    }
  },
};

module.exports = productEditController;
