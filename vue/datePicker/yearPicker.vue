<style lang="sass">

.year-picker {
    * {
        margin: 0;
        padding: 0;
    }
    ul {
        width: 214px;
        margin: 0 auto;
    }
    li {
        list-style-type: none;
        width: 53px;
        height: 70px;
        text-align: center;
        display: inline-block;
        font-size: 0.75em;
        line-height: 70px;
        cursor: pointer;
        &:first-of-type,
        &:last-of-type {
            color: #aaaaaa;
        }
        &:hover {
            background-color: #f6f6f6;
        }
        &.selected {
            background-color: #eeffee;
            border: 1px solid #4499dd;
            line-height: 68px;
            outline: none;
        }
    }
}

</style>

<template lang="html">

<div class="year-picker">
    <ul class="years">
        <li v-for="year in years" :class="getClass(year)" v-on:click="select(year)">
            {{year}}
        </li>
    </ul>
</div>

</template>

<script>

module.exports = {
    data: function() {
        return {
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        }
    },
    computed: {
        years: function() {
            var year = this.viewDate.getFullYear(),
                leftYears = year % 10,
                startYear = year - leftYears - 1,
                years = [];
            for (let i = 0; i < 12; i++) {
                years.push(startYear + i);
            }
            return years;
        }
    },
    props: ['viewDate'],
    methods: {
        getClass: function(currentYear) {
            var year = this.viewDate.getFullYear();
            if (currentYear == year) {
                return "selected";
            }
        },
        select: function(currentYear) {
            var year = this.viewDate.getFullYear(),
                month = this.viewDate.getMonth(),
                day = this.viewDate.getDate(),
                date = new Date(currentYear, month, day);
            this.$emit("selectDate", date,'month', false)


        }
    }
}

</script>
