const express = require('express');
const router = express.Router();

// Importar controladores
const usersController = require('../controllers/usersController')

// Importar middlewares
const upload = require('../middlewares/upload')
const authMiddleware = require('../middlewares/authMiddleware');
const authValidator = require('../validators/authValidator');
const userValidator = require('../validators/userValidator');

// Rutas
router.get('/', authMiddleware.isAuthenticated, usersController.index);
router.get('/login', authMiddleware.isGuest, usersController.login);
router.post('/login', authMiddleware.isGuest, authValidator, usersController.authenticate);
router.get('/logout', authMiddleware.isAuthenticated, usersController.logout);
router.get('/create', authMiddleware.isGuest, usersController.create);
router.get('/edit', authMiddleware.isAuthenticated, usersController.edit);
router.put('/:id', authMiddleware.isAuthenticated, upload.single('profileImage'), userValidator.update, usersController.update);
router.delete('/:id', authMiddleware.isAuthenticated, usersController.delete);
router.get('/:id', authMiddleware.isAuthenticated, usersController.show);
router.post('/', authMiddleware.isGuest, upload.single('profileImage'), userValidator.store, usersController.store);

module.exports = router;
