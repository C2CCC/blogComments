var express = require('express');
var Mongoose = require('./db');
var router = express.Router();

/* handle comments */
router.all('/', function(req, res, next) {
  var title = req.body.title,
      // date = ,
      date = req.body.date,
      // id = ,
      id = req.body.id,
      content = req.body.content,
      name = req.body.name,
      email = req.body.email,
      site = req.body.site || '';

  var db = new Mongoose();
  db.open(function(){
    var self = this;
    var doc = new db.Model({
      title: title,
      date: date,
      id: id,
      content: content,
      name: name,
      email: email,
      site: site
    });
    doc.save(function(){
      self.disconnect();
    });
  });
  res.send("success");
});

module.exports = router;
