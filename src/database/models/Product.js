module.exports = function(sequelize, DataTypes) {
    
    let alias = 'Product';

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        image: {
            type: DataTypes.STRING(255)
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Categories',
                key: 'id'
            }
        },
        brand_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Brands',
                key: 'id'
            }
        },
        officialWeb: {
            type: DataTypes.STRING(255)
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        size: {
            type: DataTypes.STRING(255)
        }
    };

    let config = {
        tableName: 'Products',
        timeStamps: true, // createAt, updatedAt
        underscored: false // yo los escribí usando "camelCase" 
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {
        Product.belongsTo(models.Category, { foreignKey: 'category_id' });
        Product.belongsTo(models.Brand, { foreignKey: 'brand_id' });
        Product.belongsToMany(models.Color, {
            through: 'ProductColor',
            foreignKey: 'product_id',
            otherKey: 'color_id'
        });
        Product.hasMany(models.CartItem, { foreignKey: 'product_id' });
    };

    return Product;
};
