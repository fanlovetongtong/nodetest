<style lang="sass">

.vue-date-picker {
    * {
        font-family: "Segoe UI";
        box-sizing: border-box;
    }
    .drop-down {
        position: absolute;
        border: 1px solid #e3e6e9;
        width: 220px;
    }
    .day-picker-header {
        text-align: center;
        position: relative;
        height: 36px;
        line-height: 36px;
        background-color: #5fb554;
        cursor: pointer;
        color: #fff;
    }
}

</style>

<template lang="html">

<div class="vue-date-picker" ref="datePciker" v-on:click.stop>
    <div class="show-content">
        <input class="date-input" v-model.lazy.trim="formatTime" v-on:change="changeDate" ref="input" /><i class="show-icon" v-on:click.stop="showDrop">icon</i>
    </div>
    <div class="drop-down" v-show="isShow" v-on:mousedown.stop="handleClick">
        <div class="day-picker-header">
            <span>{{viewDate.getFullYear()}}</span>
            <span>{{months[viewDate.getMonth()]}}</span>
        </div>
        <day-picker :view-date="viewDate" v-on:selectDate="selectDate" v-on:closeProp="closePorp"></day-picker>
    </div>
</div>

</template>

<script>

function contains(parentNode, childNode) {
    if (parentNode.contains) {
        return parentNode != childNode && parentNode.contains(childNode);
    } else {
        return !!(parentNode.compareDocumentPosition(childNode) & 16);
    }
}

function formatDate(date) {
    var year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();
    if (isNaN(year)) {} else {}
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }

    return year + '-' + month + '-' + day;
}
var DayPicker = require('./dayPicker.vue');
module.exports = {
    data: function() {
        return {
            title: "this is day-picker",
            isShow: false,
            formatTime: "2015-8-9",
            isCurrentDate: false,
            viewDate: new Date(2016, 10, 10),
            selectedDate: new Date(2016, 10, 10),
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        }
    },
    created: function() {
        var self = this;
        // this.viewDate = this.selectDate;
        window.document.onmousedown = function(e) {
            let event = e || window.event;
            if (self.$refs.datePciker == event.target) {
                return;
            }
            if (contains(self.$refs.datePciker, event.target)) {
                return;
            }
            self.isShow = false;
        }
    },
    mounted: function() {},
    computed: {
        formatTime: function() {
            return formatDate(this.selectedDate);
        }
    },
    filters: {

    },
    methods: {
        changeDate: function() {
            var value = this.$refs.input.value;
            var date = new Date(value);
            if (isNaN(Date.parse(date))) {
                this.selectedDate = new Date(Date.parse(this.viewDate));
            } else {
                this.selectedDate = this.viewDate = date;
            }
        },
        showDrop: function() {
            this.isShow = !this.isShow;
        },

        handleClick: function() {
            this.$refs.datePciker.focus();
        },
        selectDate: function(date, isNeedChange) {
            this.viewDate = date;
            if (isNeedChange) {
                this.selectedDate = this.viewDate;
                this.isShow = false;
            }
        },
        closePorp: function() {
            this.isShow = false;
        }
    },
    components: {
        'day-picker': DayPicker
    }
}

</script>
