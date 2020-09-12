var passport = require('passport');
var LocalSrategy = require('passport-local').Strategy;
var User = require('./models/user');

exports.local = passport.use(new LocalSrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());