import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: {type: String, required: [true, "User ID is required"]},
    name: {type: String, required: [true, "Name is required"]},
    email: {type: String, required: [true, "Email is required"], unique: true, match: [/.+@.+\..+/, 'Please enter a valid email address']},
    accountAge: {type: Number, required: [true, "Account Age is required"]},
    isVerified: {type: Boolean, default: false},
})

export const user = mongoose.model("Users", userSchema);