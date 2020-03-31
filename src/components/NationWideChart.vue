<template>
  <div>
    <el-row>
      <el-col :span="12" :offset="12" class="text-right">
        <el-switch
          v-model="isDailySelected"
          active-color="#F57C00"
          inactive-color="#F57C00"
          active-text="DAILY"
          inactive-text="TOTAL"
          @change="switchData('daily')">
        </el-switch>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" v-for="graph in graphTypes" :key="graph.name">
        <div :id="`${graph.name}Chart`" class="chart-container"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import store from "../store";
    import { graphTypes } from '../utils/chartOptions';
    import * as am4Core from '@amcharts/amcharts4/core';
    import * as am4Charts from '@amcharts/amcharts4/charts';
    import * as am4MaterialTheme from '@amcharts/amcharts4/themes/animated';

    export default {
    name: "NationWideChart",
    computed: {
      nationWideTimeSeries() {
        let timeSeries = store.getters.getNationWideTimeSeries;
        timeSeries = timeSeries.slice(timeSeries.length - 30, timeSeries.length)
        return timeSeries;
      },
    },
    data() {
      return {
        isDailySelected: true,
        selectedGraphTypes: [
          'total',
          'daily'
        ],
        selectedGraphType: 'daily',
        graphTypes,
        monthNames: ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"],
        chart: null,
      }
    },
    mounted() {
      am4Core.useTheme(am4MaterialTheme.default);
      graphTypes.forEach(
        graphType => {
          const chart = am4Core.create(`${graphType.name}Chart`, am4Charts.XYChart);
          // Axes
          const dateAxis = chart.xAxes.push(new am4Charts.DateAxis());
          dateAxis.renderer.grid.template.location = 0;
          dateAxis.fontSize = 10;
          dateAxis.baseInterval = {
            "timeUnit": "hour",
            "count": 1
          };
          dateAxis.cursorTooltipEnabled = false;
          const countAxis = chart.yAxes.push(new am4Charts.ValueAxis());
          countAxis.cursorTooltipEnabled = false;
          countAxis.fontSize = 12;
          countAxis.fill = am4Core.color(graphType.color);

          // Series
          const series = chart.series.push(new am4Charts.LineSeries());
          series.dataFields.dateX = "date";
          series.dataFields.valueY = "count";
          series.properties.tensionX = 0.8;

          series.properties.snapTooltip = true;
          series.properties.showTooltipOn = 'hover';
          series.adapter.add("tooltipText", (text, target) => {
            const date = target.tooltipDataItem.dateX;
            return `${this.monthNames[date.getMonth()]} ${date.getDate()}: [bold]{count}[/]`;
          });
          series.fill = am4Core.color(graphType.color);
          series.strokeWidth = 3;
          series.fillOpacity = 0.1;
          series.stroke = am4Core.color(graphType.color);
          chart.cursor = new am4Charts.XYCursor();
          chart.cursor.lineX.disabled = true;
          chart.cursor.lineY.disabled = true;
          graphType.chart = chart;
        }
      );
      this.updateData();
    },
    methods: {
      switchData() {
        if (this.selectedGraphTypes[0] === this.selectedGraphType)
          this.selectedGraphType = this.selectedGraphTypes[1];
        else
          this.selectedGraphType = this.selectedGraphTypes[0];
        this.updateData()
      },
      updateData() {
        graphTypes.forEach(
          graphType => {
            graphType.chart.data = this.nationWideTimeSeries.map(
              data => {
                return {
                  date: new Date(`${data.date} 2020`),
                  count: data[`${this.selectedGraphType}${graphType.name}`]
                }
              }
            );
          }
        );
      }
    }
    };
</script>

<style scoped lang="less">
  .chart-container {
    height: 8em;
  }
</style>
