const express = require('express');
const supplierRoutes = require('./routes/supplier_api');
const ordersRoutes = require('./routes/orders_api');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());

app.use('/', supplierRoutes);
app.use('/', ordersRoutes);
app.use('/', authRoutes);

app.use((req, res) => {
	res.status(404).json({ error: 'not found' });
});

module.exports = app;
