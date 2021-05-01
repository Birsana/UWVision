var mongoose = require('mongoose');
var express = require('express');
var jwt = require('jsonwebtoken');
var auth = require('../auth');


var router = express.Router();

var User = mongoose.model('User');
var Job = mongoose.model('Job');
var Thread = mongoose.model('Thread');
var Reply = mongoose.model('Reply');
var Question = mongoose.model('InterviewQuestion');

//create thread
router.post('/:companyname/:job/threads', auth.required, function(req, res, next) {
    User.findById(req.payload.id).then(function(user){
      if(!user){ return res.sendStatus(401); }
  
      var thread = new Thread(req.body.thread);
      thread.job = req.job;
      thread.company = req.params.companyname;
      thread.author = user.email;
  
      return thread.save().then(function(){
        Job.find( {job_name: req.params.job} ).then(function(job){
            job[0].threads.push(thread);
            return job[0].save().then(function(job) {
                console.log("saved");
                res.send("thread added");
              });
        }).catch(next);
      });
    }).catch(next);
});

//get threads for job
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

  //create reply to thread
router.post('/:thread/replies', auth.required, function(req, res, next) {
    User.findById(req.payload.id).then(function(user){
      if(!user){ return res.sendStatus(401); }
      var reply = new Reply(req.body.reply);
      reply.author = user.email;
      Thread.find( {slug: req.params.thread} ).then(function(thread){
        reply.thread = thread[0];
        console.log(thread[0]);
        return reply.save().then(function() {
            thread[0].replies.push(reply);
            console.log("saved");
            res.send("reply added")
          });
        }).catch(next);
    }).catch(next);
});

//get replies to thread
router.get('/:thread/replies', auth.required, function(req, res, next) {
    Thread.find( {slug: req.params.thread} ).then( async function(thread){
        var retArr = [];
        console.log(thread);
        for(var i = 0; i < thread[0].replies.length; ++i){
            await Reply.findById(thread[0].threads[i]).then(function(reply){
            retArr.push(reply.toJSONFor());
        }).catch(next);
        }
        console.log(retArr);
        res.send(retArr);
    }).catch(next);
});

//post interview question
router.post('/:companyname/:job/question', auth.required, function(req, res, next) {
    User.findById(req.payload.id).then(function(user){
      if(!user){ return res.sendStatus(401); }
  
      var question = new Question(req.body.question);
      question.author = user.email;
      Job.find( {job_name: req.params.job, company: req.params.companyname} ).then(function(job){
        question.job = job[0];
        return question.save().then(function() {
            job[0].questions.push(question);
            return job[0].save().then(function(job) {
                console.log("saved");
                res.send("question added");
              });
          });
        }).catch(next);
    }).catch(next);
});

//fetch all interview questions for a job

router.get('/:companyname/:job/questions', auth.required, function(req, res, next) {
    Job.find( {job_name: req.params.job, company: req.params.companyname} ).then( async function(job){
        console.log(job[0]);
        var retArr = [];
        for(var i = 0; i < job[0].questions.length; ++i){
            await Question.findById(job[0].questions[i]).then(function(question){
            retArr.push(question.toJSONFor());
        }).catch(next);
        }
        console.log(retArr);
        res.send(retArr);
    }).catch(next);
});

module.exports = router;