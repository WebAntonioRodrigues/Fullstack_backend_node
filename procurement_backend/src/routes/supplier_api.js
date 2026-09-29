const express = require('express');
const router = express.Router();

const orderController = require('../controllers/supplierController');
const { authenticateToken, isAdmin, isEmployee } = require('../midlewares/authMiddleware');

router.get("/api/supplier", authenticateToken, isEmployee, orderController.getAllSuppliers);
router.get("/api/supplier/:id", authenticateToken, isEmployee, orderController.getSupplierDetail);

router.post("/api/supplier", authenticateToken, isAdmin, orderController.createSupplier);
router.put("api/supplier/:id", authenticateToken, isAdmin, orderController.updateSupplier);

module.exports = router;