const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const ObjectId = require('mongoose').Types.ObjectId;

const { User } = require('../models/users');
class UserController {
    static getAllUser = (req, res) => {
        User.find((err, docs) => {
            if (!err)
                res.status(200).send({ docs });
            else
                res.status(401).send(err)
        });
    }
    static getUserId = (req, res) => {
        User.find({ _id: req.params.id }, (err, docs) => {
            if (!err)
                res.status(200).send({ docs });
            else
                res.status(401).send(err)
        });
    }

    static postUserAccess =  async (req, res) => {
        const user =  await User.findOne({ name: req.body.username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' })
        }
        else {
            let payload = req.body.password;
            let token = jwt.sign(payload, process.env.KEY_TOKEN)
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password)
            if (!isPasswordCorrect) {
                res.status(401).json({ message: 'incorrect password' })
            }
            else {
                res.status(200).json({ token: token, role: user.userType, _id: user._id });
            }

        }
    }

    static buyCourse = (req, res) => {
        User.updateOne({ name: req.params.user }, { $push: { "paidCourseId": req.params.course } }, (err, doc) => {
            if (!err)
                res.status(200).json({ message: 'Successfully purchased' });
            else
                res.status(401).send(err)
        })
    }

    static getPaidCourse = (req, res) => {
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
    static postUser = (req, res) => {
        const hashedPassword = bcrypt.hashSync(req.body.password, 12)
        User.find({ name: req.body.name }, (err, doc) => {
            if (doc.length == 0) {
                let user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: hashedPassword,
                    paidCourseId: req.body.paidCourseId,
                    userType: req.body.userType
                });
                user.save((err, doc) => {
                    if (!err) { res.status(200).json({ message: 'Successfully Registered' }) }
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

    static putUser = (req, res) => {
        if (!ObjectId.isValid(req.params.id))
            return res.status(400).send(`No record with the given id : $(req.params.id)`);
        let user = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            userType: req.body.userType,
            password: req.body.password
        };
        User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, data) => {
            if (!err)
                res.status(200).json({ message: 'Updated Successfully' });
            else
                res.status(401).send(err)
        });
    }

    static postLoginDetail = (req, res) => {
        const hashedPassword = bcrypt.hashSync(req.body.password, 12)
        var user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPassword,
            userType: req.body.userType
        });
        user.save((err, doc) => {
            if (!err)
                res.status(200).json(doc)
            else
                res.status(400).json({ message: 'Error in storing admin details', doc })
        });
    }
}
module.exports = UserController;

