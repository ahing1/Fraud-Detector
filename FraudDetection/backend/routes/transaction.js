import { Router } from 'express';
import { getTransactions, addTransaction } from '../data/transaction.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const transactions = await getTransactions();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;