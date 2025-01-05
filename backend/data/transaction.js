import { transaction } from "../schemas/Transaction.js";

export const getTransactions = async () => {
    const transactions = await transaction.find({});
    return transactions
}

export const addTransaction = async (data) => {

    // Check if the transaction already exists
    const existingTransaction = await transaction.findOne({ transactionId: data.transactionId });
    if (existingTransaction) {
        throw new Error("Transaction already exists");
    }

    try{
        const newTransaction = new transaction(data);
        await newTransaction.validate();
        await newTransaction.save();
        return newTransaction
    }
    catch(err){
        throw new Error(err.message);
    }
}