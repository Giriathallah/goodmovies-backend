import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: 3306,
    dialect: "mysql",
  }
);

export default db;
