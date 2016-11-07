var express = require('express');
var path = require('path');
var AV = require('leanengine');
AV.init({
  appId: process.env.LEANCLOUD_APP_ID || 'llv7GCXCYzlYFIgzpoernzS1-gzGzoHsz',
  appKey: process.env.LEANCLOUD_APP_KEY || 'cvO67P2lTfnmmzTcb5tP3d6J',
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || 'p7ECk4LDzgxNhXCQBCAR3FhG'
});
var app = express();
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(AV.express());
app.get('/', function(req, res) {
  res.render('index', { currentTime: new Date() });
});
module.exports = app;
