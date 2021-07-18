var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var User = mongoose.model('User');
var auth = require('../auth');
const nodemailer = require('nodemailer')
const { google } = require("googleapis");



var secret = require('../../config').secret; 
var router = express.Router();


const transport = nodemailer.createTransport({ //for emailer
    service: "Zoho",
    host: "smtp.zoho.com",
    secure: true,
    port: 465,
    auth: {
      user: "info@uwvision.com",
      pass: "AndreCyrusJustin123$"
    },
  });


sendConfirmationEmail = async (username, email, confirmationCode) => { //sending the email
    // let transport = await createTransporter();
    transport.sendMail({
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
            <h2>Hello ${username},</h2>
            <p>Thank you for registering. Please confirm your email by clicking on the following link</p>
            <a href=https://www.uwvision.com/auth/confirm/${confirmationCode}> Click here</a>
            </div>`,
  }).catch(err => console.log(err));
};

sendForgotPasswordEmail = async (username, email, passwordToken) => {
    // let transport = await createTransporter();
    transport.sendMail({
            from: '"UWVision Team" <info@uwvision.com>',
            to: email,
            subject: "UWVision Password Reset",
            html: `<h1>Password Reset</h1>
                <h2>Hello ${username},</h2>
                <p>Please reset your password by clicking on the following link</p>
                <a href=https://www.uwvision.com/forgotPassword/${passwordToken}> Click here</a>
                </div>`,
      }).catch(err => console.log(err));
}

router.post('/users/login', function(req, res, next){ //login
    User.find( {email: req.body.user.email}, function (err, results) {
        if (err) { return res.status(422).json({errors: {error: "an error occured"}});
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
                  return res.json({user: user.toAuthJSON()});
                } else {
                  return res.status(422).json({errors: {password: "invalid password"}});
                }
              })(req, res, next);
        }
    })
  });

  router.get('/user', auth.required, function(req, res, next){ //pass token to get corresponding user
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
    user.hasResetPasswordToken = false;
    user.resetPasswordToken = "";
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

router.get('/confirm/:confirmationCode', async (req, res) => { //to confirm email
    User.findOne({
        confirmationCode: req.params.confirmationCode,
      })
        .then((user) => {
          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }
          user.confirmed = true;
          
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            return res.redirect("https://www.uwvision.com/"); 
          });
        })
        .catch((e) => console.log("error", e));
});

router.post('/forgotpassword/:passwordCode', async (req, res) => { //to reset password email
    User.findOne({
        resetPasswordToken: req.params.passwordCode,
      })
        .then((user) => {
          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }
          if(!user.hasResetPasswordToken){
              return res.send("error");
          }

          user.setPassword(req.body.password);
          user.hasResetPasswordToken = false;
          return user.save().then(function() {
            return res.send("success");  
          })
        })
        .catch((e) => console.log("error", e));
});

router.get("/isconfirmed/:username", function (req, res) {
  User.findOne({ username: req.params.username }).then((user) => { 
    return res.send({status: user.confirmed})
  });
});

router.post('/sendresetemail', function(req, res){ //forgot password

    User.findOne({email: req.body.email}).then(function(user) {
        if(user == null){
            return res.status(404).send({ message: "Email Not Found." });
        }
        user.hasResetPasswordToken = true;
        user.resetPasswordToken = jwt.sign({email: req.body.email}, secret);
        user.save().then(function() {
            sendForgotPasswordEmail(
                user.username,
                user.email,
                user.resetPasswordToken
            )
            res.send("email sent");
        })
    });
  });

module.exports = router;