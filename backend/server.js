import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";
import productRoutes from "./routes/product.route.js";
const app = express();
app.use(express.json()); // allow us to accept json data in the req.body

app.use("/api/", productRoutes);
app.listen(process.env.PORT || 5000, () => {
  connectDB();
  console.log(`server is running at 5000`);
});
