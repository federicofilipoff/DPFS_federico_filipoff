module.exports = function (sequelize, DataTypes) {
  let alias = "User";

  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
    profileImage: {
      type: DataTypes.STRING(255),
    },
  };

  let config = {
    tableName: "Users",
    timestamps: true, // createAt, updatedAt
    underscored: false, // yo los escribí usando "camelCase"
  };

  const User = sequelize.define(alias, cols, config);

  User.associate = function (models) {
    User.hasMany(models.ShoppingCart, { foreignKey: "user_id" });
  };

  return User;
};
