const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Product = sequelize.define('Product', {
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productDescription: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    colors: {
        type: DataTypes.STRING,
        allowNull: true
    },
    productPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

module.exports = Product;
