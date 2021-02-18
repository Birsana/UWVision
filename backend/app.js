//eventually we will use this for the server

const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const errorhandler = require('errorhandler');



const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

require('./models/User');
require('./config/passport');

app.use(require('./routes'));

function testMongoose(){
   
}



mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', testMongoose);


app.get('/', (req, res) => {
    res.send('hello');
})


app.listen(5000);