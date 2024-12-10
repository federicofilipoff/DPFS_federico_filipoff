const express = require("express");
const router = express.Router();

const authorize = require("../../middlewares/authorize");

const { showAllUsers, showUser } = require("../../controllers/api/users");
const { checkUser, checkEmail } = require("../../controllers/api/authUsers");

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: APIs para gestionar usuarios
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
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
router.get("/", authorize("admin"), showAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtiene los detalles de un usuario
 *     tags: [Usuarios]
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
router.get("/:id", authorize("admin"), showUser);

/**
 * @swagger
 * /api/users/check-credentials:
 *   post:
 *     summary: Verificar credenciales de usuario
 *     tags: [Usuarios]
 *     description: Valida si un usuario existe en la base de datos y si las credenciales son correctas (útil para el formulario "Login").
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *                 example: email@example.com
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *                 example: asdASD123!
 *     responses:
 *       200:
 *         description: Credenciales válidas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Credenciales válidas.
 *       400:
 *         description: Faltan datos en la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email y contraseña son requeridos.
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: El correo no está registrado.
 *       401:
 *         description: Contraseña incorrecta.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Contraseña incorrecta.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/check-credentials", checkUser);

/**
 * @swagger
 * /api/users/check-email:
 *   post:
 *     summary: Verifica si un email existe o está en uso.
 *     tags: [Usuarios]
 *     description: Comprueba si un email ya está registrado en la base de datos y maneja casos especiales como el email actual del usuario (útil para crear y editar usuario).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico a verificar.
 *                 example: new-email@example.com
 *               currentEmail:
 *                 type: string
 *                 description: Correo actual del usuario logueado (si corresponde).
 *                 example: current-email@example.com
 *     responses:
 *       200:
 *         description: Resultado de la verificación del email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: El correo no está registrado.
 *       404:
 *         description: El correo ya está en uso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Correo en uso.
 *                 email:
 *                   type: string
 *                   example: usado.email@gmail.com
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error interno del servidor.
 */
router.post("/check-email", checkEmail);

module.exports = router;
