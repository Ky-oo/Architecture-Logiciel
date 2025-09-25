const { DataTypes } = require("sequelize");
const sequelize = require("../orm");

const User = sequelize.define("User", {
  firstname: DataTypes.STRING,
  lastname: DataTypes.STRING,
  email: DataTypes.STRING,
  phoneNumber: DataTypes.STRING,
  role: DataTypes.STRING,
});

module.exports = User;
