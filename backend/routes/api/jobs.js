var mongoose = require('mongoose');
var express = require('express');
var auth = require('../auth');

var router = express.Router();

var User = mongoose.model('User');
var Company = mongoose.model('Company');
var Job = mongoose.model('Job');
var Question = mongoose.model('InterviewQuestion');
var Salary = mongoose.model('Salary');
var Review = mongoose.model('Review');


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
                res.send(question);
              });
          });
        }).catch(next);
    }).catch(next);
});

// upvote/downvote interview question
router.post('/:companyname/:job/question/:question', auth.required, function(req, res, next) {
    User.findById(req.payload.id).then(function(user){
        Question.findById(req.params.question).then(function(question){
            if(!user){ return res.sendStatus(401); }
            var index = question.upvoters.indexOf(user.id)
            if(index !== -1){
                question.upvoters.splice(index, 1);
                return question.save().then(function() {
                    var questionIndex = user.upvotedQuestions.indexOf(question.id);
                    user.upvotedQuestions.splice(questionIndex, 1);
                    return user.save().then(function() {
                        res.send("removed upvote");
                    })
                })
            } else {
                question.upvoters.push(user)
                    return question.save().then(function() {
                        user.upvotedQuestions.push(question);
                        return user.save().then(function() {
                            res.send("upvoted");
                        })
                    });
            }
            
          }).catch(next);
    }).catch(next);
});

//get all interview questions for a job

router.get('/:companyname/:job/questions', auth.optional, function(req, res, next) {
    Job.find( {jobName: req.params.job, company: req.params.companyname} ).then( async function(job){

        var retArr = [];
        if(req.payload != null && req.payload.id != null){
            User.findById(req.payload.id).then(async function(user){
                
                const upvotedSet = new Set();
                for (let i = 0; i < user.upvotedQuestions.length; i++) {
                    upvotedSet.add(user.upvotedQuestions[i].toString())
                }
    
                for(var i = 0; i < job[0].questions.length; ++i){
                    await Question.findById(job[0].questions[i]).then(function(question){
                        retArr.push(question.toJSONFor(upvotedSet.has(question.id)));
                    }).catch(next);
                }
                res.send(retArr);
            }).catch(next);
        } else {
            for(var i = 0; i < job[0].questions.length; ++i){
                await Question.findById(job[0].questions[i]).then(function(question){
                retArr.push(question.toJSONFor(false));
                }).catch(next);
            }
            res.send(retArr);
        }
    }).catch(next);
});

