var mongoose = require('mongoose');

var CompanySchema = new mongoose.Schema({
  companyName: {type: String, unique: true, collation:{ locale: "en", strength: 2 }},
  addedBy: String,
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  jobNames: [String],
  averageSalary: Number,
  averageRating: Number,
  numSalaries: Number,
  numReviews: Number
});


CompanySchema.methods.addJob = function(id){
    if(this.jobs.indexOf(id) === -1){
      this.jobs.push(id);
      this.jobNames.push(id.jobName);
    }
  
    return this.save();
};

CompanySchema.methods.removeJob = function(id){
    this.favorites.remove( id );
    return this.save();
};

CompanySchema.statics.findCompanyByName = function(name) {
  return this.find({companyName: name});
}

CompanySchema.methods.toJSONFor = function(){
    return {
      id: this._id,
      companyName: this.companyName,
      averageSalary: this.averageSalary,
      averageRating: this.averageRating,
      numSalaries: this.numSalaries,
      numReviews: this.numReviews
    };
};

mongoose.model('Company', CompanySchema);