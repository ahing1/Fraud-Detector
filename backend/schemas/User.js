import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Name is required"]},
    email: {type: String, required: [true, "Email is required"], unique: true, match: [/.+@.+\..+/, 'Please enter a valid email address']},
    isVerified: {type: Boolean, required: [true, "Verification status is required"], default: false},
    totalTransactionAmount: {type: Number, default: 0},
    transactions : [{type: mongoose.Schema.Types.ObjectId, ref: "Transaction"}],
    password: {type: String, required: [true, "Password is required"], minLength: [8, "Password must be at least 8 characters long"]},
}, {timestamps: true}); // Adds createdAt and updatedAt fields automatically

userSchema.virtual('accountAge').get(function () {
    const now = new Date();
    const createdAt = this.createdAt;
    const ageInDays = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24)); // Difference in days
    return ageInDays;
});

userSchema.pre('save', async function (next) { // Hash password before saving
    if (!this.isModified('password')) {
        next(); // Skip hashing if the password hasn't been modified
    }


    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
    catch (error) {
        next(error);
    }
});

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password); // Compare input with hashed password
};

export const user = mongoose.model("Users", userSchema);