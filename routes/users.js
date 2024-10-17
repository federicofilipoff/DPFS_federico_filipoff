var express = require('express');
var router = express.Router();

// Importar controladores
var userController = require('../controllers/userController')

// Rutas
// router.get('/', userController.index);
// router.get('/:id', userController.show);
router.get('/login', userController.login);
router.get('/register', userController.register);

module.exports = router;
