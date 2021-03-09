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


module.exports = router;