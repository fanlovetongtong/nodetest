var AV = require('leanengine');
var CommnetObj = AV.Object.extend('Comment');


function saveComment(comment) {
  var obj = new CommnetObj();
  obj.set('content', comment['comment']);
  return obj.save();
}

function getCommnets() {
  var query = new AV.Query('Comment');
  query.select(['content']);
  return query.find();
}
var exp = {
  "Save": saveComment,
  "Get": getCommnets
}
module.exports = exp;
