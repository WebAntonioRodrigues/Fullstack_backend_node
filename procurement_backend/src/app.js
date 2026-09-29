const express = require('express');
const apiRoutes = require('./routes/supplier_api');
const ordersRoutes = require('./routes/orders_api');

const app = express();

app.use(express.json());

app.use('/', apiRoutes);

app.use((req, res) => {
	res.status(404).json({ error: 'not found' });
});

app.use('/', ordersRoutes);

module.exports = app;
