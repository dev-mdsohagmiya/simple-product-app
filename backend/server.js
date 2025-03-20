import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";
import productRoutes from "./routes/product.route.js";
const app = express();
import path from "path";
app.use(express.json()); // allow us to accept json data in the req.body

const __dirname = path.resolve();
app.use("/api/", productRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    // this means the frontend will be run all routes without backend endpoints
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(process.env.PORT || 5000, () => {
  connectDB();
  console.log(`server is running at 5000`);
});
