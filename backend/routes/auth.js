import { Router } from 'express';
import { user } from '../schemas/User.js';
import { addUser } from '../data/user.js';

const router = Router();

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const newUser = await addUser({ name, email, password });
        if (!newUser) {
            return res.status(400).json({ error: "User could not be created" });
        }
        return res.status(201).json({ message: "User created successfully", userId: newUser._id });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await user.findOne({
            email: email
        });
        if (!existingUser) {
            return res.status(400).json({ error: "User does not exist" });
        }

        const isValidPassword = await existingUser.isValidPassword(password);
        if (!isValidPassword) {
            return res.status(400).json({ error: "Invalid password" });
        }

        return res.status(200).json({ message: "User signed in successfully", userId: existingUser._id });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});


export default router;