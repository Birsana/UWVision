var mongoose = require('mongoose');
var express = require('express');
var axios = require('axios');
var auth = require('../auth');


var router = express.Router();
var Company = mongoose.model('Company');
var User = mongoose.model('User');
var Job = mongoose.model('Job');

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

router.get('/findCompanyData/:companyname', async function(req, res) {
  var companyName = req.params.companyname
  var data = await Company.findCompanyByName(companyName)
  
  if(!data.length) {
    return res.sendStatus(404); // Error Code 404 to mark that the company has not been found
  } 

  return res.json(data);
});

router.post('/:companyname/addjob', auth.required, function(req, res, next) {
    User.findById(req.payload.id).then(function(user){
      if(!user){ return res.sendStatus(401); }
  
      var companyName = req.params.companyname;
      var job = new Job(req.body.job);
      job.added_by = user.email;
      job.company = companyName;
  
      return job.save().then(function(){
        console.log("the company is");
        console.log(companyName);
        Company.find( {company_name: companyName} ).then(function(company){
            company[0].addJob(job).then(function(){
                return res.send("job added");
            }).catch(next);
        }).catch(next);
      });
    }).catch(next);
  });



module.exports = router;