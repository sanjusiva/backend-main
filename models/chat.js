const mongoose = require('mongoose');

var Chat = mongoose.model('Chat', {
    hostname: { type: String },
    message: { type: Array },
    // hostname:{ type:String},
    // message:{ type:String},
   reply:{ type:Object}
});

module.exports = { Chat };