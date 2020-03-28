<template>
  <div>
    <el-row>
      <el-col :span="12" :offset="12" class="text-right">
        <el-switch
          v-model="isDailySelected"
          active-color="#F57C00"
          inactive-color="#388E3C"
          active-text="DAILY"
          inactive-text="TOTAL"
          @change="switchData('daily')">
        </el-switch>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" v-for="graph in graphTypes" :key="graph.name">
        <canvas :id="`${graph.name}Canvas`"></canvas>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import store from "../store";
import Chart from 'chart.js';
import { options, graphTypes } from '../utils/chartOptions'

export default {
  name: "NationWideGraph",
  computed: {
    nationWideTimeSeries() {
      let timeSeries = store.getters.getNationWideTimeSeries;
      timeSeries = timeSeries.slice(timeSeries.length - 30, timeSeries.length)
      return timeSeries;
    },
  },
  data() {
    return {
      timeSeriesGraphs: [],
      isDailySelected: false,
      selectedGraphTypes: [
        'total',
        'daily'
      ],
      selectedGraphType: 'total',
      graphTypes,
    }
  },
  mounted() {
    graphTypes.forEach(
      graphType => {
        const context = document.getElementById(graphType.name + 'Canvas').getContext('2d');
        const newChart = new Chart(
          context,
          {
            type: 'line',
            data: {
              labels: this.nationWideTimeSeries.map(data => data.date),
              datasets: [
                {
                  label: graphType.title,
                  data: this.nationWideTimeSeries.map(data => data[`total${graphType.name}`]),
                  fill: false,
                  borderColor: graphType.color,
                  prop: graphType.name,
                },
              ]
            },
            options,
          }
        );
        this.timeSeriesGraphs.push(newChart);
      }
    )
  },
  methods: {
    switchData() {
      if (this.selectedGraphTypes[0] === this.selectedGraphType)
        this.selectedGraphType = this.selectedGraphTypes[1];
      else
        this.selectedGraphType = this.selectedGraphTypes[0];
      this.timeSeriesGraphs.forEach(graph => {
        graph.data.datasets.forEach(
          (dataset) => {
            dataset.data = this.nationWideTimeSeries.map(data => data[`${this.selectedGraphType}${dataset.prop}`])
          }
        )
        graph.update();
      });
    }
  }
};
</script>

<style scoped lang="less">
  canvas {
    margin-top: 0.6em;
    height: 150px !important;
  }
  .switch-text {
    font-size: 0.7em;
    padding: 10px;
    color: #777 !important;
  }
</style>
