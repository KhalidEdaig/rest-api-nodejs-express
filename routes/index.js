// import express
import express from "express";
// import controllers
import {
  deleteProduct,
  getAllVariants,
  getProductById,
  getProducts,
  saveProduct,
  saveVariant,
  updateProduct,
} from "../controllers/productController.js";

// express router
const router = express.Router();

// Route get All Products
router.get("/", getProducts);
// Route get single Product
router.get("/:id", getProductById);
// Route CREATE Product
router.post("/", saveProduct);
// Route UPDATE Product
router.patch("/:id", updateProduct);
// Route DELETE Product
router.delete("/:id", deleteProduct);

// Route get All Variants
router.get("/:id/variants", getAllVariants);
// Route Add Variant
router.post("/:id/variants", saveVariant);

// export router
export default router;
