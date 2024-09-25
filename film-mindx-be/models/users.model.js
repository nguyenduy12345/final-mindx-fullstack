import mongoose from "mongoose";
import Collections from "../utils/collections.js";

const usersSchema = new mongoose.Schema({
    username: {
        type: String, 
        unique: true,
        required: [true, "username is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    email: {
        type: String, 
        required: [true, "email is required"]
    },
    age: Number || String,
    avatar: String || Boolean,
    isLogin: {type: Boolean, default: false},
    banned: {type: Boolean, default: false},
    accesstoken: String,
    refreshtoken: String
});

const UsersModel = mongoose.model(Collections.USERS, usersSchema)

const createUserDB = (data) => UsersModel.create(data)

const findUserDB = (data) => UsersModel.findOne(data)
const updateUserDB = (...args) => UsersModel.findOneAndUpdate(...args)
export {
    createUserDB,
    findUserDB,
    updateUserDB
}

