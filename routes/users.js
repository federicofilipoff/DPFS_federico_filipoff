var express = require('express');
var router = express.Router();

// Importar controladores
var usersController = require('../controllers/usersController')

// Importar middlewares
const upload = require('../middlewares/upload')
const authMiddleware = require('../middlewares/authMiddleware');

// Rutas
router.get('/', authMiddleware.isAuthenticated, usersController.index); //Agregar middleware para permitir únicamente acceso a administradores
router.get('/login', authMiddleware.isGuest, usersController.login);
router.get('/create', authMiddleware.isGuest, usersController.create);
router.post('/login', authMiddleware.isGuest, usersController.authenticate);
router.get('/logout', authMiddleware.isAuthenticated, usersController.logout);
router.post('/', authMiddleware.isGuest, upload.single('profileImage'), usersController.store);
router.get('/:id', authMiddleware.isAuthenticated, usersController.profile);

module.exports = router;
