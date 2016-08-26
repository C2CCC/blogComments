var express = require('express');
var Mongoose = require('./db');
var router = express.Router();
var db = new Mongoose();

/* handle comments */
router.post('/addComment', function(req, res, next) {
  var reqParam = { 
      title : req.body.title,
      // date = ,
      date : new Date(),
      // id = ,
      // id = req.body.id,
      content : req.body.content,
      name : req.body.name,
      email : req.body.email,
      site : req.body.site || null
    };
  
  if(!db.connection){
    db.connect();
    db.open(function(){
     addComment(reqParam, res);
   });
  }else{
    addComment(reqParam, res);
  }
});

router.get('/getComments', function(req, res, next){
  var reqParam = {title : req.query.title};

  if(!db.connection){
    db.connect();
    db.open(function(){
      getComments(reqParam, res);
    });
  }else{
    getComments(reqParam, res);
  }
});

function addComment(p, res){
  db.getNextSequence('comments').then(function(model){
      var doc = new db.Model({
        title: p.title,
        date: p.date,
        id: model.seq,
        content: p.content,
        name: p.name,
        email: p.email,
        site: p.site
      });
      doc.save(function(){
        // db.disconnect();
      });
      res.send("success");
    }).catch(function(err){
      console.log(err);
    }); 
}

function getComments(p, res){
  db.Model.find({title:p.title}, 'date id content name site', function(err, docs){
      if(err){
        console.log(err);
      }else{
        res.json(docs);
        // db.disconnect();
      }
    });
}

module.exports = router;
