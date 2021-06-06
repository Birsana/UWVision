var mongoose = require('mongoose');
var express = require('express');
var auth = require('../auth');


var router = express.Router();
var Company = mongoose.model('Company');
var User = mongoose.model('User');
var Job = mongoose.model('Job');

//get all the companies
router.get('/companydata', function(req, res){
    Company.find({}, function(err, companies) {
    if (err) throw err;
    return res.json(companies);
    });
});

//add company
router.post('/addcompany', auth.required, function(req, res, next){
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

//get specific company data
router.get('/findcompanydata/:companyname', async function(req, res, next) {
    var companyName = req.params.companyname;
    var data = await Company.findCompanyByName(companyName);

    if (!data.length) {
        return res.sendStatus(404);
    }

    var retArr = [];
    for(var i = 0; i < data[0].jobs.length; ++i){
        console.log(data[0].jobs[i]);
        await Job.findById(data[0].jobs[i]).then(function(job){
            retArr.push(job.toJSONFor());
        }).catch(next);
    }
    res.send(retArr);
});

//add job
router.post('/:companyname/addjob', auth.required, function(req, res, next) {
    User.findById(req.payload.id).then(function(user){
      if(!user){ 
          return res.sendStatus(401); 
        }
  
      var companyName = req.params.companyname;
      var job = new Job(req.body.job);
      job.added_by = user.email;
      job.company = companyName;
  
      return job.save().then(function(){
        Company.find( {company_name: companyName} ).then(function(company){
            company[0].addJob(job).then(function(){
                return res.send("job added");
            }).catch(next);
        }).catch(next);
      });
    }).catch(next);
  });



module.exports = router;