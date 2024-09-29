const path = require('path');
const { check } = require('express-validator');
const { validateResult } = require(path.join(__dirname, '..', 'helpers', 'validateHelper'));
const User = require(path.join(__dirname, '..', 'models', 'User'));

const validateLogin = [
    check('email')
        .exists()
        .withMessage('El email es requerido')
        .not()
        .isEmpty()
        .withMessage('El email no debe estar vacío')
        .isEmail()
        .withMessage('Debe ser un email válido')
        .custom(async (email) => {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw new Error('El email no existe en la base de datos');
            }
        }),
    check('password')
        .exists()
        .withMessage('La contraseña es requerida')
        .not()
        .isEmpty()
        .withMessage('La contraseña no debe estar vacía')
        .custom(async (password, { req }) => {
            const user = await User.findOne({ where: { email: req.body.email } });
            if (user && !(await user.validPassword(password))) {
                throw new Error('La contraseña no coincide');
            }
        }),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validateRegister = [
    check('firstName')
        .exists()
        .withMessage('El nombre es requerido')
        .not()
        .isEmpty()
        .withMessage('El nombre no debe estar vacío')
        .isLength({ min: 2 })
        .withMessage('El nombre debe tener al menos 2 caracteres'),
    check('lastName')
        .exists()
        .withMessage('El apellido es requerido')
        .not()
        .isEmpty()
        .withMessage('El apellido no debe estar vacío')
        .isLength({ min: 2 })
        .withMessage('El apellido debe tener al menos 2 caracteres'),
    check('email')
        .exists()
        .withMessage('El email es requerido')
        .not()
        .isEmpty()
        .withMessage('El email no debe estar vacío')
        .isEmail()
        .withMessage('Debe ser un email válido')
        .custom(async (email) => {
            const user = await User.findOne({ where: { email } });
            if (user) {
                throw new Error('El email ya está registrado');
            }
        }),
    check('password')
        .exists()
        .withMessage('La contraseña es requerida')
        .not()
        .isEmpty()
        .withMessage('La contraseña no debe estar vacía')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/(?=.*[a-z])/)
        .withMessage('La contraseña debe contener al menos una letra minúscula')
        .matches(/(?=.*[A-Z])/)
        .withMessage('La contraseña debe contener al menos una letra mayúscula')
        .matches(/(?=.*\d)/)
        .withMessage('La contraseña debe contener al menos un número')
        .matches(/(?=.*[@$!%*?&])/)
        .withMessage('La contraseña debe contener al menos un carácter especial'),
    check('image')
        .custom((value, { req }) => {
            if (!req.file) {
                throw new Error('La imagen es requerida');
            }
            const filetypes = /jpeg|jpg|png|gif/;
            const mimetype = filetypes.test(req.file.mimetype);
            const extname = filetypes.test(path.extname(req.file.originalname).toLowerCase());
            if (!mimetype || !extname) {
                throw new Error('El archivo debe ser una imagen válida (JPG, JPEG, PNG, GIF)');
            }
            return true;
        }),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

// EXPORTAR VALIDACIONES
module.exports = {
    validateLogin,
    validateRegister
};
