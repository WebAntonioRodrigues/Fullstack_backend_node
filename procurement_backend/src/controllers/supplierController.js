const db = require('../config/db');

const getAllSuppliers = async (req, res) => {
	try {
		const [suppliers] = await db.query('SELECT * FROM suppliers');
		res.status(200).json(suppliers);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error fetching suppliers' });
	}
};

const getSupplierDetail = async (req, res) => {
	const { id } = req.params;
	try {
		const [suppliers] = await db.query('SELECT * FROM suppliers WHERE id = ?', [id]);
		const supplier = suppliers[0];

		if (!supplier) {
			return res.status(404).json({ error: 'Supplier not found' });
		}

		res.status(200).json(supplier);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error fetching suppliers' });
	}
};

const createSupplier = async (req, res) => {
	const { name, tax_id, contact, address } = req.body;

	if (!name || !tax_id) {
		return res.status(400).json({ error: 'name and tax_id are required' });
	}

	try {
		const [result] = await db.query('INSERT INTO suppliers (name, tax_id, contact, address) VALUES (?, ?, ?, ?)', [name, tax_id, contact || null, address || null]);
		res.status(201).json({ id: result.insertId, name, tax_id, contact, address });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error creating supplier' });
	}
};

const updateSupplier = async (req, res) => {
	const { id } = req.params;
	const { name, tax_id, contact, address } = req.body;

	try {
		const [result] = await db.query('UPDATE suppliers SET name = ?, tax_id = ?, contact = ?, address = ? WHERE id = ?', [name, tax_id, contact, address, id]);

		if (result.length === 0) {
			return res.status(404).json({ error: 'Supplier not found' });
		}

		res.status(200).json({ message: 'Supplier updated successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error updating supplier' });
	}
};


module.exports = { getAllSuppliers, getSupplierDetail, createSupplier, updateSupplier };
