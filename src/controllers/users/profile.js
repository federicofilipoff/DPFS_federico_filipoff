const { findUserById } = require("../../service/userRepository");

module.exports = async function show(req, res) {
  const userId = parseInt(req.session.user.id);

  try {
    const user = await findUserById(userId);

    if (user) {
      return res.render("users/profile", { user });
    } else {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
