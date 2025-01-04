import { Router } from 'express';
import { getTransactions, addTransaction } from '../data/transaction.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const transactions = await getTransactions();
        return res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { transactionId, userId, amount, location, device, ipAddress } = req.body;
        const newTransaction = await addTransaction({ transactionId, userId, amount, location, device, ipAddress });
        return res.json(newTransaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;