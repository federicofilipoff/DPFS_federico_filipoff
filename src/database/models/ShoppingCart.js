module.exports = function (sequelize, DataTypes) {
  let alias = "ShoppingCart";

  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  };

  let config = {
    tableName: "ShoppingCart",
    timestamps: true,
  };

  const ShoppingCart = sequelize.define(alias, cols, config);

  ShoppingCart.associate = function (models) {
    ShoppingCart.belongsTo(models.User, { foreignKey: "user_id" });
    ShoppingCart.hasMany(models.CartItem, { foreignKey: "cart_id" });
  };

  return ShoppingCart;
};
