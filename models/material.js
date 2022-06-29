const mongoose = require('mongoose');

var Material = mongoose.model('Material', {
    Domain: { type: String },
    course_id: { type: Number },
    link1: { type: String },
    link2: { type: String },
    link3: { type: String },
    video1:{ type: String },
    video2:{ type:String },
    video3:{ type:String },
    cost: { type: Number },
    // v1:    { type: GridFs}
});

module.exports = { Material };