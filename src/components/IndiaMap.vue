<template>
  <div>
    <el-row>
      <el-col :span="12">
        <span class="state-name">{{ currentStateInfo.state }}</span>
      </el-col>
      <el-col :span="12">
        <div class="text-right">
          <span class="text-warning">{{ currentStateInfo.confirmed }}</span>
          <span class="text-warning delta-info" v-show="currentStateInfo.delta.confirmed">
            <i class="el-icon-top"></i> {{currentStateInfo.delta.confirmed}}
          </span>

          <span class="text-danger count-info">{{ currentStateInfo.active }}</span>
          <span class="text-danger delta-info" v-show="currentStateInfo.delta.active">
            <i class="el-icon-top"></i> {{currentStateInfo.delta.active}}
          </span>

          <span class="text-success count-info">{{ currentStateInfo.recovered }}</span>
          <span class="text-success delta-info" v-show="currentStateInfo.delta.recovered">
            <i class="el-icon-top"></i> {{currentStateInfo.delta.recovered}}
          </span>

          <span class="text-info count-info">{{ currentStateInfo.deaths }}</span>
          <span class="text-info delta-info" v-show="currentStateInfo.delta.deaths">
            <i class="el-icon-top"></i> {{currentStateInfo.delta.deaths}}
          </span>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="float-right">
      <el-switch
        v-model="darkMapColors"
        active-text="DARK"
        inactive-text="LIGHT"
        active-color="#333"
        inactive-color="#eee"
        @change="setStateColors()">
      </el-switch>
    </div>
    <div id="svg-container">
    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3';
  import store from "../store";
  import _ from 'lodash';

  export default {
    name: "IndiaMap",
    data() {
      return {
        currentStateName: '',
        darkMapColors: false, 
      }
    },
    computed: {
      patientData() {
        return store.getters.getPatientData;
      },
      stateWiseData() {
        return store.getters.getStateWiseData;
      },
      currentStateInfo() {
        if (this.currentStateName && this.currentStateName.length) {
          return this.stateWiseData.find(({state}) => state === this.currentStateName);
        }
        else {
          return {
            delta: {}
          };
        }
      },
      maxConfirmedByState() {
        return _.max(this.stateWiseData.map(({ confirmed }) => +confirmed));
      },
      maxConfirmedState() {
        return _.maxBy(this.stateWiseData,
          data => {
            return +data.confirmed;
          }
        );
      }
    },
    mounted() {
      d3.xml('./india2019High.svg')
        .then(data => {
          document.getElementById('svg-container').append(data.documentElement)
          this.setupMap();
        }
      );
    },
    methods: {
      updateCurrentState(stateName) {
        this.currentStateName = stateName;
      },
      getStateInfo(stateName) {
        return this.stateWiseData.find(({state}) => state ===stateName);
      },
      setupMap() {
        d3.selectAll('path').on('mouseover',
          (data, id, nodesArray) => {
            const d3Element = d3.select(nodesArray[id]);
            this.updateCurrentState(d3Element.attr('title'));
          }
        );
        this.setStateColors();
        this.currentStateName = this.maxConfirmedState.state;
      },
      setStateColors() {
        d3.selectAll('path').each(
          (data, id, nodesArray) => {
            const d3Element = d3.select(nodesArray[id]);
            const stateInfo = this.getStateInfo(d3Element.attr('title'));
            const rgbValue = this.getColorRampValue(stateInfo.confirmed);
            d3Element.attr('style', `fill: ${rgbValue}; stroke: #555; stroke-width: 0.5px;`);
          }
        )
      },
      getColorRampValue(count) {
        const redOffset = 50;
        const gbOffset = 20;
        const ratio = count/(this.maxConfirmedByState + redOffset);
        const redValue = 255*ratio;
        if (this.darkMapColors) {
          return `rgb(${redValue}, ${gbOffset}, ${gbOffset})`;
        } else {
          return `rgba(255, 0, 0, ${ratio*1.5})`;
        }
      },
    }
  };
</script>

<style scoped lang="less">
  /deep/ path:hover {
    stroke: #ffa500 !important;
    stroke-width: 3px;
  }
  .delta-info {
    font-size: 0.7em;
  }
  .state-name {
    color: #555;
    padding-right: 30px;
  }
  .count-info {
    padding-left: 20px;
  }
  .el-divider--horizontal {
    margin: 5px 0 !important;
  }
  /deep/ #svg2 {
    transform: scale(0.8);
    margin-left: -7em;
    margin-top: -2em;
  }
  #svg-container {
    height: 735px !important
  }
</style>
