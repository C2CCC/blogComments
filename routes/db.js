var mongoose = require('mongoose');

var Mongoose = function(){
  this.mongoose = mongoose;
  this.schema = mongoose.Schema({
        title: String,
        date: Date,
        id: Number,
        content: String,
        name: String,
        email: String,
        site: String
    });
  this.counterSchema = mongoose.Schema({
    _id: String,
    seq: Number
  }); 
  this.feedbackSchema = mongoose.Schema({
    _id: String,
    diao: Number,
    mengbi: Number
  });
  this.Model = this.mongoose.model('comments', this.schema, 'comments');
  this.Counters = this.mongoose.model('counters', this.counterSchema, 'counters');
  this.Feedback = this.mongoose.model('feedback', this.feedbackSchema, 'feedback');
  this.init();
};

Mongoose.prototype = {
  init: function(){
  },

  connect: function(){
    mongoose.Promise = global.Promise;
    this.mongoose.connect('mongodb://localhost/blog-comments');
    this.connection = mongoose.connection;
  },

  disconnect: function(){
    this.connection.close();
  },

  open: function(cb){
    this.connection.on('error', console.error.bind(console, 'connection error:'));
    this.connection.once('open', cb);
  },

  getNextSequence: function(_id, collection, seqName){
    var self = this;
    return new Promise(function(resolve, reject){
      var incObj = {};
      incObj[seqName] = 1;
      var update = { $inc: incObj };
      self[collection].findByIdAndUpdate(_id, update, { new: true, upsert: true }, function(err, model){
        console.log(model);
        if(err){
          reject(err);
        }else{
          resolve(model);
        }
      });
    });    
  }
};

Mongoose.prototype.constructor = Mongoose;

module.exports = Mongoose;