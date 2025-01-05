import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.post('/', async (req, res) => {
    try{
        const response = await axios.post('http://127.0.0.1:8000/predict', req.body);
        return res.json(response.data);
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to get prediction from ML model' });
    }
});

export default router;