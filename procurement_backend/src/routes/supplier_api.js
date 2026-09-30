const express = require('express');
const router = express.Router();

const supplierController = require('../controllers/supplierController');
const { authenticateToken, isAdmin, hasRole } = require('../middlewares/authMiddleware');

router.get('/api/suppliers', authenticateToken, hasRole('admin', 'employee'), supplierController.getAllSuppliers);
router.get('/api/suppliers/:id', authenticateToken, hasRole('admin', 'employee'), supplierController.getSupplierDetail);

router.post('/api/suppliers', authenticateToken, isAdmin, supplierController.createSupplier);
router.put('/api/suppliers/:id', authenticateToken, isAdmin, supplierController.updateSupplier);

module.exports = router;
