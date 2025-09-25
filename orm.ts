import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const sequelizeInstance = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default sequelizeInstance;
