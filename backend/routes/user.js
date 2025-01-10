import { Router } from 'express';
import { addUser, getUsers, getTransactionsByUserId, getUserById } from '../data/user.js';
import { user } from '../schemas/User.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const users = await getUsers();
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, email, isVerified } = req.body;
        const newUser = await addUser({ name, email, isVerified });
        return res.json(newUser);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const userRecord = await getUserById(req.params.id);
        if (!userRecord) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json(userRecord);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get('/:id/transactions', async (req, res) => { // This route is used to get all transactions for a specific user
    try {
        const userId = req.params.id;
        const transactions = await getTransactionsByUserId(userId);
        return res.json(transactions);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


export default router;