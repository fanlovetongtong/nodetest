var app = require('express').Router();
app.get('/', function(req, res) {
  res.render('interesting/index');
})
app.get('/chart', function(req, res) {
  res.render('chart/index');
})
module.exports = app;
