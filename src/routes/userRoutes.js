const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const userController = require(path.join(__dirname, '..', 'controllers', 'userController'));
const authController = require(path.join(__dirname, '..', 'controllers', 'authController'));
const middlewares = require(path.join(__dirname, '..', 'middlewares', 'middlewares'));
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
router.get('/login', middlewares.guestMiddleware, userController.formularioAccesoUsuario);
router.post('/login', validateLogin, authController.iniciarSesion);
router.get('/profile', middlewares.authMiddleware, userController.perfilUsuario);
router.get('/logout', authController.cerrarSesion);
router.post('/', upload.single('image'), validateRegister, authController.crearUsuario);
router.get('/', userController.visualizarUsuarios);
router.get('/:id', userController.visualizarUsuario);
router.put('/:id',  middlewares.authMiddleware, validateRegister, userController.editarUsuario);
router.delete('/:id', userController.eliminarUsuario);
router.get('/:id/edit', middlewares.editUserMiddleware, userController.formularioEditarUsuario);

// ----------------------------------------------------------------------------
// Exportar rutas
module.exports = router;
