const db = require("../database/models");

const includeModels = [
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
];

const findAllProducts = async () => {
  try {
    return await db.Product.findAll({
      include: includeModels,
    });
  } catch (error) {
    console.error("Error al buscar datos:", error);
    throw new Error("Error en la base de datos");
  }
};

const findAProductById = async (productId) => {
  try {
    return await db.Product.findByPk(productId, {
      include: includeModels,
    });
  } catch (error) {
    console.error("Error al buscar datos:", error);
    throw new Error("Error en la base de datos");
  }
};

const deleteAProductById = async (productId) => {
  try {
    return await db.Product.destroy({ where: { id: productId } });
  } catch (error) {
    console.error("Error al buscar datos:", error);
    throw new Error("Error en la base de datos");
  }
};

module.exports = {
  findAllProducts,
  findAProductById,
  deleteAProductById,
};
