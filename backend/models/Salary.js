var mongoose = require('mongoose');

var SalarySchema = new mongoose.Schema({
    wage: Number,
    added_by: String
});

// to get json for a specific salary
SalarySchema.methods.toJSONFor = function(){
    return {
      id: this._id,
      wage: this.wage,
      added_by: this.added_by
    };
};

mongoose.model('Salary', SalarySchema);