const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.authentication = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("Access denied.Please login");
    }
    const token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send("Access denied.Please login");
    }
    const userdata = jwt.verify(token,process.env.KEY_TOKEN)
    if (!userdata) {
        return res.status(401).send("Access denied.Please login");
    }
    next()
}
