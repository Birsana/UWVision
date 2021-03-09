var mongoose = require('mongoose');

var CompanySchema = new mongoose.Schema({
  company_name: String
});


mongoose.model('Company', CompanySchema);