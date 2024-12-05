module.exports = function (sequelize, DataTypes) {
  let alias = "Category";

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
    tableName: "Categories",
    timestamps: false,
  };

  const Category = sequelize.define(alias, cols, config);

  Category.associate = function (models) {
    Category.hasMany(models.Product, { foreignKey: "category_id" });
  };

  return Category;
};
