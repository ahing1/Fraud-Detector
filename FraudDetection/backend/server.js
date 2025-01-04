import express from 'express';
import cors from 'cors'
import constructorMethod from './routes/index.js';
import { connectDB } from './config/db.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
app.use(cors());

connectDB();

constructorMethod(app);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;