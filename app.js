const express = require('express')
const app = express();
const port = 3000;

// ----------------------------------------------------------------------------
// Middleware para procesar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para utilizar PUT o DELETE
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Configurar EJS como el motor de vistas
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Servir archivos estáticos
app.use(express.static('./public'));

// Importar RUTAS
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');

// Importar MODELOS de datos
const User = require('./src/models/User');
const Product = require('./src/models/Product');

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
app.listen(port, () => {
  console.log(`Servidor ejecutado en http://localhost:${port}`)
})
