import { transaction } from "../schemas/Transaction.js";
import mongoose from "mongoose";

export const createTransaction = async (data) => {

    try{
        const newTransaction = new transaction(data);
        await newTransaction.validate();
        // Update the user's transactions
        const user = await user.findOne({ userId: data.userId });
        user.transactions.push(newTransaction._id);
        user.totalTransactionAmount = user.totalTransactionAmount + data.amount;
        await newTransaction.save();
        return newTransaction
    }
    catch(err){
        throw new Error(err.message);
    }
}
export const getTransactions = async () => {
    const transactions = await transaction.find({});
    return transactions
}

export const getTransactionById = async (id) => {

    if(!id || !mongoose.Types.ObjectId.isValid(id)){
        throw new Error("Invalid Transaction ID");
    }

    const transaction = await transaction.findOne({ _id: id });
    if (!transaction) {
        throw new Error("Transaction does not exist");
    }

    return transaction
}


