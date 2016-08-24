var express = require('express');
var Mongoose = require('./db');
var router = express.Router();

/* handle comments */
router.post('/', function(req, res, next) {
  Mongoose.open(function(){
    
  });
});

module.exports = router;
