import express from "express";
import {
  addProducts,
  deleteProducts,
  getProducts,
  updateProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/products/", getProducts);
router.post("/products/", addProducts);

router.put("/products/:id", updateProducts);

router.delete("/products/:id", deleteProducts);
export default router;
