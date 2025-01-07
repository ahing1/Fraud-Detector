import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    timestamp: { type: Date, default: Date.now },
    amount: { type: Number, required: [true, "Amount is required"] },
    isFraud: { type: Boolean, default: false }
})

export const transaction = mongoose.model("Transaction", transactionSchema);