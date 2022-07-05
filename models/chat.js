const mongoose = require('mongoose');

var Chat = mongoose.model('Chat', {
    hostname: { type: String },
    message: { type: Array },
    reply:{ type:Object}
});

module.exports = { Chat };