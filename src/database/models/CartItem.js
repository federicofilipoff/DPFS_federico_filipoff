module.exports = function (sequelize, DataTypes) {
  let alias = "CartItem";

  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cart_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "ShoppingCart",
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Products",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  };

  let config = {
    tableName: "CartItems",
    timestamps: true,
  };

  const CartItem = sequelize.define(alias, cols, config);

  CartItem.associate = function (models) {
    CartItem.belongsTo(models.ShoppingCart, { foreignKey: "cart_id" });
    CartItem.belongsTo(models.Product, { foreignKey: "product_id" });
  };

  return CartItem;
};
