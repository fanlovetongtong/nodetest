import DayPicker from '../../vue/datePicker/datePicker.vue';
import Vue from 'vue';
var vm = new Vue({
  el: '#test',
  components: {
    'day-picker': DayPicker
  }

})
