import dotenv from 'dotenv';

import { checkCon, sequelize } from './database/connection';
import app from './app'

dotenv.config({ path: './src/config.env' });

checkCon();

const PORT = process.env.SERVER_PORT || 3001;
sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`app on port ${PORT}`)
	})
})