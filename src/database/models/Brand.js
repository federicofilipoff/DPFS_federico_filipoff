module.exports = function (sequelize, DataTypes) {
  let alias = "Brand";

  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  };

  let config = {
    tableName: "Brands",
    timestamps: false,
  };

  const Brand = sequelize.define(alias, cols, config);

  Brand.associate = function (models) {
    Brand.hasMany(models.Product, { foreignKey: "brand_id" });
  };

  return Brand;
};
