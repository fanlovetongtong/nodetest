<style lang="sass">

.day-picker {
    * {
        font-family: "Segoe UI";
        box-sizing: border-box;
    }
    background: #fff;
    &:focus {
        outline: none;
    }
    li {
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        list-style-type: none;
        font-size: 0.75rem;
        cursor: default;
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
    .week-header {
        height: 30px;
        color: #FFF;
        font-size: 0.75em;
        background-color: #5fb554;
        margin: 0;
    }
    .date-content,
    .weeks {
        width: 210px;
        padding: 0;
        margin: 0 auto;
    }
    .date-content {
        li {
            cursor: pointer;
            &.not-current-month {
                color: #aaaaaa;
            }
            &.selected-date {
                border: 1px solid #4499dd;
                line-height: 28px;
            }
            &.current-date {
                border: 1px solid #33bf6f;
                background-color: #eeffee;
                line-height: 28px;
            }
            &:hover {
                background: #f6f6f6;
            }
        }
    }

}

</style>

<template lang="html">

<div class="day-picker">
    <div class="week-header">
        <ul class="weeks">
            <li v-for="week in weeks">
                {{week}}
            </li>
        </ul>
    </div>
    <ul class="date-content">
        <li v-for="day in days" :class="getClass(day)" v-on:click="selectDay(day)">
            {{day|getDate}}
        </li>
    </ul>

</div>

</template>

<script>

module.exports = {
    data: function() {
        return {

            weeks: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        }
    },
    props: ['viewDate'],
    computed: {
        days: function() {
            let selectYear = this.viewDate.getFullYear(),
                selectMonth = this.viewDate.getMonth(),
                selectDay = this.viewDate.getDate(),
                leftDays = (new Date(selectYear, selectMonth, 1)).getDay(),
                lastMonthDays = (new Date(selectYear, selectMonth, 0)).getDate(),
                CurrentMonthDays = (new Date(selectYear, selectMonth + 1, 0)).getDate(),
                days = [];
            for (let i = leftDays; i > 0; i--) {
                days.push(new Date(selectYear, selectMonth - 1, lastMonthDays + 1 - i));
            }
            for (let i = 0; i < CurrentMonthDays; i++) {
                days.push(new Date(selectYear, selectMonth, i + 1));
            }

            for (let i = 0; i < 42 - CurrentMonthDays - leftDays; i++) {
                days.push(new Date(selectYear, selectMonth + 1, i + 1));
            }

            return days
        }
    },
    filters: {
        getDate: function(date) {
            let selectYear = date.getFullYear(),
                selectMonth = date.getMonth(),
                selectDay = date.getDate();
            return selectDay;
        }
    },
    methods: {
        selectDay: function(date, isCurrent) {
            this.$emit("selectDate", date,'day', !isCurrent);
        },
        getClass: function(date) {
            var self = this,
                className = "";
            if ((self.viewDate.getFullYear() == date.getFullYear()) && (self.viewDate.getDate() == date.getDate()) && (self.viewDate.getMonth() == date.getMonth())) {
                className += " selected-date";
            }
            if (self.viewDate.getMonth() != date.getMonth()) {
                className += " not-current-month";
            }
            var currentDate = new Date();
            if ((date.getFullYear() == currentDate.getFullYear()) && (date.getDate() == currentDate.getDate()) && (date.getMonth() == currentDate.getMonth())) {
                className += " current-date";
            }
            return className;
        }
    }
}

</script>
