import { DataTypes } from "sequelize";
import sequelize from "../orm.ts";

const User = sequelize.define("User", {
  firstname: DataTypes.STRING,
  lastname: DataTypes.STRING,
  email: DataTypes.STRING,
  phoneNumber: DataTypes.STRING,
  role: DataTypes.STRING,
});

export default User;
