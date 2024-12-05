var express = require("express");
var router = express.Router();

// Importar controladores
var productController = require("../../controllers/productsController");

// Importar middlewares
const upload = require("../../middlewares/upload");
const authorize = require("../../middlewares/authorize");
const productValidator = require("../../validators/productValidator");

// Rutas
// acceder desde /products/...
router.get("/", productController.productList);
router.post(
  "/",
  authorize("admin"),
  upload.single("image"),
  productValidator.store,
  productController.store
);
router.get("/search", productController.search);
router.get("/create", authorize("admin"), productController.create);
router.get("/cart", productController.showCart);
router.post("/cart/increase/:id", productController.increaseItem);
router.post("/cart/decrease/:id", productController.decreaseItem);
router.post("/cart/remove/:id", productController.removeItem);
router.post("/checkout", productController.checkout);
router.post("/addItem/:id", productController.addToCart);
router.get("/:id/edit", authorize("admin"), productController.edit);
router.put(
  "/:id",
  authorize("admin"),
  upload.single("image"),
  productValidator.update,
  productController.update
);
router.get("/:id", productController.show);
router.delete("/:id", authorize("admin"), productController.delete);

module.exports = router;
