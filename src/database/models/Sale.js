module.exports = function (sequelize, DataTypes) {
  let alias = "Sale";

  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    sale_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  };

  let config = {
    tableName: "Sales",
    timestamps: false,
  };

  const Sale = sequelize.define(alias, cols, config);

  Sale.associate = function (models) {
    Sale.belongsTo(models.Product, { foreignKey: "product_id" });
  };

  return Sale;
};
