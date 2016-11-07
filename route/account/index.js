var app = require('express').Router();
var AV = require('leanengine');

function accountFilter(req, res, next) {
  var cookies = req.cookies;
  var hasCookie = false;
  for (var key in cookies) {
    console.log(key, cookies[key]);
    if (key == "expire" && cookies[key] > 0) {
      hasCookie = true;
    }
  }
  console.log('method',req.method);
  if(req.method.toLowerCase() =="get"){
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Pragma", "no-cache");
  }
  if (hasCookie) {

    var pathName = req.path;
    if (pathName == "/signout") {
      next();
    } else {
      res.redirect('/');
    }
  } else {
    next();
  }

}

app.use(accountFilter);
app.get('/signin', function(req, res) {

  res.render("account/signin");
});

app.get('/signup', function(req, res) {
  res.render("account/signup");
});

app.get('/signout', function(req, res) {
  console.log('sign out');
  res.cookie("expire", 0);
  res.redirect('/account/signin');
});

app.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  AV.User.logIn(username, password).then(function(loginedUser) {
    res.cookie("expire", 30000);
    res.cookie("accountId", loginedUser.id);
    res.json("success");
  }, function(error) {
    res.json("error");
  })
});

app.post('/signup', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var user = new AV.User();
  user.setUsername(username);
  user.setPassword(password);
  user.setEmail(username);
  user.signUp().then(function(loginedUser) {
    res.cookie("accountId", loginedUser.id);
    res.json("success");
  }, (function(error) {
    res.json("error");
  }));

});


module.exports = app;
