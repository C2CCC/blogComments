var nodemailer = require('nodemailer');

var Mailer = function(){
  this.transport = nodemailer.createTransport('smtps://c2ccc_blogNotifier%40163.com:BlogblogBlog163@smtp.163.com');
  this.mailOptions = {
    from: 'c2ccc_blognotifier<c2ccc_blognotifier@163.com>',
    to: 'azureternite@live.com',
    subject: 'You\'ve got new comment'
  };
  this.init();
};

Mailer.prototype = {
  init: function(){

  },
  setContent: function(html){
    this.mailOptions['html'] = html;
  },
  sendMail: function(){
    this.transport.sendMail(this.mailOptions, function(err, info){
      if(err){
        return console.log(err);
      }
      console.log('Message sent: ' + info.response);
    });
  }
};

Mailer.prototype.constructor = Mailer;

module.exports = Mailer;
