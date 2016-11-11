import Vue from 'vue'

// var socket = io.connect('http://localhost:3000');
var socket = io.connect('http://testnorman.leanapp.cn');

var username = window.localStorage.username;
if (username == undefined) {
  window.localStorage.username = "hello";
}
username = window.localStorage.username;
console.log(username);
socket.emit("join", username);


var vm = new Vue({
  el: '#test',
  data: {
    messages: [],
    enterValue: "",
    nickname: "",
  },
  methods: {
    enter: function() {
      var self = this;
      var username = self.nickname;
      if (!username) {
        username = "如花";
      }
      socket.emit('message', {
        username: username,
        content: self.enterValue
      })
      self.enterValue = "";
    }
  }
})



socket.on('msg', function(data) {
  var a = console.log(data);
  vm.messages = vm.messages.concat(data);
});

socket.on('sys', function(data) {
  console.log(data);
});
