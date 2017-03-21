var mongoose = require('mongoose');
// Create a connect.js inside the models/ directory that
// exports your MongoDB URI!
var connect = "mongodb://grove:grove@ds137100.mlab.com:37100/grovebackend";
// process.env.MONGODB_URI || require('../config.js').MONGODB_URI;


var userSchema = new mongoose.Schema({
  // userId provided by mongo and referred to later
  email: {
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
  // _id is given by MongoDB
  userId: {
    type: String
  },
  fname: {
    type: String
  }
  lname: {
    type: String
  }
  email: {
    type: String
  }
  tags: {
    cat1: [],
    cat2: [],
    notes: {
      type: String
    }
  }
});

// BUCKETS
var categorySchema = new mongoose.Schema({
  // we need category ID: _id will be provided by Mongo.
  userId: { // should point back to original user
    type: String
  },
  tags: {
    cat1: [],
    cat2: []
  }
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Friend: mongoose.model('Friend', friendSchema),
  Category: mongoose.model('Category', categorySchema)
};
