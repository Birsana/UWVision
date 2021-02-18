const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

function testMongoose(){
   
}


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', testMongoose);


app.get('/', (req, res) => {
    res.send('hello');
})


app.listen(5000);