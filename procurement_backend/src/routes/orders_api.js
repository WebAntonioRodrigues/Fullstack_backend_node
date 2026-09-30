const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const { authenticateToken, isAdmin, hasRole } = require('../middlewares/authMiddleware');

router.get('/api/orders', authenticateToken, hasRole('admin', 'employee'), orderController.getAllOrders);
router.get('/api/orders/:id', authenticateToken, hasRole('admin', 'employee'), orderController.getOrderDetail);

router.post('/api/orders', authenticateToken, isAdmin, orderController.createOrder);
router.put('/api/orders/:id', authenticateToken, isAdmin, orderController.updateOrder);

module.exports = router;
