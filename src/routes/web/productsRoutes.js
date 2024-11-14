var express = require("express");
var router = express.Router();

// Importar controladores
var productController = require("../../controllers/productsController");

// Importar middlewares
const upload = require("../../middlewares/upload");
const isAdmin = require("../../middlewares/isAdmin");
const productValidator = require("../../validators/productValidator");

// Rutas
router.get("/", productController.index);
router.post(
  "/",
  isAdmin,
  upload.single("image"),
  productValidator.store,
  productController.store
);
router.get("/search", productController.search);
router.get("/create", isAdmin, productController.create);
router.get("/cart", productController.cart);
router.get("/:id/edit", isAdmin, productController.edit);
router.put(
  "/:id",
  isAdmin,
  upload.single("image"),
  productValidator.update,
  productController.update
);
router.get("/:id", productController.show);
router.delete("/:id", isAdmin, productController.delete);

module.exports = router;
