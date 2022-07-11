const mongoose = require('mongoose');

var ChatMsg = mongoose.model('ChatMsg', {
    hostname: { type: String },
    message: { type: String },
    reply:{ type:Object}
});

module.exports = { ChatMsg };