import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import EmailController from "./EmailControllers.js";
import dotenv from "dotenv";
dotenv.config();

const { sign } = jwt;
const AuthController = {
  register: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const hashedPassword = await hash(password, 10);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      await EmailController.sendVerificationEmail(user);

      res
        .status(201)
        .json({ message: "User registered. Verification email sent." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      if (!user.isVerified) {
        return res.status(400).json({ message: "Email not verified" });
      }

      const isMatch = await compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const token = sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      res.status(200).json({ userId: user.id, token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      // Here we would invalidate the token, if we're using token blacklisting
      res.status(200).json({ message: "Logout successful" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default AuthController;
