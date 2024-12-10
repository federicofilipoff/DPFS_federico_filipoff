const db = require("../../database/models");

const search = async (req, res) => {
  try {
    const searchQuery = req.query.search?.toLowerCase() || "";

    const products = await db.Product.findAll({
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
    });

    res.render("products/productSearch", { products, searchQuery });
  } catch (error) {
    console.error("Error en la búsqueda:", error);
    res.status(500).send("Error en la búsqueda");
  }
};

module.exports = search;
