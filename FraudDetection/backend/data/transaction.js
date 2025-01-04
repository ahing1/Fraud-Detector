import { transaction } from "../models/Transaction";

export const getTransactions = async () => {
    const transactions = await transaction.find({});
    return transactions
}

export const addTransaction = async (transactionId, userId, amount, location, device, ipAddress) => {
    const newTransaction = new transaction({ transactionId, userId, amount, location, device, ipAddress });

    try{
        await newTransaction.validate();
    }
    catch(err){
        throw new Error(err.message);
    }

    await newTransaction.save();
    return newTransaction;
}