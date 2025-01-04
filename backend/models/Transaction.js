import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    transactionId: { type: String, required: [true, "TransactionId is required"], unique: true },
    userId: { type: String, required: [true, "UserID is required"] },
    amount: { type: Number, required: [true, "Amount is required"] },
    timestamp: { type: Date, default: Date.now },
    location: { type: String },
    device: { type: String },
    ipAddress: { type: String },
    isFraud: { type: Boolean, default: false },
})

export const transaction = mongoose.model("Transaction", transactionSchema);