const express = require("express");
const router = express.Router();

// Importar controladores
const usersController = require("../../controllers/usersController");
const authController = require("../../controllers/authController");

// Importar middlewares
const isAdmin = require("../../middlewares/isAdmin");

// Rutas
router.get("/", isAdmin, usersController.index);
router.post("/", authController.checkUser);
router.post("/email", authController.checkEmail);

module.exports = router;
