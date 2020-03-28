<template>
  <div>
    <canvas id="agecanvas"></canvas>
  </div>
</template>

<script>
import store from "../store";
import Chart from 'chart.js';
import { options } from '../utils/chartOptions';
import _ from 'lodash';

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
    }
  },
  mounted() {
    const ctx = document.getElementById('agecanvas').getContext('2d');
    this.timeSeriesGraph = new Chart(
        ctx,
        {
          type: 'line',
          data: {
            labels: this.chartLabels,
            datasets: [
              {
                label: 'CONFIRMED',
                data: this.mappedAgeData(this.confirmedAgeArray),
                fill: false,
                borderColor: "#F57C00",
              },
              {
                label: 'RECOVERED',
                data: this.mappedAgeData(this.recoveredAgeArray),
                fill: false,
                borderColor: "#388E3C",
              },
              {
                label: 'DEATHS',
                data: this.mappedAgeData(this.deceasedAgeArray),
                fill: false,
                borderColor: "#909399",
              },
            ]
          },
          options: {
              ...options,
              scales: {
                  xAxes: [{
                        ticks: {
                            maxTicksLimit: 5
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
              },
          },
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
    height: 250px !important;
  }
  #agecanvas {
      margin-left: 0.3em;
  }
</style>
