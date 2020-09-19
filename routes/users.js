var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');
const cors = require('./cors');


const { route } = require('.');

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', cors.corWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) {
      return next(err);
    } else {
      res.statusCode = 200;
      res.setHeader('Content_type', 'application/json');
      res.json(users);
    }
  })
});

router.post('/signup', cors.corWithOptions, function(req,res,next) {
  User.register( new User({ username: req.body.username }), req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type','application/json');
      res.json({err: err});
    }
    else {
        if(req.body.firstname)
          user.firstname = req.body.firstname;
        if(req.body.firstname)
          user.lastname = req.body.lastname;
        user.save((err,user) => {
          if(err) {
            res.statusCode = 500;
            res.setHeader('Content-Type','application/json');
            res.json({err: err});
            return ;
          }
            passport.authenticate('local')(req, res, ()=>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json({success: true, status: 'Registration Successful!'});
          });
        }); 
    }
  });
});

router.post('/login', cors.corWithOptions, passport.authenticate('local'), (req, res) => {

  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type','application/json');
  res.json({success: true, token: token, status: 'You are Successfully Logged In'});
});

router.get('/logout',cors.corWithOptions, (req, res) => {
  if(req.session) {
    req.session.destroy();
    res.clearCookie('session');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in');
    err.status = 403;
    next(err);
  }
});

module.exports = router;
