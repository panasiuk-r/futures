import express from 'express';
import cors from 'cors'

import router from './routes/api';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

export default app;