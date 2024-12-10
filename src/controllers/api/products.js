const Sequelize = require("sequelize");
const db = require("../../database/models");
const {
  findAllProducts,
  findAProductById,
} = require("../../service/productRepository");

const showAllProducts = async (req, res) => {
  try {
    const products = await findAllProducts();
    const count = products.length;
    const countByCategory = products.reduce((acc, product) => {
      const categoryName = product.Category.name;
      if (!acc[categoryName]) {
        acc[categoryName] = 0;
      }
      acc[categoryName] += 1;
      return acc;
    }, {});

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
        db.Sale.sum("quantity"),
        db.Sale.sum("total"),
        db.Sale.findAll({
          include: [{ model: db.Product, attributes: ["name"] }],
          order: [["sale_date", "DESC"]],
          limit: 5,
        }),

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

    const latestSalesDetails = latestSales.map((sale) => ({
      productName: sale.Product ? sale.Product.name : "Producto no encontrado",
      quantity: sale.quantity,
      total: sale.total,
      saleDate: sale.sale_date,
    }));

    const topProductsDetails = topProducts.map((sale) => ({
      productName: sale.Product ? sale.Product.name : "Producto no encontrado",
      totalSold: sale.dataValues.totalSold,
    }));

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
};

const showAProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await findAProductById(productId);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

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

    return res.json(productDetail);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error al obtener el producto");
  }
};

module.exports = {
  showAllProducts,
  showAProduct,
};
