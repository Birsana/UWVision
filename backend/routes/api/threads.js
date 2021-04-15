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
      thread.author = user;
     
  
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

  router.get('/:companyname/:job/threads', auth.optional, function(req, res, next){
    Job.find( {job_name: req.params.job, company: req.params.companyname} ).then(function(job){
        console.log(job);
        console.log(job[0].threads);
        res.send("threads");
    }).catch(next);


    // Promise.resolve(req.payload ? User.findById(req.payload.id) : null).then(function(user){
    //   return req.job.populate({
    //     path: 'threads',
    //     populate: {
    //       path: 'author'
    //     },
    //     options: {
    //       sort: {
    //         createdAt: 'desc'
    //       }
    //     }
    //   }).execPopulate().then(function(job) {
    //     return res.json({comments: req.job.threads.map(function(thread){
    //       return thread.toJSONFor(user);
    //     })});
    //   });
    // }).catch(next);
  });

module.exports = router;