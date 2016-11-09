<style lang="sass">

.month-picker {
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
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

<div class="month-picker">
    <ul class="months">
        <li v-for="(month,index) in smallMonths" :class="getClass(index)" v-on:click="select(index)">
            {{month}}
        </li>
    </ul>
</div>

</template>

<script>

module.exports = {
    data: function() {
        return {
            smallMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        }
    },
    props: ['viewDate'],
    methods: {
        getClass: function(index) {
            var month = this.viewDate.getMonth();
            if (month == index) {
                return "selected"
            }
        },
        select: function(index) {
            var year = this.viewDate.getFullYear(),
                date = new Date(year, index, 1);
            this.$emit("selectDate", date,'day', false);
        }
    }
};

</script>
