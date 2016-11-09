<style lang="sass">

.vue-date-picker {
    * {
        font-family: "Segoe UI";
        box-sizing: border-box;
    }
    li {
        user-select: none;
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
    .current-date {
        button {
            height: 40px;
            line-height: 40px;
            text-align: center;
            padding: 0;
            color: #222222;
            font-size: 0.875em;
            width: 100%;
            background: transparent;
            border: 0;
            border-top: 1px solid #e3e6e9;
            cursor: pointer;
        }
    }
}

</style>

<template lang="html">

<div class="vue-date-picker" ref="datePciker" v-on:click.stop>
    <div class="show-content">
        <input class="date-input" v-model.lazy.trim="formatTime" v-on:change="changeDate" ref="input" /><i class="show-icon" v-on:click.stop="showDrop">icon</i>
    </div>
    <div class="drop-down" v-show="isShow" v-on:mousedown.stop="handleClick">
        <picker-header :view-date="viewDate" v-on:selectDate="selectDate" :select-type="selectType" v-on:changeType="changeType"></picker-header>
        <day-picker :view-date="viewDate" v-on:selectDate="selectDate" v-if="selectType=='day'"></day-picker>
        <month-picker :view-date="viewDate" v-on:selectDate="selectDate" v-if="selectType=='month'"></month-picker>
        <year-picker :view-date="viewDate" v-on:selectDate="selectDate" v-if="selectType=='year'"></year-picker>
        <div class="current-date">
            <button v-on:click="selectDate(new Date(),'day',false)">Today</button>
        </div>
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
var MonthPicker = require('./monthPicker.vue');
var YearPicker = require('./yearPicker.vue');
import Header from './datePickerHeader.vue';
module.exports = {
    data: function() {
        return {
            title: "this is day-picker",
            isShow: false,
            formatTime: "2015-8-9",
            isCurrentDate: false,
            viewDate: new Date(2016, 10, 10),
            selectedDate: null,
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            selectType: "day"
        }
    },
    created: function() {
        var self = this;
        self.selectedDate = self.viewDate;
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
            if (this.selectedDate == null) {
                return ""
            } else {
                return formatDate(this.selectedDate);
            }
        }
    },
    filters: {

    },
    methods: {
        changeDate: function() {
            var value = String.trim(this.$refs.input.value);
            if (value == "") {
                this.viewDate = new Date();
                this.selectedDate = null;
            } else {
                var date = new Date(value);
                if (isNaN(Date.parse(date))) {
                    this.selectedDate = new Date(Date.parse(this.viewDate));
                } else {
                    this.selectedDate = this.viewDate = date;
                }
            }
        },
        changeType: function(type) {
            this.selectType = type;
        },
        showDrop: function() {
            this.isShow = !this.isShow;
        },

        handleClick: function() {
            this.$refs.datePciker.focus();
        },
        selectDate: function(date, nextType, isNeedChange) {
            this.viewDate = date;
            this.selectType = nextType;
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
        'day-picker': DayPicker,
        'month-picker': MonthPicker,
        'year-picker': YearPicker,
        'picker-header': Header
    }
}

</script>
