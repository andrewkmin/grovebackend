var express = require('express');
// var session = require('express-session');
// var MongoStore = require('connect-mongo')(session);
var path = require('path');
var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var passport = require('passport');
// var LocalStrategy = require('passport-local');
var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI || "mongodb://grove:grove@ds137100.mlab.com:37100/grovebackend";

// var REQUIRED_ENV = "SECRET MONGODB_URI".split(" ");
//
// REQUIRED_ENV.forEach(function(el) {
//   if (!process.env[el]){
//     console.error("Missing required env var " + el);
//     process.exit(1);
//   }
// });

mongoose.connect(connect);

var models = require('./models/models');

var routes = require('./routes/routes');
var auth = require('./routes/auth');
var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// // Passport
// app.use(session({
//   secret: process.env.SECRET,
//   store: new MongoStore({ mongooseConnection: mongoose.connection })
// }));


// app.use(passport.initialize());
// app.use(passport.session());
//
// passport.serializeUser(function(user, done) {
//   done(null, user._id);
// });
//
// passport.deserializeUser(function(id, done) {
//   models.User.findById(id, done);
// });
//
// // passport strategy
// passport.use(new LocalStrategy(function(username, password, done) {
//   // Find the user with the given username
//   models.User.findOne({ username: username }, function (err, user) {
//     // if there's an error, finish trying to authenticate (auth failed)
//     if (err) {
//       console.error('Error fetching user in LocalStrategy', err);
//       return done(err);
//     }
//     // if no user present, auth failed
//     if (!user) {
//       return done(null, false, { message: 'Incorrect username.' });
//     }
//     // if passwords do not match, auth failed
//     if (user.password !== password) {
//       return done(null, false, { message: 'Incorrect password.' });
//     }
//     // auth has has succeeded
//     return done(null, user);
//   });
// }
// ));

app.use('/', auth());
app.use('/', routes());

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handlers
//
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }
//
// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