//add salary for a job
router.post('/:companyname/:job/salary', auth.required, function(req, res, next) {
    User.findById(req.payload.id).then(function(user){
      if(!user){ return res.sendStatus(401); }

      var jobCompanyKey = req.params.job + req.params.companyname
      var postedSalarySet = new Set(user.jobsPostedSalary);
      if (postedSalarySet.has(jobCompanyKey)){
          return res.send("already posted");
      }
  

      var salary = new Salary(req.body.salary);
      salary.addedBy = user.email;

      Job.find( {jobName: req.params.job, company: req.params.companyname} ).then(function(job){
        return salary.save().then(function() {
            var averageSalary = (job[0].averageSalary * job[0].salaries.length + salary.wage)/(job[0].salaries.length+1);
            job[0].averageSalary = Math.round(averageSalary * 10)/10;
            job[0].salaries.push(salary);
            return job[0].save().then(function() {
                Company.find( {companyName: req.params.companyname} ).then(function(company){
                    var companySalary = (company[0].averageSalary * company[0].numSalaries + salary.wage)/(company[0].numSalaries + 1);
                    company[0].averageSalary = Math.round(companySalary * 10)/10;
                    company[0].numSalaries += 1;
                    return company[0].save().then(function() {
                        
                        user.jobsPostedSalary.push(jobCompanyKey);
                        
                        return user.save().then(function() {
                            res.send(salary);
                        });

                    })
                });
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
        res.send(retArr);
    }).catch(next);
});

function calculateAverageRatingFields(currAverage, numEntries, newEntry){
    var totalRating = (currAverage * numEntries + newEntry)/(numEntries + 1);
    return Math.round(totalRating * 10)/10;
}

//add review for a job

router.post('/:companyname/:job/review', auth.required, function(req, res, next) {
    User.findById(req.payload.id).then(function(user){
      if(!user){ return res.sendStatus(401); }

      var jobCompanyKey = req.params.job + req.params.companyname
      var postedReviewSet = new Set(user.jobsPostedReview); 
      if (postedReviewSet.has(jobCompanyKey)){
          return res.send("already posted");
      }
  
      var review = new Review(req.body.review);
      review.author = user.email;

      Job.find( {jobName: req.params.job, company: req.params.companyname} ).then(function(job){
        return review.save().then(function() {

            job[0].averageRating = calculateAverageRatingFields(job[0].averageRating, job[0].reviews.length, review.overallRating);
            job[0].averageCulture = calculateAverageRatingFields(job[0].averageCulture, job[0].reviews.length, review.culture);
            job[0].averageWorklife = calculateAverageRatingFields(job[0].averageWorklife, job[0].reviews.length, review.workLifeBalance);
            job[0].averageInteresting = calculateAverageRatingFields(job[0].averageInteresting, job[0].reviews.length, review.interestingWork);

            job[0].reviews.push(review);

            job[0].save().then(function() {

                Company.find( {companyName: req.params.companyname} ).then(function(company){
                    var companyRating = (company[0].averageRating * company[0].numReviews + review.overallRating)/(company[0].numReviews + 1);
                    company[0].averageRating = Math.round(companyRating * 10)/10;
                    company[0].numReviews += 1;
                    return company[0].save().then(function() {
                        user.jobsPostedReview.push(jobCompanyKey);
                        return user.save().then(function() {
                            res.send(review);
                        });
                    })
                });
              });
          });
        }).catch(next);
    }).catch(next);
});

// upvote review
router.post('/:companyname/:job/review/:review', auth.required, function(req, res, next) {
    User.findById(req.payload.id).then(function(user){
        Review.findById(req.params.review).then(function(review){
            if(!user){ return res.sendStatus(401); }
            var index = review.upvoters.indexOf(user.id)
            if(index !== -1){
                review.upvoters.splice(index, 1);
                return review.save().then(function() {
                    var reviewIndex = user.upvotedReviews.indexOf(review.id);
                    user.upvotedReviews.splice(reviewIndex, 1);
                    return user.save().then(function() {
                        res.send("removed upvote");
                    })
                })
            } else {
                review.upvoters.push(user)
                    return review.save().then(function() {
                        user.upvotedReviews.push(review);
                        return user.save().then(function() {
                            res.send("upvoted");
                        })
                    });
            }
            
          }).catch(next);
    }).catch(next);
});

//get all reviews for a job
router.get('/:companyname/:job/reviews', auth.optional, function(req, res, next) {
    Job.find( {jobName: req.params.job, company: req.params.companyname} ).then( async function(job){
        var retArr = [];

        if(req.payload != null && req.payload.id != null){
            User.findById(req.payload.id).then(async function(user){
                
                const upvotedSet = new Set();
                for (let i = 0; i < user.upvotedReviews.length; i++) {
                    upvotedSet.add(user.upvotedReviews[i].toString())
                }
    
                for(var i = 0; i < job[0].reviews.length; ++i){
                    await Review.findById(job[0].reviews[i]).then(function(review){
                        retArr.push(review.toJSONFor(upvotedSet.has(review.id)));
                    }).catch(next);
                }

                res.send(retArr);
            }).catch(next);
        } else {
            for(var i = 0; i < job[0].reviews.length; ++i){
                await Review.findById(job[0].reviews[i]).then(function(review){
                    retArr.push(review.toJSONFor(false));
                }).catch(next);
            }
            res.send(retArr);
        }
    }).catch(next);
});

//get overall ratings for a job and number of reviews
router.get('/:companyname/:job/rating', auth.optional, function(req, res, next) {
    Job.find( {jobName: req.params.job, company: req.params.companyname} ).then( async function(jobs){
        var ratingArr = [];
        var job = jobs[0];
        ratingArr.push(job.averageRating, job.averageCulture, job.averageWorklife, job.averageInteresting, job.reviews.length);
        res.send(ratingArr);
    }).catch(next);
});

//save job
router.post('/:companyname/:job/save', auth.required, function(req, res, next) {
    User.findById(req.payload.id).then(function(user){
        Job.find( {jobName: req.params.job, company: req.params.companyname} ).then( async function(job){
            var index = user.savedJobs.indexOf(job[0].id)
            if (index !== -1) {
                user.savedJobs.splice(index, 1);
                return user.save().then(function() {
                    res.send("job unsaved")
                })
            } else {
                user.savedJobs.push(job[0])
                return user.save().then(function() {
                    res.send("job saved")
                })
            }
        }).catch(next);
        
    }).catch(next);
});

//view saved jobs

router.get('/savedjobs', auth.required, async function(req, res, next) {
    User.findById(req.payload.id).then(async function(user){
        if(!user){ return res.sendStatus(401); } 

        // Create map with (companyName -> [saved jobs for that company])
        const jobMap = {};
        for (let i = 0; i < user.savedJobs.length; i++) {
            await Job.findById(user.savedJobs[i]).then((job) => {
                if (!jobMap[job.company]) {
                    jobMap[job.company] = [];
                }
                jobMap[job.company].push(job.toJSONFor());
            });
        }
        
        // Return map of saved jobs
        res.send(jobMap);
      }).catch(next);
});



module.exports = router;