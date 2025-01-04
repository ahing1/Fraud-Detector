import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    transactionID: { type: String, required: true, unique: true },
    userID: { type: String, required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
    location: { type: String },
    device: { type: String },
    ipAddress: { type: String },
    isFraud: { type: Boolean, default: false },
})

export const transaction = mongoose.model("Transaction", transactionSchema);