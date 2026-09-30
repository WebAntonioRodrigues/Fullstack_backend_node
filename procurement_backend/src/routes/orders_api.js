const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const { authenticateToken, isAdmin, isEmployee } = require('../middlewares/authMiddleware');

router.get("/api/order", authenticateToken, isEmployee, orderController.getAllOrders);
router.get("/api/order/:id", authenticateToken, isEmployee, orderController.getOrderDetail);

router.post("/api/order", authenticateToken, isAdmin, orderController.createOrder);
router.put("api/order/:id", authenticateToken, isAdmin, orderController.updateOrder);

module.exports = router;