import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"; // routes
import transactionRoutes from "./routes/transactionRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";

dotenv.config();

const app = express();

// ✅ Allow JSON requests
app.use(express.json());

// ✅ Fix CORS (important for frontend-backend connection)
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"], // add DELETE
    credentials: true,
  })
);


// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.error("MongoDB connection failed:", error));

// ✅ API Routes
app.use("/api/users", userRoutes);

app.use("/api/transactions", transactionRoutes);

app.use("/api/Budgets", budgetRoutes);


// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
