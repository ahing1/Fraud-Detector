import { Router } from 'express';
import { transaction } from '../schemas/Transaction.js';

const router = Router();

router.get('/', async (req, res) => {

    try{
        const totalTransactions = await transaction.countDocuments();
        const fraudulentTransactions = await transaction.countDocuments({isFraud: true});
        const legitimateTransactions = totalTransactions - fraudulentTransactions;

        const transactionsByDate = await transaction.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                    totalAmount: { $sum: "$amount" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        return res.json({
            totalTransactions,
            fraudulentTransactions,
            legitimateTransactions,
            transactionsByDate
        })
    }

    catch (error){
        res.status(500).json({ error: error.message });
    }

});

export default router;