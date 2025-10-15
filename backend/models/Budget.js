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
  timestamps: true, // optional, adds createdAt & updatedAt
});


// Note: MongoDB documents use '_id' as the primary key. Frontend should reference '_id' for budget objects.
const Budgets = mongoose.model("Budgets", budgetSchema, "Budgets");

export default Budgets;
