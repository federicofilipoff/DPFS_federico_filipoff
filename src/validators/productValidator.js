const path = require('path');
const { check } = require('express-validator');
const { validateResult } = require(path.join(__dirname, '..', 'helpers', 'validateHelper'));
const Product = require(path.join(__dirname, '..', 'models', 'Product'));

const validateProduct = [
    check('productName')
        .exists()
        .withMessage('El nombre del producto es requerido')
        .not()
        .isEmpty()
        .withMessage('El nombre del producto no debe estar vacío')
        .isLength({ min: 5 })
        .withMessage('El nombre del producto debe tener al menos 5 caracteres'),
    check('productDescription')
        .exists()
        .withMessage('La descripción del producto es requerida')
        .not()
        .isEmpty()
        .withMessage('La descripción del producto no debe estar vacía')
        .isLength({ min: 20 })
        .withMessage('La descripción del producto debe tener al menos 20 caracteres'),
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
    check('category')
        .exists()
        .withMessage('La categoría del producto es requerida')
        .not()
        .isEmpty()
        .withMessage('La categoría del producto no debe estar vacía')
        .custom(async (category) => {
            const categoryExists = await Product.findOne({ where: { category } });
            if (!categoryExists) {
                throw new Error('La categoría no existe en la base de datos');
            }
        }),
    check('colors')
        .exists()
        .withMessage('El color del producto es requerido')
        .not()
        .isEmpty()
        .withMessage('El color del producto no debe estar vacío')
        .custom(async (color) => {
            const colorExists = await Product.findOne({ where: { color } });
            if (!colorExists) {
                throw new Error('El color no existe en la base de datos');
            }
        }),
    check('size')
        .exists()
        .withMessage('El tamaño del producto es requerido')
        .not()
        .isEmpty()
        .withMessage('El tamaño del producto no debe estar vacío')
        .custom(async (size) => {
            const sizeExists = await Product.findOne({ where: { size } });
            if (!sizeExists) {
                throw new Error('El tamaño no existe en la base de datos');
            }
        }),
    check('productPrice')
        .exists()
        .withMessage('El precio del producto es requerido')
        .not()
        .isEmpty()
        .withMessage('El precio del producto no debe estar vacío')
        .isFloat({ min: 1 })
        .withMessage('El precio del producto debe ser un número mayor que 0'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = validateProduct;
