const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

// Middleware para procesar JSON y formularios
const bodyParser = express.urlencoded({ extended: true });
const jsonParser = express.json();

// Middleware para utilizar PUT o DELETE
const methodOverrideMiddleware = methodOverride('_method');

// Middleware para manejar cookies
const cookieParserMiddleware = cookieParser();

// Configuración de sesiones
const sessionMiddleware = session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
});

// Middleware para pasar datos de sesión a las vistas
const sessionToViewMiddleware = (req, res, next) => {
  res.locals.user = req.session.user;
  next();
};

// Autenticar sesion de usuario
const authMiddleware = (req, res, next) => {
if (req.session.user) {
    return next();
  } else {
    return res.redirect('/user/login');
  }
};

const guestMiddleware = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/user/profile');
  } else {
    return next();
  }
};

const editUserMiddleware = (req, res, next) => {
  if (req.session.user) {
    const id_usuario = req.session.user.id.toString();
    if (id_usuario === req.params.id) {
      return next();
    } else {
      return res.redirect(`/user/${id_usuario}/edit`);
    }
  } else {

    return res.redirect('/');
  }
};

// Exportar middlewares
module.exports = {
  bodyParser,
  jsonParser,
  methodOverrideMiddleware,
  cookieParserMiddleware,
  sessionMiddleware,
  sessionToViewMiddleware,
  authMiddleware,
  guestMiddleware,
  editUserMiddleware
};
