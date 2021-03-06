var mongoose = require('mongoose');
var express = require('express')
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('../auth');


var router = express.Router();

const EMAIL_SECRET = 'fhgiurhgeriiuhviudsui32igusg34828643gs';

router.post('/users/login', function(req, res, next){
    if(!req.body.user.email){
      return res.status(422).json({errors: {email: "can't be blank"}});
    }
  
    if(!req.body.user.password){
      return res.status(422).json({errors: {password: "can't be blank"}});
    }

    passport.authenticate('local', {session: false}, function(err, user, info){
      if(err){ return next(err); }
  
      if(user){
        if(!user.confirmed){ //check if they confirmed email
            return res.status(422).json({errors: {email: "you must confirm your email"}});
        }
        user.token = user.generateJWT();
        return res.json({user: user.toAuthJSON()});
      } else {
        return res.status(422).json(info);
      }
    })(req, res, next);
  });

  router.get('/user', auth.required, function(req, res, next){
      console.log(req.payload.id);
    User.findById(req.payload.id).then(function(user){
      if(!user){ return res.sendStatus(401); }
  
      return res.json({user: user.toAuthJSON()});
    }).catch(next);
  });

router.post('/users', function(req, res, next){
    var user = new User();
  
    user.username = req.body.user.username;
    user.email = req.body.user.email;
    user.setPassword(req.body.user.password);
  
    user.save().then(function(){
      return res.json({user: user.toAuthJSON()});
    }).catch(next);
  });

router.get('/confirmation/:token', async (req, res) => {
    try {
      const { user: { id } } = jwt.verify(req.params.token, EMAIL_SECRET);
      await models.User.update({ confirmed: true }, { where: { id } });
    } catch (e) {
      res.send('error');
    }
  
    return res.redirect('http://localhost:5000/auth/users/login');
});



module.exports = router;