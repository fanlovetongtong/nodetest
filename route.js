//init
var express = require('express');
var path = require('path');
var AV = require('leanengine');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
AV.init({
  appId: process.env.LEANCLOUD_APP_ID || 'llv7GCXCYzlYFIgzpoernzS1-gzGzoHsz',
  appKey: process.env.LEANCLOUD_APP_KEY || 'cvO67P2lTfnmmzTcb5tP3d6J',
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || 'p7ECk4LDzgxNhXCQBCAR3FhG'
});
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(AV.express());
app.use(cookieParser());
app.use(bodyParser());
app.use(express.static('public'));
//route
var indexRoute = require('./route/index')
var accountRoute = require('./route/account/index');
var filter = require('./filter/authorizeFilter');
var plugin = require('./route/plugin/index');
var others = require('./route/others/index');

app.use('/account', accountRoute);
app.use(filter);
app.use(indexRoute);
app.use('/plugin', plugin);
app.use('/others', others);


module.exports = app;
