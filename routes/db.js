var mongoose = require('mongoose');

var Mongoose = function(){

};

Mongoose.prototype = {
  connect: function(){
    mongoose.connect('mongodb://localhost/blog-comments');
  },

  open: function(cb){
    this.connect();
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', cb);
  }
};

Mongoose.prototype.constructor = Mongoose;

module.exports = Mongoose;