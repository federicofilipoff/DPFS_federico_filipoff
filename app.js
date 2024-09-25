const express = require('express')
const path = require('path');
const app = express();

// ----------------------------------------------------------------------------
// CONFIGURACIONES
app.set('port', 3000)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// ----------------------------------------------------------------------------
// Middleware para procesar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para utilizar PUT o DELETE
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// ----------------------------------------------------------------------------
// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Importar RUTAS
const userRoutes = require(path.join(__dirname, 'src', 'routes', 'userRoutes'));
const productRoutes = require(path.join(__dirname, 'src', 'routes', 'productRoutes'));

// Importar MODELOS de datos
const User = require(path.join(__dirname, 'src', 'models', 'User'));
const Product = require(path.join(__dirname, 'src', 'models', 'Product'));

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
