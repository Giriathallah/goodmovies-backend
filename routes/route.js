import express from "express";
import AuthController from "../controllers/AuthControllers.js";
import WatchlistController from "../controllers/WatchlistControllers.js";
import EmailController from "../controllers/EmailControllers.js";
import authenticateToken from "../middleware/Auth.js";
import UserController from "../controllers/UserControllers.js";

const router = express.Router();

// Authentication routes
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", authenticateToken, AuthController.login);

router.get("/user/:userId", authenticateToken, UserController.getUserById);
router.put("/user/:userId", UserController.editUsername);

// Watchlist routes with middleware
router.post("/watchlist", authenticateToken, WatchlistController.create);
router.get(
  "/watchlist/:userId",
  authenticateToken,
  WatchlistController.getByUser
);
router.delete("/watchlist", authenticateToken, WatchlistController.deleteList);

// Verify email
router.get("/verify-email", EmailController.verifyEmail);

export default router;
