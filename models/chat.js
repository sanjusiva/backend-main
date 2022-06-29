const mongoose = require('mongoose');

var Chat = mongoose.model('Chat', {
    hostname: { type: String },
    message: { type: Array }
});

module.exports = { Chat };