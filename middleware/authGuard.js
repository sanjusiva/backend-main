const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.authentication = async (req, res, next) => {
    if (!req.headers.authorization) {
        console.log("no");
        return res.status(401).send("Access denied.Please login");
    }
    const token = req.headers.authorization.split(' ')[1]
    console.log(token);
    console.log("env"+process.env.KEY_TOKEN);
    if (token === 'null') {
        console.log("illa");
        return res.status(401).send("Access denied.Please login");
    }
    const userdata = jwt.verify(token,process.env.KEY_TOKEN)
    console.log("userdata"+userdata);
    if (!userdata) {
        return res.status(401).send("Access denied.Please login");
    }


    next()



}