const { findAProductById } = require("../../service/productRepository");

const show = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const data = await findAProductById(productId);
    return res.render("products/productDetail", { data });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error al obtener los productos");
  }
};

module.exports = show;
