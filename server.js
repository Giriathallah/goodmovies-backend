import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./config/conn.js";
import router from "./routes/route.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const corsOptions = {
  origin: "https://goodmovies-two.vercel.app", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", router);

const PORT = process.env.PORT;

db.sync()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
