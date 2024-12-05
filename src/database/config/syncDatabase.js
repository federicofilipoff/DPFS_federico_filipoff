const { Sequelize } = require("sequelize");
const config =
  require("../config/config")[process.env.NODE_ENV || "development"];

const createDatabaseIfNotExists = async () => {
  try {
    // Crear una conexión sin especificar la base de datos
    const sequelize = new Sequelize("", config.username, config.password, {
      host: config.host,
      dialect: config.dialect,
    });

    // Crear la base de datos si no existe
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${config.database};`);
    console.log(`Base de datos "${config.database}" verificada o creada.`);

    // Cerrar la conexión temporal
    await sequelize.close();
  } catch (error) {
    console.error("Error al verificar o crear la base de datos:", error);
    process.exit(1);
  }
};

const syncDatabase = async () => {
  try {
    // Verificar o crear la base de datos
    await createDatabaseIfNotExists();

    // Importar la instancia configurada de Sequelize
    const { sequelize } = require("../models");

    // Sincronizar las tablas
    await sequelize.sync({ force: true });
    console.log("Tablas sincronizadas correctamente.");
  } catch (error) {
    console.error("Error al sincronizar la base de datos:", error);
  } finally {
    process.exit();
  }
};

syncDatabase();
