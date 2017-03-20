/**
 * Module dependencies.
 */

var express = require('express')
  , fs = require('fs')
  , passport = require('passport');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load configurations
// if test env, load example file
// var env = process.env.NODE_ENV || 'development'
//   , config = require('./config/config')[env]
//   // , auth = require('./config/middlewares/authorization')
//   , auth = "mongodb://grove:grove@ds137100.mlab.com:37100/grovebackend"
//   , mongoose = require('mongoose');

var mongoose = require('mongoose')

// Bootstrap db connection
mongoose.connect("mongodb://grove:grove@ds137100.mlab.com:37100/grovebackend");

// Bootstrap models
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file);
});

// bootstrap passport config
require('./config/passport')(passport, config);

var app = express();
// express settings
require('./config/express')(app, config, passport);

// Bootstrap routes
require('./config/routes')(app, passport, auth);

// Start the app by listening on <port>
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express app started on port '+port);

// expose app
exports = module.exports = app;
