const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs=require('fs')

const { mongoose } = require('./db.js');
var materialController = require('./controllers/materialController.js');
var userController = require('./controllers/userController.js');
var chatController = require('./controllers/chatController.js');


var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));


app.listen(3000, () => console.log('Server started at port : 3000'));


app.use('/materials', materialController);
app.use('/users', userController);
app.use('/chats',chatController);


