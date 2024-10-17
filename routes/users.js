var express = require('express');
var router = express.Router();

// Importar controladores
var userController = require('../controllers/userController')

// Rutas
router.get('/', userController.index);
router.get('/:id', userController.show);

module.exports = router;
