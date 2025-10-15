import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  date: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, enum: ["Income", "Expense"], required: true },
  amount: { type: Number, required: true },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
