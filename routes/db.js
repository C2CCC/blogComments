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
  this.Model = this.mongoose.model('comments', this.schema);
  this.init();
};

Mongoose.prototype = {
  init: function(){
    this.connect();
  },

  connect: function(){
    this.connection = mongoose.createConnection('mongodb://localhost/blog-comments');
  },

  disconnect: function(){
    this.connection.close();
  },

  open: function(cb){
    this.connection.on('error', console.error.bind(console, 'connection error:'));
    this.connection.once('open', cb);
  }
};

Mongoose.prototype.constructor = Mongoose;

module.exports = Mongoose;