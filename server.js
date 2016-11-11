var express = require('express');
var app = require('./route');
// var app = express();
//socket io
var server = app.listen(process.env.LEANCLOUD_APP_PORT || 3000);
var io = require('socket.io').listen(server);

//socket
var CommentService = require('./api/comment/index.js');


// var userNames=['帅哥1号'，'大美女二号'，'强哥一号'，'h我是哈哈哈'，'你猜我是谁'，66666’]
var ChatService = require('./api/chat/index.js');
io.on('connection', function(socket) {
  console.log(socket.request.headers.cookie)
  var roomID = "zhuoji";

  socket.on('join', function(userName) {
    //get history
    socket.join("zhuoji");
    socket.broadcast.in(roomID).emit('sys', userName + '加入了房间');
    socket.emit('sys', userName + '加入了房间');
    console.log(userName + '加入了' + roomID);
    ChatService.Get().then(function(result) {
      socket.broadcast.in(roomID).emit('msg', result);
      socket.emit('msg', result);
    })

  });

  socket.on('leave', function() {
    socket.emit('disconnect');
  });

  socket.on('message', function(msg) {
    console.log(msg);
    // 验证如果用户不在房间内则不给发
    ChatService.Save(msg).then(function() {
      console.log('save success')
    });
    var array =[msg];
    socket.broadcast.in(roomID).emit('msg', array);
    socket.emit('msg', array);
  });
  // socket.on('disconnect', function() {
  //   console.log('user disconnected')
  // })
  //
  // socket.on('online', function(data) {
  //   CommentService.Get().then(function(comments) {
  //     socket.emit('showcomment', comments);
  //   }, function(error) {
  //     console.log(error);
  //   })
  // })
  // socket.on('comment', function(data) {
  //   console.log(data);
  //   CommentService.Save(data).then(function(result) {
  //     console.log('save success', result.id);
  //   }, function(error) {
  //     console.log(error);
  //   }).then(function() {
  //     CommentService.Get().then(function(comments) {
  //       socket.broadcast.emit('showcomment', comments);
  //     }, function(error) {
  //       console.log(error);
  //     })
  //   });
  // });

  //聊天室






});
