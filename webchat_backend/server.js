//importing
// import express from 'express'
const express = require('express');
// import mongoose from 'mongoose'
const mongoose = require('mongoose');
// import Pusher from 'pusher'
const Pusher = require("pusher");
// import cors from 'cors'
var cors = require('cors');

const Message = require('./messageModel');

//app config
const app = express();

// real time tool
const pusher = new Pusher({
    appId: "1125062",
    key: "941c47133c2971888d1b",
    secret: "258e07205a2bf641fc5f",
    cluster: "ap1",
    useTLS: true
});

//middleware
app.use(express.json());

    //enables all cors req
app.use(cors());

//allow deploy from all source (CORS)


//DB config

const connection_url = 'mongodb+srv://hieunm:hieucucdinh@cluster0.kct9v.mongodb.net/webChatDB?retryWrites=true&w=majority';
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true

});

const db = mongoose.connection;

db.on('error', () => console.log('Connection error'));
db.once('open',()=>{
    console.log('DB connected!!!');

    const msgCollection = db.collection('messagemodels');
    const changeStream =  msgCollection.watch();

    changeStream.on('change', (change)=>{
        console.log('change: ',change);

        //pusher trigger
        if(change.operationType === 'insert'){
            const msgDetails = change.fullDocument;
            pusher.trigger('messages','inserted',{
                name: msgDetails.name,
                message : msgDetails.message,
                timestamp:  msgDetails.timestamp,
                received: msgDetails.received
            });
        }else{
            console.log('Triggering error');
        }
    });
});





//api routes
app.get('/', (req, res) => {
    res.status(200).send('Hello NMH');
})

//create new message
app.post('/messages/new', (req, res) => {
    const messageContent = req.body;

    Message.create(messageContent, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})

//GET ALL THE MESSAGE FROM DATABASE
app.get('/messages/sync',(req,res) =>{

    Message.find( {} ,(err,docs) =>{
        if(err){
            res.status(500).send(err);
        } else{
            res.status(200).send(docs);
        }
    })
})


//listen
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log(`server running at port ${PORT}`));