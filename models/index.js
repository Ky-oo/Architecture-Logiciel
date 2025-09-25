const sequelize = require("../orm");
const User = require("./User");

//sequelize.sync({ alter: true });

module.exports = {
  User,
};
