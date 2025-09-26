import { DataTypes, Model } from "sequelize";
import sequelizeInstance from "../../../orm.ts";

export class UserModel extends Model {}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "User",
    tableName: "users",
    timestamps: false,
  }
);

export default UserModel;
