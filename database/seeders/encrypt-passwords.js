const bcrypt = require('bcrypt');

// Exportar el seeder como un módulo
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Lista de usuarios con contraseñas que deseas encriptar
    const users = [
      { email: 'jose.perez@gmail.com', password: '123' },
      { email: 'maria.lopez@gmail.com', password: '123' },
      { email: 'carlos.gomez@gmail.com', password: '123' }
    ];

    // Encriptar contraseñas y actualizar los usuarios
    for (const user of users) {
      const hashedPassword = bcrypt.hashSync(user.password, 10);
      await queryInterface.bulkUpdate(
        'Users', // Nombre de la tabla
        { password: hashedPassword },
        { email: user.email } // Condición para encontrar al usuario
      );
    }

    console.log("Contraseñas encriptadas y actualizadas correctamente.");
  },

  down: async (queryInterface, Sequelize) => {
    console.log("Reversión no implementada para este seeder.");
  }
};
