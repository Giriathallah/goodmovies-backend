import { randomBytes } from "crypto";
import { createTransport } from "nodemailer";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const transporter = createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const EmailController = {
  sendVerificationEmail: async (user) => {
    try {
      const token = randomBytes(20).toString("hex");
      user.verificationToken = token;
      await user.save();

      const mailOptions = {
        from: {
          name: "goodmovies",
          address: process.env.EMAIL_USER,
        },
        to: user.email,
        subject: "Email Verification",
        text: `Please verify your email by clicking the link: \n${process.env.FRONTEND_HOST}/verify-email?token=${token}`,
      };

      transporter.sendMail(mailOptions);
      // console.log(`Verification email sent to ${user.email}`);
    } catch (error) {
      console.error(`Failed to send verification email: ${error.message}`);
      throw new Error("Failed to send verification email");
    }
  },

  verifyEmail: async (req, res) => {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    try {
      const user = await User.findOne({ where: { verificationToken: token } });
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }

      user.isVerified = true;
      user.verificationToken = null;
      await user.save();

      res.status(200).json({ message: "Email verified successfully" });
    } catch (err) {
      console.error(`Error verifying email: ${err.message}`);
      res.status(500).json({ error: err.message });
    }
  },
};

export default EmailController;
