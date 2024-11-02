import mongoose from "mongoose";

const signupSchema = mongoose.Schema({
    name : String,
    email : String,
    password : String
})

const signupModel = mongoose.model('userAccountData',signupSchema)

export default signupModel