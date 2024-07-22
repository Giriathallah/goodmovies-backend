import { DataTypes } from "sequelize";
import db from "../config/conn.js";
import User from "./User.js";

const Watchlist = db.define(
  "Watchlist",
  {
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    movie_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    movie_poster_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vote_average: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

Watchlist.belongsTo(User, { foreignKey: "userId", as: "user" });

export default Watchlist;
