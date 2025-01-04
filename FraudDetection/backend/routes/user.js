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

export default router;