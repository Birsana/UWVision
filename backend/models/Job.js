var mongoose = require('mongoose');

var JobSchema = new mongoose.Schema({
    job_name: {type: String},
    company: String,
    added_by: String,
    threads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thread' }],
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    salaries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Salary' }]
});

mongoose.model('Job', JobSchema);