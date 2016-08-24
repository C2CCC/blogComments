var express = require('express');
var Mongoose = require('./db');
var router = express.Router();

/* handle comments */
router.all('/', function(req, res, next) {
  var title = req.body.title,
      date = ,
      id = ,
      content = req.body.content,
      name = req.body.name,
      email = req.body.email,
      site = req.body.site || '';
  var db = new Mongoose();
  db.open(function(){
    var doc = new this.Model({
      title: title,
      date: date,
      id: id,
      content: content,
      name: name,
      email: email,
      site: site
    });
    doc.save();
  });
});

module.exports = router;
