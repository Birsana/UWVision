var mongoose = require('mongoose');
var express = require('express')


var router = express.Router();
var Company = mongoose.model('Company');

router.get('/companyData', function(req, res){
    Company.find({}, function(err, companies) {
    if (err) throw err;
    return res.json(companies);
    });
});

router.post('/addCompany', function(req, res){
    Company.create({ company_name: req.body.company_name, added_by: req.body.user}, function (err, small) {
        if (err) return handleError(err);
        console.log("saved");
      });
      
});



module.exports = router;