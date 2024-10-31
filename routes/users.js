var express = require('express');
var router = express.Router();

// Importar controladores
var usersController = require('../controllers/usersController')

// Importar middlewares
const upload = require('../middlewares/upload')
const authMiddleware = require('../middlewares/authMiddleware');

// Rutas
router.get('/', authMiddleware.isAuthenticated, usersController.index);
router.get('/login', authMiddleware.isGuest, usersController.login);
router.post('/login', authMiddleware.isGuest, usersController.authenticate);
router.get('/logout', authMiddleware.isAuthenticated, usersController.logout);
router.get('/create', authMiddleware.isGuest, usersController.create);
router.get('/edit', authMiddleware.isAuthenticated, usersController.edit);
router.put('/:id', authMiddleware.isAuthenticated, upload.single('profileImage'), usersController.update);
router.delete('/:id', authMiddleware.isAuthenticated, usersController.delete);
router.get('/:id', authMiddleware.isAuthenticated, usersController.show);
router.post('/', authMiddleware.isGuest, upload.single('profileImage'), usersController.store);

module.exports = router;
