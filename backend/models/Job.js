var mongoose = require('mongoose');

var JobSchema = new mongoose.Schema({
    jobName: {type: String},
    company: String,
    added_by: String,
    threads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thread' }],
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    salaries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Salary' }],
    averageSalary: Number,
    averageRating: Number
});

JobSchema.methods.toJSONFor = function(){
    return {
      id: this._id,
      jobName: this.jobName,
      added_by: this.added_by
    };
};

mongoose.model('Job', JobSchema);