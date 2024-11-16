var express = require("express");
var router = express.Router();

// Importar controladores
var productController = require("../../controllers/productsController");

// Importar middlewares
const isAdmin = require("../../middlewares/isAdmin");

// Rutas
// acceder desde api/products/...
router.get("/", isAdmin, productController.index);
router.get("/:id", isAdmin, productController.showApi);

module.exports = router;
