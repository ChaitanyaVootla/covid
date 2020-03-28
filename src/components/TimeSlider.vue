<template>
  <div>
    <el-slider
      v-model="currenValue"
      range
      :marks="dateMarks"
      :format-tooltip="getTooltip"
      class="slider"
    >
    </el-slider>
  </div>
</template>

<script>
  import store from "../store";
  import _ from 'lodash';

  export default {
    name: "TimeSlider",
    data() {
      return {
        currenValue: [0, 99],
        marks: {
          0: '0°C',
          8: '8°C',
          37: '37°C',
          50: {
            style: {
              color: '#1989FA'
            },
            label: this.$createElement('strong', '50%')
          }
        }
      }
    },
    computed: {
      nationWideTimeSeries() {
        return store.getters.getNationWideTimeSeries;
      },
      dateMarks() {
        // const dataDaysLength = this.nationWideTimeSeries.length;
        // const marks = {};
        // const skipLength = Math.round(dataDaysLength/10);
        // this.nationWideTimeSeries.forEach(
        //   (data, index) => {
        //     marks[index] = data.date;
        //   }
        // )
        // let count = 0;
        // new Array(10).fill(0).forEach(
        //   item => {
        //     count++;
        //     marks[count*skipLength] = this.nationWideTimeSeries[count*skipLength]?.date;
        //   }
        // )
        // for (count = 0; count++; count < 10) {
        //   console.log(count);
        //   marks[count] = this.nationWideTimeSeries[count*skipLength].date;
        // }
        const marks = {
          0: this.nationWideTimeSeries[0].date,
          100: this.nationWideTimeSeries[this.nationWideTimeSeries.length - 1].date,
        }
        return marks;
      }
    },
    methods: {
      getTooltip(val) {
        const totalDaysLength = this.nationWideTimeSeries.length;
        const dateVal = this.nationWideTimeSeries[Math.floor((val*totalDaysLength)/100)].date;
        return dateVal;
      }
    }
  };
</script>

<style scoped lang="less">
  .slider {
    padding: 0 2em !important;
  }
  /deep/ .el-slider__marks-text {
    width: 5em !important;
  }
</style>
