var express = require('express');
var router = express.Router();
var models = require('../models/models');
var User = models.User;
var Category = models.Category;
var Friend = models.Friend;

// THE WALL - anything routes below this are protected!
router.use(function(req, res, next){
  if (!req.user) {
    res.redirect('/login');
  } else {
    return next();
  }
});

router.post('/categories/new', function(req, res) {
  var newCategory = new Category({
    userId: req.user._id,
    catName: req.body.catName,
    friends: []
  });
});

// add friend to a category
router.post('/categories/addFriend/:catName', function(req, res) {
  Category.findOneAndUpdate({
    userId: req.user._id,
    catName: req.params.catName,
    friends: friends.concat(req.body.newFriend)
    // newFriend should be an object
  }, function(req, res){
    res.redirect('/categories/' + req.params.catName)
  });
});

router.post('/friends/new', function(req, res) {
  var newFriend = new Friend({
    userId: req.user._id,
    fname: req.body.fname,
    lname: req.body.lname
  });
});

module.exports = router;
