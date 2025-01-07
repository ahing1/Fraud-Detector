import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.post('/', async (req, res) => {
    try{
        //input validation
        if(!req.body && Object.keys(req.body).length !== 30){
            return res.status(400).json({ error: 'Invalid input. Please provide all features.' });
        }

        const response = await axios.post('http://127.0.0.1:8000/predict', req.body); // Send the request to the ML model
        return res.json(response.data);
    }
    catch (error) {
        if (error.response) {
            // Forward Flask's error message and status code to the frontend
            return res.status(400).json(error.response.data);
        }

        console.error('Error in backend:', error.message);
        return res.status(500).json({ error: 'An unexpected error occurred while processing the prediction.' });
    }
});

export default router;