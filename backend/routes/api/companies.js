var mongoose = require('mongoose');
var express = require('express');
var axios = require('axios');
var auth = require('../auth');


var router = express.Router();
var Company = mongoose.model('Company');
var User = mongoose.model('User');

router.get('/companyData', function(req, res){
    Company.find({}, function(err, companies) {
    if (err) throw err;
    return res.json(companies);
    });
});

router.post('/addCompany', auth.required, function(req, res, next){
    User.findById(req.payload.id).then(function(user){
        if(!user){
            return res.sendStatus(401);
        }
        return Company.create({ company_name: req.body.company_name, added_by: user.email}, function (err) {
            if (err) return handleError(err);
            console.log(req.body);
            return res.send("saved");
          })
    }).catch(next);
});



module.exports = router;