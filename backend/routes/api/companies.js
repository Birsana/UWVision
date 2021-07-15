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

        const listOfCompanies = [];
        companies.forEach((company) => {
            let companyName = company.companyName;
            listOfCompanies.push({label: companyName, value: company.jobs.length});
        });

        listOfCompanies.sort((a, b) => {
            if (a.label < b.label) {
                return -1;
            } else if (a.label > b.label) {
                return 1;
            } else {
                return 0;
            }
        });

        return res.json(listOfCompanies);
    });
});

//add company
router.post('/addcompany', auth.required, function(req, res, next){
    User.findById(req.payload.id).then(function(user){
        if(!user){
            return res.sendStatus(401);
        }
        return Company.create({ companyName: req.body.companyName, addedBy: user.email, averageSalary: 0,
        averageRating: 0, numSalaries: 0, numReviews: 0}, function (err) {
            if (err) return res.sendStatus(400);
            return res.send("company added");
          })
    }).catch(next);
});

//get data for each job in a company (fetching jobs)
router.get('/getcompanydata/:companyname', auth.optional, async function(req, res, next) {
    
    var companyName = req.params.companyname
    var data = await Company.findCompanyByName(companyName)
    var retArr = [];

    if(req.payload != null && req.payload.id != null){
        User.findById(req.payload.id).then(async function(user){
            // Populate saved job IDs into a set of strings
            const savedSet = new Set();
            for (let i = 0; i < user.savedJobs.length; i++) {
                savedSet.add(user.savedJobs[i].toString())
            }

            for(var i = 0; i < data[0].jobs.length; ++i){
                await Job.findById(data[0].jobs[i]).then(function(job){
                    retArr.push(job.toJSONFor(savedSet.has(job.id)));
                }).catch(next);
            }
            res.send(retArr);
        }).catch(next);
    } else {
        for(var i = 0; i < data[0].jobs.length; ++i){
            await Job.findById(data[0].jobs[i]).then(function(job){
                retArr.push(job.toJSONFor(false));
            }).catch(next);
        }
        res.send(retArr);
    }

});

//add job
router.post('/:companyname/addjob', auth.required, function(req, res, next) {
    User.findById(req.payload.id).then(function(user){
      if(!user){ 
          return res.sendStatus(401); 
        }
  
      var companyName = req.params.companyname;
      var job = new Job(req.body.job);
      job.addedBy = user.email;
      job.company = companyName;
      job.averageRating = 0;
      job.averageSalary = 0;
      job.averageCulture = 0;
      job.averageWorklife = 0;
      job.averageInteresting = 0;

      job.jobCompanyKey = job.jobName + job.company
  
      return job.save().then(function(){
        Company.find( {companyName: companyName} ).then(function(company){
            company[0].addJob(job).then(function(){
                return res.send("job added");
            }).catch(next);
        }).catch(next);
      });
    }).catch(next);
  });

//get data about the company
router.get('/company/:companyname', async function(req, res, next) {
    var companyName = req.params.companyname
    var data = await Company.findCompanyByName(companyName)
    if(data.length == 0){
        return res.sendStatus(404); 
    } else {
        return res.send(data[0].toJSONFor());
    }
});



module.exports = router;