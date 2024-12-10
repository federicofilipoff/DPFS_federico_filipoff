const router = require("express").Router();

const upload = require("../../middlewares/upload");
const authMiddleware = require("../../middlewares/authMiddleware");
const authValidator = require("../../validators/authValidator");
const userValidator = require("../../validators/userValidator");

const auth = require("../../controllers/auth");
const createController = require("../../controllers/users/create");
const editController = require("../../controllers/users/edit");
const deleteController = require("../../controllers/users/delete");
const profileController = require("../../controllers/users/profile");

router.get("/requirelogin", authMiddleware.isGuest, auth.requireLogin);
router.get("/login", authMiddleware.isGuest, auth.login);
router.post("/login", authMiddleware.isGuest, authValidator, auth.authenticate);
router.get("/logout", authMiddleware.isAuthenticated, auth.logout);
router.get("/create", authMiddleware.isGuest, createController.create);
router.get("/edit", authMiddleware.isAuthenticated, editController.edit);
router.put(
  "/:id",
  authMiddleware.isAuthenticated,
  upload.single("profileImage"),
  userValidator.update,
  editController.update
);
router.delete("/:id", authMiddleware.isAuthenticated, deleteController);
router.get("/:id", authMiddleware.isAuthenticated, profileController);
router.post(
  "/",
  authMiddleware.isGuest,
  upload.single("profileImage"),
  userValidator.store,
  createController.store
);

module.exports = router;
