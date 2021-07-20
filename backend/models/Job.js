var mongoose = require('mongoose');

var JobSchema = new mongoose.Schema({
    jobName: String,
    company: String,
    jobCompanyKey: {type: String, unique: true, collation:{ locale: "en", strength: 2 }},
    addedBy: String,
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    salaries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Salary' }],
    averageSalary: Number,
    averageRating: Number,
    averageCulture: Number,
    averageWorklife: Number,
    averageInteresting: Number
});

JobSchema.methods.toJSONFor = function(isSaved){
  return {
    id: this._id,
    company: this.company,
    jobName: this.jobName,
    averageRating: this.averageRating,
    numOfReviews: this.reviews.length,
    averageSalary: this.averageSalary,
    numOfSalaryEntries: this.salaries.length,
    isSaved: isSaved
  };
};

mongoose.model('Job', JobSchema);