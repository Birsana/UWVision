//eventually we will use this for the server
const http = require('http');
const path = require('path');
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const errorhandler = require('errorhandler');

require('./models/User');
require('./models/Company');
require('./models/Job');
require('./models/Thread');
require('./models/Reply');
require('./config/passport');

const app = express();

// To parse cookies from the HTTP Request
app.use(cookieParser());
var userRoutes = require('./routes/api/users');
var companyRoutes = require('./routes/api/companies');
var threadRoutes = require('./routes/api/threads');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.use(require('./routes'));


//this error stuff wasnt working, not needed now, but fix later
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

app.use('/auth', userRoutes);
app.use('/data', companyRoutes);
app.use('/thread', threadRoutes);



mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true}); //connecting to mongoose
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', testMongoose);



var server = app.listen(5000, function(){
    console.log('Listening on port ' + server.address().port);
  });