var express = require('express');
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
  res.render('index', {
    title: 'hello'
  })
})
app.listen(3000);
