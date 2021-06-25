var mongoose = require('mongoose');

var JobSchema = new mongoose.Schema({
    jobName: {type: String},
    company: String,
    added_by: String,
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    salaries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Salary' }],
    averageSalary: Number,
    averageRating: Number,
    averageCulture: Number,
    averageWorklife: Number,
    averageInteresting: Number
});

JobSchema.methods.toJSONFor = function(){
  return {
    id: this._id,
    jobName: this.jobName,
    averageRating: this.averageRating,
    numOfReviews: this.reviews.length,
    averageSalary: this.averageSalary,
    numOfSalaryEntries: this.salaries.length
  };
};

mongoose.model('Job', JobSchema);