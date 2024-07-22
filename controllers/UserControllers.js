// controllers/UserController.js
import User from "../models/User.js";

const UserController = {
  getUserById: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.userId, {
        attributes: ["username", "email", "createdAt"],
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const { username, email, createdAt } = user;
      const year = createdAt.getFullYear(); // Mengambil tahun dari createdAt
      res.json({ username, email, year });
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
    }
  },

  editUsername: async (req, res) => {
    try {
      const { userId } = req.params;
      const { newUsername } = req.body;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.username = newUsername;
      await user.save();

      res.json({
        message: "Username updated successfully",
        username: user.username,
      });
    } catch (error) {
      res.status(500).json({ message: "Error updating username", error });
    }
  },
};

export default UserController;
