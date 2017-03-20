var mongoose = require('mongoose');
// Create a connect.js inside the models/ directory that
// exports your MongoDB URI!
var connect = "mongodb://grove:grove@ds137100.mlab.com:37100/grovebackend";
// process.env.MONGODB_URI || require('../config.js').MONGODB_URI;


var userSchema = new mongoose.Schema({
  // userId provided by mongo and referred to later
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  fname: {
    type: String
  },
  lname: {
    type: String
  },
  friends: {
    type: Array
  }
});

// friends collection: collection of friend objects
var friendSchema = new mongoose.Schema({
  // friend ID is given by MongoDB
  userId: {
    type: String,
    required: true
  },
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String
  },
  company: {
    type: String
  },
  personality: {
    type: String
  },
  sentiment: {
    type: String
  },
  interests: {
    type: String
  },
  met: {
    type: String
  },
  action items: {
    type: String
  },
  notes: {
    type: String
  }
});

// BUCKETS
var categorySchema = new mongoose.Schema({
  // we need category ID: will be provided by Mongo.
  userId: { // should point back to original user
    type: String
  },
  catType: {
    type: String
  },
  catName: { // name of category
    type: String
    // need validation to have a name; otherwise "untitled"
  },
  friends: { // array of IDs
    type: Array
  }
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Friend: mongoose.model('Friend', friendSchema),
  Category: mongoose.model('Category', categorySchema)
};
