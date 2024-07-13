const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name : { type : String, required : true},
    email : { type : String, required : true},
    password : { type : String, required : true},
    role: { 
        type: String, 
        enum: ['admin', 'user'], 
        default: 'user' 
    },
    profileImage : {
        type : String
    }
})

const User = mongoose.model('tripkaro-users', UserSchema)

module.exports = User