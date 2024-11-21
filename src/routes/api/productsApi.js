var express = require("express");
var router = express.Router();

// Importar controladores
var productController = require("../../controllers/productsController");

// Importar middlewares
const isAdmin = require("../../middlewares/isAdmin");

// Rutas
// acceder desde api/products/...
router.get("/", productController.index);
router.get("/:id", productController.showApi);

module.exports = router;
