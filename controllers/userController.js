const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');


var { User } = require('../models/users');

const getAllUser = async (req, res) => {
    User.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2)); }
    });
}

const getUserAccess = async (req, res) => {
    User.find({ name: req.params.username }, { name: 1, password: 1, user_type: 1, _id: 1 }, (err, doc) => {
        console.log(doc);
        if (doc[0] == undefined) {
            res.status(401).json({ message: 'Invalid user...Please register' })
        }
        else if (doc[0].name == req.params.username && doc[0].password == req.params.password) {
            console.log("admin true");
            let payload = { subject: doc._id };
            let token = jwt.sign(payload,process.env.KEY_TOKEN);
            console.log(token);
            res.status(200).send({ token,role: doc[0].user_type });
            // res.status(200).json({ role: doc[0].user_type });
        }
        else if (doc[0].name != req.params.username || doc[0].password != req.params.password) {
            res.status(401).json({ message: 'Username or password is invalid' })

        }
    })
}


const buyCourse = async (req, res) => {
    console.log(req.params.course);
    console.log(req.params.user);

    User.find({ name: req.params.user }, (err, doc) => {
        console.log(doc);
    })

    User.updateOne({ name: req.params.user }, { $push: { "paidCourse_id": req.params.course } }, (err, doc) => {
        // console.log(doc);
        // res.send(doc)
        res.status(200).json({ message: 'Successfully purchased' });

    })
}


const getPaidCourse = async (req, res) => {
    console.log(req.params.course);
    console.log(req.params.name);
    User.find({ paidCourse_id: { $elemMatch: { $eq: req.params.course } } }, { _id: 0, name: 1 }, (err, doc) => {
        console.log("finally")
        console.log(doc);
        var flag = 0;
        if (doc.length == 0) {
            console.log("onnum illa");
            // res.send("false");
        res.status(401).json({ message: 'Empty' });

        }
        else {
            for (i = 0; i < doc.length && flag == 0; i++) {
                if (doc[i].name == req.params.name) {
                    console.log("eruku");
                    // res.send("true");
                    res.status(200).json({ message: 'Success' });
                    flag = 1;
                }
                else {
                    console.log("illa");
                    // console.log(i);
                    if (i == doc.length - 1) {
                        console.log("false");
                        // res.send("false");
                        res.status(401).json({ message: "Haven't purchased" });

                    }
                }
            }
        }
    })
}


// router.post('/',
const postUser = async (req, res) => {
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        paidCourse_id: req.body.paidCourse_id,
        user_type: req.body.user_type
    });
    user.save((err, doc) => {
        if (!err) { res.send(doc); }
        else {
            console.log('Error in User Save :' + JSON.stringify(err, undefined, 2));
            if (err.code == 11000) {
                console.log("nooo");
                res.send(err);
            }
        }
    });
}

module.exports = {
    getAllUser,
    getUserAccess,
    buyCourse,
    getPaidCourse,
    postUser
};