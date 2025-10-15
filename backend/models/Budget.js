import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true,
  },
  limit: {
    type: Number,
    required: true,
  },
  spent: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true, // createdAt & updatedAt
});


// Use '_id' for budget ID
const Budgets = mongoose.model("Budgets", budgetSchema, "Budgets");

export default Budgets;
