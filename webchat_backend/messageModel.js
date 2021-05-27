// import mongoose from 'mongoose'
const mongoose = require('mongoose');

const {Schema} = mongoose;

//dinh nghia schema cho message
const messageSchema = new Schema({
    message: String,
    name : String,
    timestamp: String,
    received: Boolean
});


//export luon model

module.exports = mongoose.model('messageModel',messageSchema);