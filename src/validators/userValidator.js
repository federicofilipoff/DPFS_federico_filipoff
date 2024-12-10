const { body } = require("express-validator");
const db = require("../database/models");

const validateFirstName = body("firstName")
  .notEmpty()
  .withMessage("El nombre es obligatorio")
  .isLength({ min: 2 })
  .withMessage("El nombre debe tener al menos 2 caracteres");

const validateLastName = body("lastName")
  .notEmpty()
  .withMessage("El apellido es obligatorio")
  .isLength({ min: 2 })
  .withMessage("El apellido debe tener al menos 2 caracteres");

const validateCreateEmail = body("email")
  .notEmpty()
  .withMessage("El email es obligatorio")
  .isEmail()
  .withMessage("Debes ingresar un formato de correo válido")
  .custom(async (value) => {
    const user = await db.User.findOne({ where: { email: value } });
    if (user) {
      throw new Error("Este email ya está registrado");
    }
    return true;
  });

const validateProfileImage = body("profileImage").custom((value, { req }) => {
  if (!req.file) return true;
  const fileTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  if (!fileTypes.includes(req.file.mimetype)) {
    throw new Error("Solo se permiten archivos JPG, JPEG, PNG, o GIF");
  }
  return true;
});

const validateEditEmail = body("email")
  .notEmpty()
  .withMessage("El email es obligatorio")
  .isEmail()
  .withMessage("Debes ingresar un formato de correo válido")
  .custom(async (value, { req }) => {
    const currentUser = await db.User.findByPk(req.params.id);
    if (currentUser) {
      if (currentUser.email !== value) {
        // Verifica si el correo es diferente al actual
        const user = await db.User.findOne({ where: { email: value } });
        if (user) {
          throw new Error("Este email ya está registrado por otro usuario");
        }
      }
    }
    return true;
  });

const validateCreatePassword = body("password")
  .notEmpty()
  .withMessage("La contraseña es obligatoria")
  .isLength({ min: 8 })
  .withMessage("La contraseña debe tener al menos 8 caracteres")
  .matches(/[A-Z]/)
  .withMessage("Debe contener al menos una letra mayúscula")
  .matches(/[a-z]/)
  .withMessage("Debe contener al menos una letra minúscula")
  .matches(/[0-9]/)
  .withMessage("Debe contener al menos un número")
  .matches(/[\W_]/)
  .withMessage("Debe contener al menos un carácter especial");

const validateEditPassword = body("passwordEdit")
  .optional()
  .if(body("passwordEdit").notEmpty())
  .isLength({ min: 8 })
  .withMessage("La contraseña debe tener al menos 8 caracteres")
  .matches(/[A-Z]/)
  .withMessage("Debe contener al menos una letra mayúscula")
  .matches(/[a-z]/)
  .withMessage("Debe contener al menos una letra minúscula")
  .matches(/[0-9]/)
  .withMessage("Debe contener al menos un número")
  .matches(/[\W_]/)
  .withMessage("Debe contener al menos un carácter especial");

const userValidator = {
  store: [
    validateFirstName,
    validateLastName,
    validateCreateEmail,
    validateCreatePassword,
    validateProfileImage,
  ],

  update: [
    validateFirstName.optional().trim(),
    validateLastName.optional().trim(),
    validateEditEmail,
    validateEditPassword.optional().trim(),
    validateProfileImage,
  ],
};

module.exports = userValidator;
