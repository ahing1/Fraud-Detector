import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: { type: String, required: [true, "UserID is required"] },
    amount: { type: Number, required: [true, "Amount is required"] },
    isFraud: { type: Boolean, default: false }
})

export const transaction = mongoose.model("Transaction", transactionSchema);