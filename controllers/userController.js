const jwt = require('jsonwebtoken');


const { User } = require('../models/users');
class UserController {
    static getAllUser =  (req, res) => {
        User.find((err, docs) => {
            res.send(docs); 
        });
    }

    static postUserAccess =  (req, res) => {
        User.find({ name: req.body.username }, { name: 1, password: 1, userType: 1, _id: 1 }, (err, doc) => {
            if (doc[0] == undefined) {
                res.status(401).json({ message: 'Invalid user...Please register' })
            }
            else if (doc[0].name == req.body.username && doc[0].password == req.body.password) {
                let payload = { subject: doc._id };
                let token = jwt.sign(payload, process.env.KEY_TOKEN);
                res.status(200).send({ token, role: doc[0].userType });
            }
            else if (doc[0].name != req.body.username || doc[0].password != req.body.password) {
                res.status(401).json({ message: 'Username or password is invalid' })

            }
        })
    }

    static buyCourse =  (req, res) => {
        User.updateOne({ name: req.params.user }, { $push: { "paidCourseId": req.params.course } }, (err, doc) => {
            res.status(200).json({ message: 'Successfully purchased' });

        })
    }

    static getPaidCourse =  (req, res) => {
        User.find({ paidCourseId: { $elemMatch: { $eq: req.params.course } } }, { _id: 0, name: 1 }, (err, doc) => {
            let flag = 0;
            if (doc.length == 0) {
                res.status(402).json({ message: "Haven't purchased" });

            }
            else {
                for (let i = 0; i < doc.length && flag == 0; i++) {
                    if (doc[i].name == req.params.name) {
                        res.status(200).json({ message: 'Success' });
                        flag = 1;
                    }
                    else {
                        if (i == doc.length - 1) {
                            res.status(402).json({ message: "Haven't purchased" });
                        }
                    }
                }
            }
        })
    }
    static postUser =  (req, res) => {
        User.find({ name: req.body.name }, (err, doc) => {
            if (doc.length == 0) {
                let user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: req.body.password,
                    paidCourseId: req.body.paidCourseId,
                    userType: req.body.userType
                });
                user.save((err, doc) => {
                    if (!err) { res.status(200).json({ msg: 'Successfully Registered' }) }
                    else {
                        res.status(401).json({ message: 'Error in Posting Materials' })
                    }
                });
            }
            else {
                res.status(401).json({ message: "Username is already registered" });
            }
        });
    }
}
module.exports = UserController;

