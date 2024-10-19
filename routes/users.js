var express = require('express');
var router = express.Router();

// Importar controladores
var usersController = require('../controllers/usersController')

// Rutas
// router.get('/', usersController.index);
// router.get('/:id', usersController.show);
router.get('/login', usersController.login);
router.get('/register', usersController.register);

module.exports = router;
