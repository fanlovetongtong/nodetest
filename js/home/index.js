import Vuetest from "../../vue/index.vue";
import Vue from 'vue'
var vm = new Vue({
  el: '#test',
  data:{
    hello:'nihao'
  },
  components:{
    'my-test':Vuetest
  }
})
