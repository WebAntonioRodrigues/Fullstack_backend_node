const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return res.status(401).json({ error: 'Unhautorized' });
	}

	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decodedToken;
		next();
	} catch (error) {
		return res.status(403).json({ error: 'Invalid Token' });
	}
};

const isAdmin = (req, res, next) => {
	if (!req.user || req.user.role !== 'admin') {
		return res.status(403).json({ error: 'Unauthorized area' });
	}
	next();
};

const isEmployee = (req, res, next) => {
	if (!req.user || req.user.role !== 'employee') {
		return res.status(403).json({ error: 'Unauthorized area' });
	}
	next();
};

module.exports = { authenticateToken, isAdmin, isEmployee };
