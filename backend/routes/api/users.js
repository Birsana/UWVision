var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var User = mongoose.model('User');
var auth = require('../auth');
const nodemailer = require('nodemailer')



var secret = require('../../config').secret; 


var router = express.Router();

const transport = nodemailer.createTransport({ //for emailer
    service: "Gmail",
    auth: {
      user: "testwwaterloovision@gmail.com",
      pass: "waterloovision"
    },
  });

sendConfirmationEmail = (username, email, confirmationCode) => { //sending the email
    console.log("Sending email");
    transport.sendMail({
    to: email,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
        <h2>Hello ${username},</h2>
        <p>Thank you for registering. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:5000/auth/confirm/${confirmationCode}> Click here</a>
        </div>`,
  }).catch(err => console.log(err));
};

router.post('/users/login', function(req, res, next){ //login
    if(!req.body.user.email){
      return res.status(422).json({errors: {email: "can't be blank"}});
    }
  
    if(!req.body.user.password){
      return res.status(422).json({errors: {password: "can't be blank"}});
    }

    User.find( {email: req.body.user.email}, function (err, results) {
        if (err) { return res.status(422).json({errors: {password: "can't be blank"}});
        }
        if (!results.length) {
            return res.status(422).json({errors: {email: "invalid email"}});
        } else {
            passport.authenticate('local', {session: false}, function(err, user, info){
                if(err){ return next(err); }
            
                if(user){
                  if(!user.confirmed){ //check if they confirmed email
                      return res.status(422).json({errors: {email: "you must confirm your email"}});
                  }
                  user.token = user.generateJWT();
                  // res.cookie('AuthToken', user.token); prob not needed
                  return res.json({user: user.toAuthJSON()});
                } else {
                  return res.status(422).json({errors: {password: "invalid password"}});
                }
              })(req, res, next);
        }
    })
  });

  router.get('/user', auth.required, function(req, res, next){ //pass token get user
    User.findById(req.payload.id).then(function(user){
      if(!user){ return res.sendStatus(401); } 
      return res.json({user: user.toAuthJSON()});
    }).catch(next);
  });

router.post('/users', function(req, res, next){ //signup
    var user = new User();
    
    user.username = req.body.user.username;
    user.email = req.body.user.email;
    user.setPassword(req.body.user.password);
    user.confirmationCode = jwt.sign({email: req.body.user.email}, secret);
  
    user.save().then(function(){
    sendConfirmationEmail(
            user.username,
            user.email,
            user.confirmationCode
    );
      return res.json({user: user.toAuthJSON()});
    }).catch(next);
  });

router.get('/confirm/:confirmationCode', async (req, res) => { //confirmed their email
    User.findOne({
        confirmationCode: req.params.confirmationCode,
      })
        .then((user) => {
          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }
    
          user.confirmed = true;
          console.log("Confirmed!")
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
          });
        })
        .catch((e) => console.log("error", e));
});

router.get("/isConfirmed/:username", function (req, res) {
  User.findOne({ username: req.params.username }).then((user) => {
    return res.send({status: user.confirmed})
  });
});

module.exports = router;