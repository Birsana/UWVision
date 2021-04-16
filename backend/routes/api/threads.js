var mongoose = require('mongoose');
var express = require('express');
var jwt = require('jsonwebtoken');
var auth = require('../auth');


var router = express.Router();
var Company = mongoose.model('Company');
var User = mongoose.model('User');
var Job = mongoose.model('Job');
var Thread = mongoose.model('Thread');

router.post('/:companyname/:job/threads', auth.required, function(req, res, next) {
    User.findById(req.payload.id).then(function(user){
      if(!user){ return res.sendStatus(401); }
  
      var thread = new Thread(req.body.thread);
      thread.job = req.job;
      thread.company = req.params.companyname;
      thread.author = user.username;
     
      console.log("username is ");
      console.log(thread.author);
  
      return thread.save().then(function(){
        Job.find( {job_name: req.params.job} ).then(function(job){
            console.log(job);
            job[0].threads.push(thread);
            return job[0].save().then(function(job) {
                console.log("saved");
                res.send("thread added")
              });
        }).catch(next);
      });
    }).catch(next);
});

  router.get('/:companyname/:job/threads', auth.optional, async function(req, res, next){
    Job.find( {job_name: req.params.job, company: req.params.companyname} ).then( async function(job){
        console.log(job[0]);
        
        var retArr = [];
        for(var i = 0; i < job[0].threads.length; ++i){
            await Thread.findById(job[0].threads[i]).then(function(thread){
            retArr.push(thread.toJSONFor());
        }).catch(next);
        }
        console.log(retArr);
        res.send(retArr);
    }).catch(next);
  });

module.exports = router;