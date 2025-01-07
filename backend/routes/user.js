import { Router } from 'express';
import { addUser, getUsers } from '../data/user.js';

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
        const { name, email, accountAge } = req.body;
        const newUser = await addUser({ name, email, accountAge });
        return res.json(newUser);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});



export default router;