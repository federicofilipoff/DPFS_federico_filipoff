const { deleteAProductById } = require("../../service/productRepository");

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedCount = await deleteAProductById(productId);

    if (deletedCount === 1) {
      return res.redirect("/products");
    } else {
      return res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error al eliminar el producto");
  }
};

module.exports = deleteProduct;
