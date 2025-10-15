import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// ✅ Register route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    console.log("✅ User registered:", newUser.email);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Registration error:", error.message);
    res.status(500).json({ message: "Server error during registration", error: error.message });
  }
});

// ✅ Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid email or password" });

    console.log("✅ Login success:", user.email);
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("❌ Login error:", error.message);
    res.status(500).json({ message: "Server error during login", error: error.message });
  }
});

export default router;
