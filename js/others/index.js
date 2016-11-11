import Vue from 'vue';

var vm = new Vue({
  el: '#test',
  data: {
    commentValue: '',
    comments: [],
  },
  methods: {
    'enterComment': function() {
      var value = this.$refs.input.value;
      socket.emit('comment', {
        comment: value
      });
      this.$refs.input.value = "";
    },
    getPosition: function(obj) {
      var height = this.$el.offsetHeight - 200;
      console.log(height);
      var top = height * Math.random();

      var runTime = Math.random() * 100;
      runTime = runTime > 4 ? runTime : 4;
      return {
        position: 'absolute',
        top: top + 'px',
        animation: 'myfirst ' + runTime + 's linear 2s infinite normal',
      }
    }
  }
});

function runtime(obj) {
  console.log(obj);
  // var timer = setInterval(function() {
  //   vm.runTime = Date.now();
  // }, 10000)
}


function postion(obj) {
  var height = 0;
  if (obj.top) {
    obj.right++;
  } else {
    obj['top'] = Math.random() * 100;
    obj['right'] = 0;
  }
}

var socket = io.connect('http://testnorman.leanapp.cn');
socket.on('showcomment', function(data) {
  vm.comments = data;
});

socket.emit('online', function(data) {
  vm.comments = data;
});

//wechat

// wx.config({
//   debug:true,
//   appId:'wx6dfed8c545aa39c3'
// })
