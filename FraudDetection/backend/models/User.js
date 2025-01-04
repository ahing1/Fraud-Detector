import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    accountAge: {type: Number, required: true},
    isVerified: {type: Boolean, default: false},
})

export const user = mongoose.model("Users", userSchema);