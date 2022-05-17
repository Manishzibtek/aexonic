const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        // required: true, 
    },
    firstName: {
       type: String,
       required: true
    },
    lastName: {
        type: String
    },
    mobileNumber: {
        type: Number,
    },
    address: {
        type: String
    }
})

let userModel = mongoose.model('User', userSchema)
module.exports = userModel;