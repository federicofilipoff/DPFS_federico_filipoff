const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const userController = require(path.join(__dirname, '..', 'controllers', 'userController'));
const { validateLogin, validateRegister } = require(path.join(__dirname, '..', 'validators', 'userValidator'));


// ----------------------------------------------------------------------------
// Configuración de Multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', '..', 'public', 'images', 'users'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });
upload.single('image');

// ----------------------------------------------------------------------------
// RUTA DE USUARIOS
// Respetar orden de rutas: rutas específicas vs rutas dinámicas
router.get('/create', userController.formularioCrearUsuario);
router.get('/login', userController.formularioAccesoUsuario);
router.post('/login', validateLogin, userController.iniciarSesion)
router.get('/profile', userController.perfilUsuario)
router.get('/logout', userController.cerrarSesion)
router.post('/', upload.single('image'), validateRegister, userController.crearUsuario);
router.get('/', userController.visualizarUsuarios);
router.get('/:id', userController.visualizarUsuario);
router.put('/:id', validateRegister, userController.editarUsuario);
router.delete('/:id', userController.eliminarUsuario);
router.get('/:id/edit', userController.formularioEditarUsuario);

// ----------------------------------------------------------------------------
// Exportar rutas
module.exports = router;
