const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength: [8, "Password should be greater than 8 charaters"],
        select: false,
    },
    gender:{
        type:String,
        required:true,
    },
    hobbies:{
        type:[String],
        requied:true
    },
    role:{
        type:String,
        requied:true
    }
}) 

module.exports = mongoose.model("Employee",employeeSchema)