var mongoose = require('mongoose');

var Mongoose = function(){
  this.mongoose = mongoose;
  this.db = mongoose.connection;
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
};

Mongoose.prototype = {
  connect: function(){
    mongoose.connect('mongodb://localhost/blog-comments');
  },

  open: function(cb){
    this.connect();
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', cb);
  }
};

Mongoose.prototype.constructor = Mongoose;

module.exports = Mongoose;