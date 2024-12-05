module.exports = function (sequelize, DataTypes) {
  let alias = "Color";

  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  };

  let config = {
    tableName: "Colors",
    timestamps: false,
  };

  const Color = sequelize.define(alias, cols, config);

  Color.associate = function (models) {
    Color.belongsToMany(models.Product, {
      through: "ProductColor",
      foreignKey: "color_id",
      otherKey: "product_id",
    });
  };

  return Color;
};
