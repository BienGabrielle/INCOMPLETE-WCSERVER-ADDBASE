import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

// Get all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
});

// Add new transaction
router.post("/", async (req, res) => {
  try {
    const { date, category, type, amount } = req.body;
    const newTx = new Transaction({ date, category, type, amount });
    await newTx.save();

    // Update related budget's spent value if type is 'Expense'
    if (type === "Expense") {
      const Budget = (await import("../models/Budget.js")).default;
      await Budget.findOneAndUpdate(
        { category },
        { $inc: { spent: amount } }
      );
    }
    res.status(201).json(newTx);
  } catch (err) {
    res.status(500).json({ message: "Failed to add transaction" });
  }
});

// Delete transaction
router.delete("/:id", async (req, res) => {
  try {
    // Find the transaction to get its details
    const tx = await Transaction.findById(req.params.id);
    if (!tx) return res.status(404).json({ message: "Transaction not found" });

    await Transaction.findByIdAndDelete(req.params.id);

    // Update related budget's spent value if type is 'Expense'
    if (tx.type === "Expense") {
      const Budget = (await import("../models/Budget.js")).default;
      await Budget.findOneAndUpdate(
        { category: tx.category },
        { $inc: { spent: -tx.amount } }
      );
    }
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete transaction" });
  }
});

export default router;
