import express from 'express';
import cors from 'cors'
import constructorMethod from './routes/index.js';
import { connectDB } from './config/db.js';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(morgan('dev'));

connectDB();

constructorMethod(app);
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Your routes will be running on http://localhost:${PORT}`);
  });
}

export default app;