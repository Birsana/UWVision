//eventually we will use this for the server
const http = require('http');
const path = require('path');
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const errorhandler = require('errorhandler');

require('./models/User');
require('./config/passport');

const app = express();

var userRoutes = require('./routes/api/users');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


app.use(require('./routes'));

function testMongoose(){
   //ADD STUFF HERE
}

// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

app.use('/auth', userRoutes);



mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', testMongoose);



var server = app.listen(5000, function(){
    console.log('Listening on port ' + server.address().port);
  });