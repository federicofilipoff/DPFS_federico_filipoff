const { body } = require("express-validator");
const db = require("../database/models");
const path = require("path");

const validateName = body("name")
  .notEmpty()
  .withMessage("El nombre es obligatorio.")
  .isLength({ min: 5 })
  .withMessage("El nombre debe tener al menos 5 caracteres.");

const validateDescription = body("description")
  .notEmpty()
  .withMessage("La descripción es obligatoria.")
  .isLength({ min: 20 })
  .withMessage("La descripción debe tener al menos 20 caracteres.");

const validateImage = body("image").custom((value, { req }) => {
  if (req.file) {
    const validExtensions = [".jpg", ".jpeg", ".png", ".gif"];
    const ext = path.extname(req.file.originalname).toLowerCase();
    if (!validExtensions.includes(ext)) {
      throw new Error("Solo se permiten archivos JPG, JPEG, PNG, o GIF");
    }
  }
  return true;
});

const validatePrice = body("price")
  .notEmpty()
  .withMessage("El precio es obligatorio.")
  .isFloat({ min: 0.01 })
  .withMessage("El precio debe ser mayor a 0.");

const validateCategoryId = body("category")
  .notEmpty()
  .withMessage("La categoría es obligatoria.")
  .custom(async (value) => {
    const categoryExists = await db.Category.findByPk(value);
    if (!categoryExists) {
      throw new Error("La categoría especificada no existe.");
    }
    return true;
  });

const validateBrandId = body("brand")
  .notEmpty()
  .withMessage("La marca es obligatoria.")
  .custom(async (value) => {
    const brandExists = await db.Brand.findByPk(value);
    if (!brandExists) {
      throw new Error("La marca especificada no existe.");
    }
    return true;
  });

const validateColorIds = body("colors").custom(async (values) => {
  if (values) {
    for (const colorId of values) {
      const colorExists = await db.Color.findByPk(colorId);
      if (!colorExists) {
        throw new Error("Uno o más colores especificados no existen.");
      }
    }
    return true;
  }
});

const storeValidator = [
  validateName,
  validateDescription,
  validateImage,
  validatePrice,
  validateCategoryId,
  validateBrandId,
  validateColorIds,
];

const updateValidator = [
  validateName.optional(),
  validateDescription.optional(),
  validateImage,
  validatePrice,
  validateCategoryId,
  validateBrandId,
  validateColorIds,
];

module.exports = {
  storeValidator,
  updateValidator,
};
