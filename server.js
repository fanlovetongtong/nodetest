var express = require('express');
var app = require('./route');
// var app = express();

app.listen(process.env.LEANCLOUD_APP_PORT || 3000);
