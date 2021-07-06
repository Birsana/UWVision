var mongoose = require('mongoose');

var SalarySchema = new mongoose.Schema({
    wage: Number,
    addedBy: String
});

// to get json for a specific salary
SalarySchema.methods.toJSONFor = function(){
    return {
      id: this._id,
      wage: this.wage,
      addedBy: this.addedBy
    };
};

mongoose.model('Salary', SalarySchema);