const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var app=express();
var { ChatMsg } = require('../models/chatMsg');


router.get('/', (req, res) => {
    ChatMsg.find((err, docs) => {
        if (!err) { res.send(docs[0]);console.log(docs[0]); }
        else { console.log('Error in Retriving Materials :' + JSON.stringify(err, undefined, 2)); }
    });
});
router.post('/', (req, res) => {
    console.log("Hostname"+req.body.hostname);
    var chatMsg = new ChatMsg({
        hostname: req.body.hostname,
        message: req.body.message
    });
    chatMsg.save((err, doc) => {
        if (!err) { res.send(doc);}
        else { console.log('Error in User Save :' + JSON.stringify(err, undefined, 2));
    }
    });
});

module.exports = router;