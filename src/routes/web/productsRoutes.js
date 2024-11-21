var express = require("express");
var router = express.Router();

// Importar controladores
var productController = require("../../controllers/productsController");

// Importar middlewares
const upload = require("../../middlewares/upload");
const isAdmin = require("../../middlewares/isAdmin");
const productValidator = require("../../validators/productValidator");

// Rutas
// acceder desde /products/...
router.get("/", productController.productList);
router.post(
  "/",
  isAdmin,
  upload.single("image"),
  productValidator.store,
  productController.store
);
router.get("/search", productController.search);
router.get("/create", isAdmin, productController.create);
router.get("/cart", productController.showCart);
router.post("/cart/increase/:id", productController.increaseItem);
router.post("/cart/decrease/:id", productController.decreaseItem);
router.post("/cart/remove/:id", productController.removeItem);
router.post("/checkout", productController.checkout);
router.post("/addItem/:id", productController.addToCart);
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
