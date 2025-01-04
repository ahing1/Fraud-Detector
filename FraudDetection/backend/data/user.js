import { user } from "../models/User.js";

export const getUsers = async () => {
    const users = await user.find({});
    return users
}

export const addUser = async (userId, name, email, accountAge) => {    
    // Check if the user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }

    const newUser = new user({ userId, name, email, accountAge });

    try{
        await newUser.validate();
    }
    catch(err){
        throw new Error(err.message);
    }

    await newUser.save();
    return newUser;
}