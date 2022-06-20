const mongoose = require('mongoose');

var modelSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String
    },
    age:{
        type: Number
    }
})

var model = mongoose.model('pwc',modelSchema)
module.exports = model;