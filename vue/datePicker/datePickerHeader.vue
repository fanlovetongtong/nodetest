<style lang="sass">

.date-controller {
    position: relative;
    .control-button {
        position: absolute;
        top: 10px;
        z-index: 2;
        cursor: pointer;
        user-select: none;
        &.pre {
            left: 5px;
        }
        &.next {
            right: 5px;
        }
    }
}

</style>

<template lang="html">

<div class="date-controller">
    <i class="pre control-button" v-on:click="pre">pre</i>
    <div class="day-picker-header" v-show="ifShow('month')">
        <span v-on:click="changeType('year')">{{viewDate.getFullYear()}}</span>
    </div>
    <div class="day-picker-header" v-show="ifShow('day')">
        <span v-on:click="changeType('month')">{{months[viewDate.getMonth()]}}</span>,<span v-on:click="changeType('year')">{{viewDate.getFullYear()}}</span>
    </div>
    <div class="day-picker-header" v-show="ifShow('year')">
        <span>{{getYearPerid()}}</span>
    </div>
    <i class="next  control-button" v-on:click="next">next</i>
</div>

</template>

<script>

export default {
    data() {
            return {
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            };
        },
        props: ["viewDate", "selectType"],
        computed: {

        },
        ready() {},
        attached() {},
        methods: {
            pre() {
                    var self = this;
                    var type = this.selectType;
                    var date = new Date(Date.parse(self.viewDate));
                    if (type == "month") {
                        date.setFullYear(date.getFullYear() - 1);
                        date.setDate(1);
                    } else if (type == "day") {
                        date.setMonth(date.getMonth() - 1);
                        date.setDate(1);
                    } else {
                        var year = date.getFullYear(),
                            leftYears = year % 10,
                            startYear = year - leftYears;
                        date.setDate(1);
                        date.setFullYear(startYear - 10);
                    }
                    this.$emit("selectDate", date, self.selectType, false);
                },
                next() {
                    var self = this;
                    var type = this.selectType;
                    var date = new Date(Date.parse(self.viewDate));
                    if (type == "month") {
                        date.setFullYear(date.getFullYear() + 1);
                        date.setDate(1);
                    } else if (type == "day") {
                        date.setMonth(date.getMonth() + 1);
                        date.setDate(1);
                    } else {
                        var year = date.getFullYear(),
                            leftYears = year % 10,
                            startYear = year - leftYears;
                        date.setDate(1);
                        date.setFullYear(startYear + 10);
                    }
                    this.$emit("selectDate", date, self.selectType, false);
                },
                ifShow(currentType) {
                    if (currentType == this.selectType) {
                        return true;
                    }
                    return false;
                },
                changeType(type) {
                    this.$emit("changeType", type);
                },
                getYearPerid() {
                    var year = this.viewDate.getFullYear(),
                        leftYears = year % 10,
                        startYear = year - leftYears,
                        endYear = startYear + 10;
                    return startYear + "-" + endYear;
                }
        },
        components: {}
};

</script>
