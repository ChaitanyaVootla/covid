<template>
  <div>
    <el-row>
      <el-col :span="12" v-for="graph in graphTypes" :key="graph.name">
        <canvas :id="`${graph.name}CanvasAge`"></canvas>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import store from "../store";
import Chart from 'chart.js';
import { options, graphTypes } from '../utils/chartOptions';

export default {
  name: "AgeGraph",
  computed: {
    patientData() {
      return store.getters.getPatientData;
    },
    confirmedAgeArray() {
        return this.patientData.map(({ageEstimate}) => ageEstimate).filter(Boolean);
    },
    recoveredAgeArray() {
        return this.patientData.map(data => {
            if (data.status === 'Recovered') {
                return data.ageEstimate;
            }
        }).filter(Boolean);
    },
    deceasedAgeArray() {
        return this.patientData.map(data => {
            if (data.status === 'Deceased') {
                return data.ageEstimate;
            }
        }).filter(Boolean);
    },
    chartLabels() {
        const labelsArray = new Array(10).fill(0);
        let count = 10;
        labelsArray.forEach(
            (item, index) => {
                labelsArray[index] = `${count - 10} - ${count}`;
                count += 10;
            }
        )
        return labelsArray;
    }
  },
  data() {
    return {
      graphTypes,
      specificOptions: {
        scales: {
          xAxes: [{
            ticks: {
              maxTicksLimit: 3,
              maxRotation: 0
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)"
            },
          }],
          yAxes: [{
            ticks: {
              maxTicksLimit: 3
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)"
            },
          }],
        }
      }
    }
  },
  mounted() {
    graphTypes.forEach(
      graphType => {
        const ctx = document.getElementById(`${graphType.name}CanvasAge`).getContext('2d');
        this.timeSeriesGraph = new Chart(
            ctx,
            {
              type: 'line',
              data: {
                labels: this.chartLabels,
                datasets: [
                  {
                    label: graphType.title,
                    data: this.mappedAgeData(this[`${graphType.name}AgeArray`]),
                    fill: true,
                    borderColor: graphType.color,
                    backgroundColor: graphType.color,
                  },
                ]
              },
              options: {
                  ...options,
                  ...this.specificOptions
              },
            }
        );
      }
    );
  },
  methods: {
    mappedAgeData(ageArray) {
        const mappedAgeArray = new Array(10).fill(0);
        ageArray.map(age => {
            mappedAgeArray[Math.floor(age/10)]++
        });
        return mappedAgeArray;
    },
  }
};
</script>

<style scoped lang="less">
  canvas {
    margin-top: 1em;
    height: 150px !important;
  }
  #agecanvas {
      margin-left: 0.3em;
  }
</style>
