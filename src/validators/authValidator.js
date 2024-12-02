const { body } = require("express-validator");
const db = require("../database/models");
const bcrypt = require("bcrypt");

const authValidator = [
  body("email")
    .notEmpty()
    .withMessage("El correo es obligatorio.")
    .isEmail()
    .withMessage("El correo debe ser válido.")
    .custom(async (value) => {
      const user = await db.User.findOne({ where: { email: value } });
      if (!user) {
        throw new Error("El correo no está registrado.");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria.")
    .custom(async (value, { req }) => {
      const user = await db.User.findOne({ where: { email: req.body.email } });
      if (user && !bcrypt.compareSync(value, user.password)) {
        throw new Error("La contraseña es incorrecta.");
      }
      return true;
    }),
];

module.exports = authValidator;
