const app = require('./src/app');
const dotenv = require('dotenv');

dotenv.config();

app.listen(process.env.PORT || 3000, () => {
	console.log('server running');
});
