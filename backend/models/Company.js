var mongoose = require('mongoose');

var CompanySchema = new mongoose.Schema({
  company_name: String,
  added_by: String
});


mongoose.model('Company', CompanySchema);