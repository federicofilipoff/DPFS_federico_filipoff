const { Sequelize } = require('sequelize');

// Conexión con la base de datos
const sequelize = new Sequelize({
  dialect: 'sqlite',
  // storage: '../src/data/datos.db'
  // storage: 'datos.db'
  storage: './src/data/datos.db'
});

// Verificar conexión
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos: exitosa.');
  })
  .catch(err => {
    console.error('Conexión a la base de datos: fallida.', err);
  });

module.exports = sequelize;
