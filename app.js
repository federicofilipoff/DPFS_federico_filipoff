const express = require('express')
const app = express();
const path = require('path');
const session = require('express-session');

// ----------------------------------------------------------------------------
// CONFIGURACIONES
app.set('port', 3000)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// ----------------------------------------------------------------------------
// DEFINIR RUTAS
const middlewaresPath = path.join(__dirname, 'src', 'middlewares', 'middlewares');
const publicPath = path.join(__dirname, 'public');
const userRoutesPath = path.join(__dirname, 'src', 'routes', 'userRoutes');
const productRoutesPath = path.join(__dirname, 'src', 'routes', 'productRoutes');
const UserPath = path.join(__dirname, 'src', 'models', 'User');
const ProductPath = path.join(__dirname, 'src', 'models', 'Product');

// IMPORTAR MIDDLEWARES
const {
  bodyParser,
  jsonParser,
  methodOverrideMiddleware,
  cookieParserMiddleware,
  sessionMiddleware,
  sessionToViewMiddleware,
} = require(middlewaresPath);

// USAR LOS MIDDLEWARES
app.use(jsonParser);
app.use(bodyParser);
app.use(methodOverrideMiddleware);
app.use(cookieParserMiddleware);
app.use(sessionMiddleware);
app.use(sessionToViewMiddleware);

// Middleware global: útil para pasar la información del usuario a todas las vistas
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// ----------------------------------------------------------------------------
// Servir archivos estáticos
app.use(express.static(publicPath));

// Importar RUTAS
const userRoutes = require(userRoutesPath);
const productRoutes = require(productRoutesPath);

// Importar MODELOS de datos
const User = require(UserPath);
const Product = require(ProductPath);

// ----------------------------------------------------------------------------
app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: true,
  cookie: { 
      httpOnly: true,
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000
      }
}));

// ----------------------------------------------------------------------------
// Crear TABLA si no existe
User.sync({ force: false })
  .then(() => {
    console.log('Tabla "User" sincronizada correctamente');
  })
  .catch((err) => {
    console.error('Tabla "User" no sincronizada correctamente:', err);
  });

Product.sync({ force: false })
  .then(() => {
    console.log('Tabla "Product" sincronizada correctamente');
  })
  .catch((err) => {
    console.error('Tabla "Product" no sincronizada correctamente:', err);
});

// ----------------------------------------------------------------------------
// DEFINIR RUTAS
app.get('/', (req, res) => {
  res.render('index');
});

// USAR: rutas de USUARIO
app.use('/user', userRoutes);

// USAR: rutas de PRODUCTOS
app.use('/product', productRoutes);

// ----------------------------------------------------------------------------
// EJECUTAR SERVIDOR
app.listen(app.get('port'), () => {
  console.log(`Servidor ejecutado en http://localhost:${app.get('port')}`)
})
