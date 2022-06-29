const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var app=express();
var { Chat } = require('../models/chat');

// var socket=require("socket.io");
// //socket setup
// var server=app.listen(3000, () => console.log('Server started at port : 3000'));

// var io=socket(server);

router.get('/', (req, res) => {
    Chat.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Materials :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    console.log("Hostname"+req.body.hostname);
    var chat = new Chat({
        hostname: req.body.hostname,
        // user_id: req.body.user_id,
        message: req.body.message
    });
    chat.save((err, doc) => {
        if (!err) { res.send(doc);}
        else { console.log('Error in User Save :' + JSON.stringify(err, undefined, 2));
    }
    });
});
router.put('/:hostname/:message',(req,res)=>{
    console.log(req.params.hostname);
    console.log(req.params.message);
   //User.updateOne({name:req.params.user},{$push:{"paidCourse_id":req.params.course}},{upsert:true},(err,doc)=>{
  //User.updateOne({name:req.params.user},{$push:{paidCourse_id:req.params.course}},(err,doc)=>{
 // User.findOneAndUpdate({name:req.params.user},{$push:{"paidCourse_id.$[]":[req.params.course]}},{upsert:true},(err,doc)=>{
//   Chat.find({hostname:req.params.hostname},(err,doc)=>{
// console.log(doc);
//   })  
 
 Chat.updateOne({hostname:req.params.hostname},{$push:{"message":req.params.message}},{upsert:true},(err,doc)=>{
       
 console.log(doc);
        res.send(doc)
    })
})

router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with the given id : $(req.params.id)`);

    Chat.findByIdAndRemove(req.params.id,(err,data)=>{
        if(!err)
            res.send(data);
        else
            console.log('Error in Material Delete : '+JSON.stringify(err,undefined,2));
    });
});

module.exports = router;
