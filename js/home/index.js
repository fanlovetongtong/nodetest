import Vuetest from "./vue/index.vue";
var Vue = require("Vue");

$(function() {
  _bind();

  function _bind() {
    var vm = new Vue({
      el: '#test',
      components: {
        'my-test': Vuetest
      }
    })
  }

})
