const express = require("express");
const router = express.Router();

// Importar controladores
const usersController = require("../../controllers/usersController");
const authController = require("../../controllers/authController");

// Importar middlewares
const isAdmin = require("../../middlewares/isAdmin");

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     description: Devuelve la cantidad de usuarios registrados y una lista de todos los usuarios disponibles.
 *     responses:
 *       200:
 *         description: Lista de usuarios.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 100
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         example: "e-mail@example.com"
 *                       detail:
 *                         type: string
 *                         example: "http://localhost:3000/users/1"
 */
router.get("/", usersController.index);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Verifica un usuario
 *     description: Verifica si un usuario existe en la base de datos.
 *     responses:
 *       200:
 *         description: Usuario verificado.
 */
router.post("/", authController.checkUser);

/**
 * @swagger
 * /api/users/email:
 *   post:
 *     summary: Verifica un email
 *     description: Verifica si un email existe en la base de datos.
 *     responses:
 *       200:
 *         description: Email verificado.
 */
router.post("/email", authController.checkEmail);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtiene los detalles de un usuario
 *     description: Devuelve la información de un usuario específico basado en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalles del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 firstName:
 *                   type: string
 *                   example: "John"
 *                 lastName:
 *                   type: string
 *                   example: "Doe"
 *                 email:
 *                   type: string
 *                   example: "e-mail@example.com"
 *                 profileImage:
 *                   type: string
 *                   example: "/images/users/imagen_perfil_2.jpeg"
 *                 createdAt:
 *                   type: string
 *                   example: "2024-11-21T23:30:44.000Z"
 *                 updatedAt:
 *                   type: string
 *                   example: "2024-11-21T23:46:03.000Z"
 */
router.get("/:id", usersController.showApi);

module.exports = router;
