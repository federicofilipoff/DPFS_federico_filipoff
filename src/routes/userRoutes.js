const express = require('express');
const router = express.Router();
const path = require('path');

// IMPORTAR CONTROLLERS
const userController = require(path.join(__dirname, '..', 'controllers', 'userController'));

// ----------------------------------------------------------------------------
// IMPORTAR MULTER Y CONFIGURAR DESTINO
const multer = require('multer');

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
router.post('/login', userController.iniciarSesion)
router.get('/profile', userController.perfilUsuario)
router.get('/logout', userController.cerrarSesion)
router.post('/', upload.single('image'), userController.crearUsuario);
router.get('/', userController.visualizarUsuarios);
router.get('/:id', userController.visualizarUsuario);
router.put('/:id', userController.editarUsuario);
router.delete('/:id', userController.eliminarUsuario);
router.get('/:id/edit', userController.formularioEditarUsuario);

// ----------------------------------------------------------------------------
// Exportar rutas
module.exports = router;
