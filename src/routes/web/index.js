var router = require("express").Router();
const { findAllProducts } = require("../../service/productRepository");

router.get("/", async function (req, res, next) {
  try {
    const products = await findAllProducts();
    if (products) {
      return res.render("index", { products });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener productos");
  }
});

module.exports = router;
