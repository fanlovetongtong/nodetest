function authorize(req, res, next) {
  var cookies = req.cookies;
  var hasCookie = false;
  for (var key in cookies) {
      console.log(key,cookies[key]);
    if (key == "expire" && cookies[key] > 0) {
      hasCookie = true;
    }
  }
  if (hasCookie) {
    res.cookie("expire", 30000);
    next();
  } else {
    res.redirect("account/signin");
  }
}
module.exports = authorize;
