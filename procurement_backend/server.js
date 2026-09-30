const app = require('./src/app');
const dotenv = require('dotenv');

dotenv.config();

app.listen(process.env.PORT || 3001, () => {
	console.log('server running');
});
