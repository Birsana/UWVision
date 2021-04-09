var mongoose = require('mongoose');

var JobSchema = new mongoose.Schema({
    job_name: {type: String},
    company: String,
    added_by: String
});

mongoose.model('Job', JobSchema);