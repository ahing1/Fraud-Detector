import { user } from "../schemas/User.js";
import mongoose from "mongoose";

export const addUser = async (data) => {    
    // Check if the user already exists
    const existingUser = await user.findOne({ email: data.email });
    if (existingUser) {
        throw new Error("User already exists");
    }

    try{
        const newUser = new user(data);
        await newUser.validate();
        await newUser.save();
        return newUser
    }
    catch(err){
        throw new Error(err.message);
    }
}

export const getUsers = async () => {
    const users = await user.find({});
    return users
}

export const getUserById = async (id) => {

    if(!id || !mongoose.Types.ObjectId.isValid(id)){
        throw new Error("Invalid User ID");
    }

    const existingUser = await user.findOne({ _id: id });
    if (!existingUser) {
        throw new Error("User does not exist");
    }
    return existingUser
}

export const getTransactionsByUserId = async (userId) => {

    // get all transactions for a user

    if(!userId || !mongoose.Types.ObjectId.isValid(userId)){
            throw new Error("Invalid User ID");
    }

    const userRecord = await user.findOne({ _id: userId }).populate('transactions');
    if (!userRecord) {
        throw new Error("User does not exist");
    }

    return userRecord.transactions;
}


export const updateUser = async (id, data) => {
    
    if(!id || !mongoose.Types.ObjectId.isValid(id)){
        throw new Error("Invalid User ID");
    }

    const existingUser = await user.findOne({ _id: id });
    if (!existingUser) {
        throw new Error("User does not exist");
    }

    try{
        existingUser.set(data);
        await existingUser.validate();
        await existingUser.save();
        return existingUser
    }
    catch(err){
        throw new Error(err.message);
    }
}

export const deleteUser = async (id) => {
    
    if(!id || !mongoose.Types.ObjectId.isValid(id)){
        throw new Error("Invalid User ID");
    }

    const existingUser = await user.findOne({ _id: id });
    if (!existingUser) {
        throw new Error("User does not exist");
    }

    await user.deleteOne({ _id: id });
    return existingUser
}
