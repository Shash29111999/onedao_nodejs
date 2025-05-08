const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const auth = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

router.post("/", auth, authorizeRoles("admin"), productController.createProduct);
router.put("/:id", auth, authorizeRoles("admin"), productController.updateProduct);
router.delete("/:id", auth, authorizeRoles("admin"), productController.deleteProduct);

router.get("/", auth, authorizeRoles("admin", "viewer"), productController.getAllProducts);
router.get("/:id", auth, authorizeRoles("admin", "viewer"), productController.getProductById);

module.exports = router;
