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

// Exportar middlewares
module.exports = {
  bodyParser,
  jsonParser,
  methodOverrideMiddleware,
  cookieParserMiddleware,
  sessionMiddleware,
  sessionToViewMiddleware
};
