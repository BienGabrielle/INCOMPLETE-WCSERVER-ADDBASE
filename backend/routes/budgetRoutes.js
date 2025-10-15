import express from "express";
import Budget from "../models/Budget.js";

const router = express.Router();

// Get all budgets
router.get("/", async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch budgets" });
  }
});

// Add a budget
router.post("/", async (req, res) => {
  console.log("📩 Received data:", req.body);
  try {
    const { category, limit, spent } = req.body;
    // Ensure spent is always a number (default to 0 if not provided)
    const newBudget = new Budget({ category, limit, spent: spent ?? 0 });
    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (err) {
    console.error("❌ Failed to add budget:", err);
    res.status(500).json({ message: "Failed to add budget", error: err.message });
  }
});

// Delete a budget
router.delete("/:id", async (req, res) => {
  try {
    await Budget.findByIdAndDelete(req.params.id);
    res.json({ message: "Budget deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete budget" });
  }
});

export default router;
