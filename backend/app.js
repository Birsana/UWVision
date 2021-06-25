const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')


//mongo models
require('./models/User');
require('./models/Company');
require('./models/Job');
require('./models/Question');
require('./models/Salary');
require('./models/Review');

require('./config/passport');

//api routes
var userRoutes = require('./routes/api/users');
var companyRoutes = require('./routes/api/companies');
var jobRoutes = require('./routes/api/jobs');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(require('./routes'));
app.use('/auth', userRoutes);
app.use('/data', companyRoutes);
app.use('/job', jobRoutes);

const jsonErrorHandler = async (err, req, res, next) => { //to send errors as json
    res.status(500).send({ error: err });
  }
app.use(jsonErrorHandler);

mongoose.connect('mongodb+srv://test:SXUpObZFN33QWU1e@uwvisiontest.vawle.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
{ 
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true 
  }); //connecting to mongoose
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const port = process.env.PORT || 5000
var server = app.listen(port, function(){
    console.log('Listening on port ' + server.address().port);
  });