const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
	const { name, email, password, role } = req.body;
	try {
		const hashPassword = await bcrypt.hash(password, 10);
		await db.query('insert into users (name,email,password,role) values(?,?,?,?)', [name, email, hashPassword, role]);
		res.status(201).json({ message: 'User successfully registered!' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error on register' });
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const [users] = await db.query('select * from users where email = ?', [email]);
		const user = users[0];

		if (!user) {
			return res.status(401).json({ error: 'Invalid login ' });
		}

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			return res.status(401).json({ error: 'Invalid login ' });
		}

        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

		res.status(200).json({ message: 'Successfull login', token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Login failed' });
	}
};

module.exports = { register, login };
