const mongoose = require('mongoose');

var User = mongoose.model('User', {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    password: { type: String },
    paidCourseId:{ type:Array },
    userType:{ type:String }
});

module.exports = { User };