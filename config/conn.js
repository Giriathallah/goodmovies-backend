import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: isProduction ? false : console.log,
    dialectModule: mysql,
    dialectOptions: {
      connectTimeout: 60000, // Increase timeout to 60 seconds
    },
  }
);

export default db;
