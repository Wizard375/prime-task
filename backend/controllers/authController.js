import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists)
    return res.status(400).json({
      message: "User already exists",
    });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
  });

  res.status(201).json({
    token: generateToken(user._id),
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({
      message: "Invalid credentials",
    });

  const match = await bcrypt.compare(password, user.password);

  if (!match)
    return res.status(400).json({
      message: "Invalid credentials",
    });

  res.json({
    token: generateToken(user._id),
  });
};

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  res.json(user);
};
