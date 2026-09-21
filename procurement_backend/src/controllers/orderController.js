const db = require('../config/db');


const getAllOrders = async (req, res) => {
	try {
		const [orders] = await db.query(`
			SELECT id, supplier_id, order_date, status FROM orders ORDER BY order_date DESC
		`);
		res.status(200).json(orders);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error fetching orders' });
	}
};


const getOrderDetail = async (req, res) => {
	const { id } = req.params;
	try {
		const [orders] = await db.query('SELECT * FROM orders WHERE id = ?', [id]);
		const order = orders[0];

		if (!order) {
			return res.status(404).json({ error: 'Order not found' });
		}

		const [items] = await db.query('SELECT material_ref, quantity, unit_price FROM orders_detail WHERE order_id = ?', [id]);

		res.status(200).json(order);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error fetching orders' });
	}
};

const createOrder = async (req, res) => {
	const { supplier_id, items } = req.body;

	if (!supplier_id || !items || items.length === 0) {
		return res.status(400).json({ error: 'supplier_id and items are required' });
	}

	try {
		const [result] = await db.query('INSERT INTO orders (supplier_id, status) VALUES (?, ?)', [supplier_id, 'Pending']);
		const orderId = result.insertId;

		for (const item of items) {
			await db.query('INSERT INTO orders_detail (order_id, material_ref, quantity, unit_price) VALUES (?, ?, ?, ?)', [orderId, item.material_ref, item.quantity, item.unit_price]);
		}

		res.status(201).json({ id: orderId, supplier_id, status: 'Pending', items });
	} catch (error) {
		res.status(500).json({ error: 'error creating order' });
	}
};

const VALID_STATUS = ['Pending', 'Sent', 'Received', 'Cancelled'];
const isPending = order.status === 'Pending';

const updateOrder = async (req, res) => {
	const { id } = req.params;
	const { status, items } = req.body;

	if (status && !VALID_STATUS.includes(status)) {
		return res.status(400).json({ error: `status must be one of: ${VALID_STATUS.join(', ')}` });
	}

	try {
		const [orders] = await db.query('SELECT * FROM orders WHERE id = ?', [id]);
		const order = orders[0];

		if (!order) {
			return res.status(404).json({ error: 'Order not found' });
        }

        if (status === 'Cancelled' && !isPending) {
			return res.status(400).json({ error: "Cannot cancel orders with a status other than 'Pending'" });
        }

        if (items && !isPending) {
			return res.status(400).json({ error: "Cannot change orders with a status other than 'Pending'" });
		}

		if (items) {
			await db.query('DELETE FROM orders_detail WHERE order_id = ?', [id]);
			for (const item of items) {
				await db.query('INSERT INTO orders_detail (order_id, material_ref, quantity, unit_price) VALUES (?, ?, ?, ?)', [id, item.material_ref, item.quantity, item.unit_price]);
			}
		}

		if (status) {
			await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
		}

		res.status(200).json({ message: 'Order updated successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error updating order' });
	}
};

module.exports = { getAllOrders, getOrderDetail, createOrder, updateOrder };
