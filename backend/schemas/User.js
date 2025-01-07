import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Name is required"]},
    email: {type: String, required: [true, "Email is required"], unique: true, match: [/.+@.+\..+/, 'Please enter a valid email address']},
    accountAge: {type: Number, required: [true, "Account Age is required"]},
    isVerified: {type: Boolean, default: false},
    totalTransactionAmount: {type: Number, default: 0},
    transactions : [{type: mongoose.Schema.Types.ObjectId, ref: "Transaction"}]
})

export const user = mongoose.model("Users", userSchema);