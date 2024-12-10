const { deleteUserById } = require("../../service/userRepository");

module.exports = async function deleteUser(req, res) {
  try {
    const userId = req.session.user.id;
    const deletedCount = await deleteUserById(userId);
    if (deletedCount === 1) {
      return res.redirect("/users/logout");
    } else {
      return res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error al eliminar el usuario");
  }
};
