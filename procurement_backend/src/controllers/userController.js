const db = require('../config/db');

const getAllEmployees = async (req, res) => {
	try {
		const [employees] = await db.query('select id, name, email, role from users where role = ?', ['employee']);
		res.status(200).json(employees);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error listing users' });
	}
};
const deleteUser = async (req, res) => {
    const { id } = req.params;
    
    	if (parseInt(id) === req.user.id) {
				return res.status(400).json({ error: 'Cannot delete your own account!' });
			}
	try {
		const [result] = await db.query('delete from users where id = ?', [id]);

		if (result.affectedRows === 0) {
			return res.status(404).json({ error: 'User not found' });
		}

		res.status(200).json({ message: 'User successfully removed!' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error removing user!' });
	}
};

module.exports = { getAllEmployees, deleteUser };
