import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./config/conn.js";
import router from "./routes/route.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", router);

const PORT = process.env.PORT;

db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
