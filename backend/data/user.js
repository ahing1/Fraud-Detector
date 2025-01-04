import { user } from "../models/User.js";

export const getUsers = async () => {
    const users = await user.find({});
    return users
}

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