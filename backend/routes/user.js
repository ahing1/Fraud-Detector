import { Router } from 'express';
import { addUser, getUsers } from '../data/user.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { userId, name, email, accountAge } = req.body;
        const newUser = await addUser({ userId, name, email, accountAge });
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;