const mongoose = require('mongoose');

var Material = mongoose.model('Material', {
    domain: { type: String },
    courseId: { type: Number },
    link1: { type: String },
    link2: { type: String },
    link3: { type: String },
    video1:{ type: String },
    video2:{ type:String },
    video3:{ type:String },
    cost: { type: Number },
    image:{type:String}
});

module.exports = { Material };