const { findAllProducts } = require("../../service/productRepository");

const index = async (req, res) => {
  try {
    const data = await findAllProducts();
    return res.render("products/productList", { data });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return res.status(500).send("Error al obtener los productos");
  }
};

module.exports = index;
