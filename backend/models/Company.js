var mongoose = require('mongoose');

var CompanySchema = new mongoose.Schema({
  company_name: {type: String, unique: true},
  added_by: String,
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
});

CompanySchema.methods.addJob = function(id){
    if(this.jobs.indexOf(id) === -1){
      this.jobs.push(id);
    }
  
    return this.save();
};

CompanySchema.methods.removeJob = function(id){
    this.favorites.remove( id );
    return this.save();
};

// Static Method - isn't tied to any instance of CompanySchema
CompanySchema.statics.findCompanyByName = function(name) {
  return this.find({company_name: name});
}

mongoose.model('Company', CompanySchema);