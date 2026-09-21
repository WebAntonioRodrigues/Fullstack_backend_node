const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const usersController = require('../controllers/userController');
const { authenticateToken, isAdmin, isEmployee } = require('../middlewares/authMiddleware');

router.post('/api/register', authController.register);
router.post('/api/login', authController.login);

router.get('/api/employees', authenticateToken, isAdmin, usersController.getAllEmployees);
router.delete('/api/users/:id', authenticateToken, isAdmin, usersController.deleteUser);

module.exports = router;
