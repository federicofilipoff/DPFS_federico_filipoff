const { findUserByEmail, createUser } = require("../../service/userRepository");
const { hashPassword } = require("../../service/password");
const { validationResult } = require("express-validator");

const createController = {
  create: (req, res) => {
    return res.render("users/register");
  },

  store: async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const { firstName, lastName, email, password, category } = req.body;

    try {
      const user = await findUserByEmail(email);
      if (user) {
        return res.status(400).json({ msg: "El correo ya fue registrado." });
      }

      const hashedPassword = hashPassword(password);

      const nuevoUsuario = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        category,
        profileImage: req.file ? req.file.filename : null,
      };

      await createUser(nuevoUsuario);

      return res.redirect("/users/login");
    } catch (error) {
      console.error("Error al crear usuario:", error);
      return res.status(500).json({ msg: "Error interno del servidor" });
    }
  },
};

module.exports = createController;
