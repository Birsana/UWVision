const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

function testMongoose(){
    const kittySchema = new mongoose.Schema({
        name: String
      });
    kittySchema.methods.speak = function () {
        const greeting = this.name
          ? "Meow name is " + this.name
          : "I don't have a name";
        console.log(greeting);
      }
      
    const Kitten = mongoose.model('Kitten', kittySchema);
    Kitten.find({ name: /^fluff/ });
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