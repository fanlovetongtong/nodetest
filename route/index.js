var app = require('express').Router();

app.get('/', function(req, res) {
  res.render('home/index');
})
module.exports = app;
