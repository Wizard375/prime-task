import express from "express";
import { body } from "express-validator";
import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  registerUser,
);

router.post("/login", loginUser);

router.get("/profile", authMiddleware, getProfile);

export default router;
