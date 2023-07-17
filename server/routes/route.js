const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

router.get("/product", ProductController.allProducts);
router.post("/product", ProductController.createProduct);

router.get("/product/categories", ProductController.allCategories);
router.get("/product/categories/:id", ProductController.productByCategory);

router.get("/product/:id", ProductController.productById);
router.delete("/product/:id", ProductController.deleteProduct);
router.put("/product/:id", ProductController.updateProduct);

module.exports = router;
