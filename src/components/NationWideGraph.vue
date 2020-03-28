<template>
  <div>
    <el-row>
      <el-col :span="13">
        <div class="graph-heading">NATION WIDE STATS</div>
      </el-col>
      <el-col :span="6">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link">
            {{selectedGraphType}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="switchData('total')">TOTAL CASES</el-dropdown-item>
            <el-dropdown-item @click.native="switchData('daily')">DAILY INCREASE</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
import store from "../store";
import Chart from 'chart.js';
import { options } from '../utils/chartOptions'

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
      timeSeriesGraph: null,
      selectedGraphType: 'TOTAL CASES'
    }
  },
  mounted() {
    const ctx = document.getElementById('canvas').getContext('2d');
    this.timeSeriesGraph = new Chart(
        ctx,
        {
          type: 'line',
          data: {
            labels: this.nationWideTimeSeries.map(data => data.date),
            datasets: [
              {
                label: 'CONFIRMED',
                data: this.nationWideTimeSeries.map(data => data.totalconfirmed),
                fill: false,
                borderColor: "#F57C00",
              },
              {
                label: 'RECOVERED',
                data: this.nationWideTimeSeries.map(data => data.totalrecovered),
                fill: false,
                borderColor: "#388E3C",
              },
              {
                label: 'DEATHS',
                data: this.nationWideTimeSeries.map(data => data.totaldeceased),
                fill: false,
                borderColor: "#909399",
              },
            ]
          },
          options,
        }
    );
  },
  methods: {
    switchData(type) {
      if (type === 'total') {
        this.selectedGraphType = 'TOTAL CASES';
        this.timeSeriesGraph.data.datasets.forEach(
          (dataset) => {
            dataset.data = this.nationWideTimeSeries.map(data => data[`total${dataset.prop}`])
          }
        )
      } else if (type === 'daily') {
        this.selectedGraphType = 'DAILY INCREASE';
        this.timeSeriesGraph.data.datasets.forEach(
          (dataset) => {
            dataset.data = this.nationWideTimeSeries.map(data => data[`daily${dataset.prop}`])
          }
        )
      }
      this.timeSeriesGraph.update();
    }
  }
};
</script>

<style scoped lang="less">
  canvas {
    margin-top: 1em;
    width: 500px !important;
    height: 200px !important;
  }
  .graph-heading {
    font-size: 14px;
    color: #606266;
    padding: 0.7em 0;
  }
</style>
