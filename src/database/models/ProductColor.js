module.exports = function (sequelize, DataTypes) {
  let alias = "ProductColor";

  let cols = {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "Products",
        key: "id",
      },
    },
    color_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "Colors",
        key: "id",
      },
    },
  };

  let config = {
    tableName: "Product_Colors",
    timestamps: false,
  };

  let ProductColor = sequelize.define(alias, cols, config);

  // Definir las asociaciones
  ProductColor.associate = function (models) {
    ProductColor.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });
    ProductColor.belongsTo(models.Color, {
      foreignKey: "color_id",
      as: "color",
    });
  };

  return ProductColor;
};
