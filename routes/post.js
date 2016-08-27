var express = require('express');
var Mongoose = require('./db');
var router = express.Router();
var db = new Mongoose();

/* handle comments */
router.post('/comments/addComment', function(req, res, next) {
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

router.get('/comments/getComments', function(req, res, next){
  var reqParam = {title: req.query.title};

  if(!db.connection){
    db.connect();
    db.open(function(){
      getComments(reqParam, res);
    });
  }else{
    getComments(reqParam, res);
  }
});

router.post('/feedback', function(req, res, next){
  var reqParam = {
    title: req.body.title,
    type: req.body.feedback
  };

  if(!db.connection){
    db.connect();
    db.open(function(){
      addFeedback(reqParam, res);
    });
  }else{
    addFeedback(reqParam, res);
  }
});

function addFeedback(p, res){
  db.getNextSequence(p.title, 'Feedback', p.type).then(function(model){
    var ret = {};
    if(model.diao >= 0 || model.mengbi >= 0){
      ret['success'] = true;
      res.json(ret);
    }else{
      ret['success'] = false;
      ret['msg'] = '存入反馈失败';
      res.json(ret);
    }
  }, function(err){
    console.log(err);
  }).catch(function(err){
    ret['success'] = false;
    ret['msg'] = '存入反馈失败';
    res.json(ret);
    console.log(err);
  });
}

function addComment(p, res){
  db.getNextSequence('comments', 'Counters', 'seq').then(function(model){
      var ret = {};
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
      console.log(model.seq);
      ret['success'] = true;
      ret['data'] = {date: p.date, id: model.seq};
      res.json(ret);
    }, function(err){
      console.log(err);
    }).catch(function(err){
      ret['success'] = false;
      ret['msg'] = '评论失败';
      res.json(ret);
      console.log(err);
    }); 
}

function getComments(p, res){
  var query = {title: p.title};
  db.Model.find(query, 'date id content name site', function(err, docs){
      var ret = {};
      if(err){
        ret['success'] = false;
        ret['msg'] = err;
        res.json(ret);
        console.log(err);
      }else{
        ret['success'] = true;
        ret['data'] = docs;
        res.json(ret);
        // db.disconnect();
      }
    });
}

module.exports = router;
