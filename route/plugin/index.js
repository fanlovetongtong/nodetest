var app = require('express').Router();
app.get('/', function(req, res) {
  res.render('plugin/index');
})
module.exports = app;
