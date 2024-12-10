const { validationResult } = require("express-validator");
const { hashPassword } = require("../../service/password");
const {
  isEmailInUseByOtherUser,
  updateUser,
  findUserById,
} = require("../../service/userRepository");

let editController = {
  edit: async (req, res) => {
    const userId = parseInt(req.session.user.id);

    try {
      const user = await findUserById(userId);

      if (user) {
        return res.render("users/edit", { user });
      } else {
        return res.status(404).send("Usuario no encontrado");
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Error al obtener el usuario");
    }
  },

  update: async (req, res) => {
    const userId = req.session.user.id;

    // Validar datos
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const { firstName, lastName, email, password } = req.body;
    const updates = {};

    if (firstName) updates.firstName = firstName;
    if (lastName) updates.lastName = lastName;
    if (email) updates.email = email;
    if (req.file) updates.profileImage = req.file.filename;
    if (password) updates.password = hashPassword(password);

    try {
      if (email) {
        const existingUser = await isEmailInUseByOtherUser(email, userId);
        if (existingUser) {
          return res
            .status(400)
            .send("Error: El email ya está en uso por otro usuario.");
        }
      }

      // Actualizar los datos del usuario
      await updateUser(userId, updates);

      // Actualizar la sesión del usuario
      Object.assign(req.session.user, updates);
      return res.redirect(`/users/${userId}`);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      return res.status(500).send("Error al actualizar el usuario");
    }
  },
};

module.exports = editController;
