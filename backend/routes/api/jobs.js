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
var Salary = mongoose.model('Salary');
var Review = mongoose.model('Review');

//create thread
router.post('/:companyname/:job/thread', auth.required, function(req, res, next) {
    User.findById(req.payload.id).then(function(user){
      if(!user){ return res.sendStatus(401); }
  
      var thread = new Thread(req.body.thread);
      console.log(thread)
      thread.job = req.job;
      thread.company = req.params.companyname;
      thread.author = user.username;
  
      return thread.save().then(function(){
        Job.find( {jobName: req.params.job} ).then(function(job){
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
    Job.find( {jobName: req.params.job, company: req.params.companyname} ).then( async function(job){
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
router.post('/:thread/reply', auth.required, function(req, res, next) {
    User.findById(req.payload.id).then(function(user){
      if(!user){ return res.sendStatus(401); }
      var reply = new Reply(req.body.reply);
      reply.author = user.username;
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
router.get('/:thread/replies', auth.optional, function(req, res, next) {
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
      Job.find( {jobName: req.params.job, company: req.params.companyname} ).then(function(job){
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

// upvote interview question
router.post('/:companyname/:job/question/:question', auth.required, function(req, res, next) {
    User.findById(req.payload.id).then(function(user){
        Question.findById(req.params.question).then(function(question){
            if(!user){ return res.sendStatus(401); }
            question.upvoters.push(user)
            console.log(question)
            return question.save().then(function() {
                res.send("upvoted")
              });
            
          }).catch(next);
    }).catch(next);
});

//get all interview questions for a job

router.get('/:companyname/:job/questions', auth.optional, function(req, res, next) {
    Job.find( {jobName: req.params.job, company: req.params.companyname} ).then( async function(job){
        console.log(job[0]);
        var retArr = [];
        for(var i = 0; i < job[0].questions.length; ++i){
            await Question.findById(job[0].questions[i]).then(function(question){
            retArr.push(question.toJSONFor());
        }).catch(next);
        }
        retArr.sort((a, b) => (a.upvoters.length < b.upvoters.length) ? 1 : -1)
        console.log(retArr)
        res.send(retArr);
    }).catch(next);
});

//add salary for a job
router.post('/:companyname/:job/salary', auth.required, function(req, res, next) {
    User.findById(req.payload.id).then(function(user){
      if(!user){ return res.sendStatus(401); }
  
      var salary = new Salary(req.body.salary);
      salary.added_by = user.email;
      Job.find( {jobName: req.params.job, company: req.params.companyname} ).then(function(job){
        return salary.save().then(function() {
            var averageSalary = (job[0].averageSalary * job[0].salaries.length + salary.wage)/(job[0].salaries.length+1);
            job[0].averageSalary = Math.round(averageSalary * 10)/10;
            job[0].salaries.push(salary);
            return job[0].save().then(function() {
                console.log("saved");
                res.send("salary added");
              });
          });
        }).catch(next);
    }).catch(next);
});

//get all salaries for a job

router.get('/:companyname/:job/salaries', auth.optional, function(req, res, next) {
    Job.find( {jobName: req.params.job, company: req.params.companyname} ).then( async function(job){
        var retArr = [];
        for(var i = 0; i < job[0].salaries.length; ++i){
            await Salary.findById(job[0].salaries[i]).then(function(salary){
            retArr.push(salary.toJSONFor());
        }).catch(next);
        }
        console.log(retArr);
        res.send(retArr);
    }).catch(next);
});

//add review for a job

router.post('/:companyname/:job/review', auth.required, function(req, res, next) {
    User.findById(req.payload.id).then(function(user){
      if(!user){ return res.sendStatus(401); }
  
      var review = new Review(req.body.review);
      review.author = user.email;
      var totalRating = review.culture + review.interestingWork + review.workLifeBalance;
      var overallRating = Math.round(totalRating/3 * 10)/10;
      review.overallRating = overallRating;
      Job.find( {jobName: req.params.job, company: req.params.companyname} ).then(function(job){
        return review.save().then(function() {
            var rating = (job[0].averageRating * job[0].reviews.length + review.overallRating)/(job[0].reviews.length+1);
            job[0].averageRating = Math.round(rating * 10)/10;
            job[0].reviews.push(review);
            console.log(job[0].averageRating);
            return job[0].save().then(function() {
                console.log("saved");
                res.send("rating added");
              });
          });
        }).catch(next);
    }).catch(next);
});

//get all reviews for a job, MAYBE JUST ONES WITH BODY
router.get('/:companyname/:job/reviews', auth.optional, function(req, res, next) {
    Job.find( {jobName: req.params.job, company: req.params.companyname} ).then( async function(job){
        var retArr = [];
        for(var i = 0; i < job[0].reviews.length; ++i){
            await Review.findById(job[0].reviews[i]).then(function(review){
            retArr.push(review.toJSONFor());
        }).catch(next);
        }
        console.log(retArr);
        res.send(retArr);
    }).catch(next);
});

//get overall rating for a job and number of reviews
router.get('/:companyname/:job/rating', auth.optional, function(req, res, next) {
    Job.find( {jobName: req.params.job, company: req.params.companyname} ).then( async function(job){
        var totalRating = 0;
        for(var i = 0; i < job[0].reviews.length; ++i){
            await Review.findById(job[0].reviews[i]).then(function(review){
                totalRating += review.overallRating;
        }).catch(next);
        }
        var averageRating = Math.round(totalRating/job[0].reviews.length * 10)/10;
        var ratingArr = [];
        ratingArr.push(averageRating, job.reviews.length);
        res.send(ratingArr);
    }).catch(next);
});


module.exports = router;