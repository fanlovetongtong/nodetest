var AV = require('leanengine');
var ChatObj = AV.Object.extend('Chat');

function save(message) {
  var obj = new ChatObj();
  obj.set('content', message.content);
  obj.set('username', message.username);
  return obj.save();
}

function get() {
  var query = new AV.Query('Chat');
  query.select(['username', 'content']);
  return query.find();
}
var exp = {
  "Save": save,
  "Get": get
}
module.exports = exp;
