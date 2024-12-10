const { findAllUsers, findUserById } = require("../../service/userRepository");

const showAllUsers = async (req, res) => {
  try {
    const data = await findAllUsers();

    const resultado = {
      count: data.length,
      users: data.map((user) => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        detail: `${req.protocol}://${req.get("host")}/users/${user.id}`,
      })),
    };

    return res.json(resultado);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

const showUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await findUserById(userId);

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    const formattedUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profileImage: `/images/users/${user.profileImage}`,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return res.status(200).json(formattedUser);
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    return res.status(500).json({
      msg: "Error en el servidor",
      error: error.message,
    });
  }
};

module.exports = { showAllUsers, showUser };
