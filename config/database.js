const { Sequelize } = require('sequelize');
const path = require('path');

// Conexión con la base de datos
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'src', 'data', 'datos.db')
});

// Verificar conexión
sequelize.authenticate()
  .then(() => {
    console.log('> Conexión a la base de datos: [✓]');
  })
  .catch(err => {
    console.error('> Conexión a la base de datos: [X]', err);
  });

module.exports = sequelize;
