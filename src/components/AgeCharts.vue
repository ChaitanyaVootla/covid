<template>
  <div>
    <el-row>
      <el-col :span="24" v-for="graph in graphTypes" :key="graph.name">
        <div :id="`${graph.name}ChartAge`" class="chart-container"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import store from "../store";
  import { graphTypes } from '../utils/chartOptions';
  import * as am4Core from '@amcharts/amcharts4/core';
  import * as am4Charts from '@amcharts/amcharts4/charts';
  import * as am4AnimatedTheme from '@amcharts/amcharts4/themes/animated';

  export default {
    name: "AgeCharts",
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
    },
    data() {
      return {
        graphTypes,
      }
    },
    mounted() {
      am4Core.useTheme(am4AnimatedTheme.default);
      graphTypes.forEach(
        graphType => {
          const chart = am4Core.create(`${graphType.name}ChartAge`, am4Charts.XYChart);
          // Axes
          const ageAxis = chart.xAxes.push(new am4Charts.CategoryAxis());
          ageAxis.dataFields.category = 'age';
          ageAxis.fontSize = 10;
          ageAxis.renderer.grid.template.disabled = true;
          ageAxis.cursorTooltipEnabled = false;
          const countAxis = chart.yAxes.push(new am4Charts.ValueAxis());
          countAxis.cursorTooltipEnabled = false;
          countAxis.fontSize = 12;
          countAxis.fill = am4Core.color(graphType.color);
          countAxis.renderer.grid.template.disabled = true;

          // Series
          const series = chart.series.push(new am4Charts.LineSeries());
          series.dataFields.categoryX = "age";
          series.dataFields.valueY = "count";
          series.properties.tensionX = 0.8;
          chart.data = this.mappedAgeData(this[`${graphType.name}AgeArray`]);

          series.tooltipText = `{categoryX}: [bold]{valueY}[/]`
          series.fill = am4Core.color(graphType.color);
          series.strokeWidth = 3;
          series.fillOpacity = 0.1;
          series.stroke = am4Core.color(graphType.color);

          chart.cursor = new am4Charts.XYCursor();
          chart.cursor.lineX.disabled = true;
          chart.cursor.lineY.disabled = true;
        }
      );
    },
    methods: {
      mappedAgeData(ageArray) {
        let mappedAgeArray = [];
        let ageColCount = 10;
        for (ageColCount = 10; ageColCount > 0; ageColCount--) {
          mappedAgeArray.push({
            age: `${(ageColCount - 1)*10}-${ageColCount*10}`,
            count: 0
          })
        }
        mappedAgeArray = mappedAgeArray.reverse();
        ageArray.forEach(
          age => {
            const arrayItem = mappedAgeArray[Math.floor(age/10)];
            if (arrayItem) {
              arrayItem.count++;
            }
        });
        return mappedAgeArray;
      },
    }
  };
</script>

<style scoped lang="less">
  .chart-container {
    height: 8em;
  }
</style>
