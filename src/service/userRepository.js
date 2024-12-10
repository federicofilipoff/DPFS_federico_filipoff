const db = require("../database/models");

const findUserByEmail = async (email) => {
  try {
    return await db.User.findOne({ where: { email } });
  } catch (error) {
    console.error("Error al buscar usuario por email:", error);
    throw new Error("Error en la base de datos");
  }
};

const findUserById = async (userId) => {
  try {
    return await db.User.findByPk(userId);
  } catch (error) {
    console.error("Error al buscar usuario por ID:", error);
    throw new Error("Error en la base de datos");
  }
};

const findAllUsers = async () => {
  try {
    return await db.User.findAll();
  } catch (error) {
    console.error("Error al buscar datos:", error);
    throw new Error("Error en la base de datos");
  }
};

const createUser = async (nuevoUsuario) => {
  try {
    return await db.User.create(nuevoUsuario);
  } catch (error) {
    console.error("Error al buscar usuarios:", error);
    throw new Error("Error en la base de datos");
  }
};

const deleteUserById = async (userId) => {
  try {
    return await db.User.destroy({ where: { id: userId } });
  } catch (error) {
    console.error("Error al buscar usuario por Id:", error);
    throw new Error("Error en la base de datos");
  }
};

// Usado para el controlador "update"
const isEmailInUseByOtherUser = async (email, userId) => {
  try {
    return await db.User.findOne({
      where: {
        email: email,
        id: { [db.Sequelize.Op.ne]: userId },
      },
    });
  } catch (error) {
    console.error("Error al buscar usuario por email:", error);
    throw new Error("Error en la base de datos");
  }
};

const updateUser = async (userId, updates) => {
  try {
    return await db.User.update(updates, { where: { id: userId } });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw new Error("Error en la base de datos");
  }
};

module.exports = {
  findUserByEmail,
  findUserById,
  findAllUsers,
  createUser,
  deleteUserById,
  isEmailInUseByOtherUser,
  updateUser,
};
