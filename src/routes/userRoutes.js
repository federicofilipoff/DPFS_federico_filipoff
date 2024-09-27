const express = require('express');
const router = express.Router();
const path = require('path');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ----------------------------------------------------------------------------
// IMPORTAR MODEL
const User = require(path.join(__dirname, '..', 'models', 'User'));

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
// RUTA: ACCEDER USUARIO (GET)
router.get('/login/', (req, res) => {
  res.render(path.join(__dirname, '..', 'views', 'users', 'login.ejs'))
})

// ----------------------------------------------------------------------------
// RUTA: FORMULARIO DE LOGIN (GET)
router.get('/login', (req, res) => {
  res.render(path.join(__dirname, '..', 'views', 'users', 'login.ejs'), { error: null });
});

// ----------------------------------------------------------------------------
// RUTA: PROCESAR LOGIN (POST)
router.post('/login', async (req, res) => {
  const { email, password, remember } = req.body;

  try {
    // Buscar al usuario en la base de datos
    const usuario = await User.findOne({ where: { email } });

    if (!usuario) {
      // Si no se encuentra el usuario, redirigir al login con un error
      return res.render('users/login', { error: 'Usuario no encontrado' });
    }

    // Verificar que la contraseña sea correcta
    const isMatch = await bcrypt.compare(password, usuario.password);

    if (!isMatch) {
      // Si la contraseña es incorrecta, redirigir al login con un error
      return res.render('users/login', { error: 'Contraseña incorrecta' });
    }

    // Si las credenciales son correctas, generar el token JWT
    const token = jwt.sign({
      id: usuario.id,
      firstName: usuario.firstName,
      lastName: usuario.lastName,
      email: usuario.email
    }, 'tu_secreto_jwt', { expiresIn: remember ? '30d' : '1d' });

    // Guardar el token en una cookie
    res.cookie('token', token, { httpOnly: true, maxAge: remember ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000 });

    // Redirigir al home (inicio) en caso de éxito
    return res.redirect('/');
  } catch (error) {
    console.error('Error interno del servidor:', error);
    return res.status(500).send('Error interno del servidor');
  }
});

// ----------------------------------------------------------------------------
// RUTA: PERFIL DEL USUARIO
router.get('/profile', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/user/login');
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, 'tu_secreto_jwt');
    res.render(path.join(__dirname, '..', 'views', 'users', 'profile.ejs'), { user: decoded });
  } catch (err) {
    console.error('Token inválido:', err);
    return res.redirect('/user/login');
  }
});

// ----------------------------------------------------------------------------
// RUTA: PROCESAR LOGOUT
router.get('/logout', (req, res) => {
  res.clearCookie('token'); // Eliminar cookie que contiene el token
  res.redirect('/');
});

// ----------------------------------------------------------------------------
// RUTA DE USUARIOS
// Respetar orden de rutas: rutas específicas vs rutas dinámicas
router.get('/create', userController.formularioCrearUsuario);
router.post('/', upload.single('image'), userController.crearUsuario);
router.get('/', userController.visualizarUsuarios);
router.get('/:id', userController.visualizarUsuario);
router.get('/:id/edit', userController.formularioEditarUsuario);
router.put('/:id', userController.editarUsuario);
router.delete('/:id', userController.eliminarUsuario);

// ----------------------------------------------------------------------------
// Exportar rutas
module.exports = router;
