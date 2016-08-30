var nodemailer = require('nodemailer');

var Mailer = function(){
  this.transport = nodemailer.createTransport('smtp://notifier%40c2ccc.space:@127.0.0.1:25');
  this.mailOptions = {
    from: 'c2ccc_blognotifier<notifier@c2ccc.space>',
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
