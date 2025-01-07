import { Router } from 'express';
import { getTransactions, createTransaction } from '../data/transaction.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const transactions = await getTransactions();
        return res.json(transactions);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { userId, amount } = req.body;
        const newTransaction = await createTransaction({ userId, amount });
        return res.json(newTransaction);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

export default router;