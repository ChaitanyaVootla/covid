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
    <div id="chartdiv">
    </div>
  </div>
</template>

<script>
  import * as am4Core from '@amcharts/amcharts4/core';
  import * as am4Maps from '@amcharts/amcharts4/maps';
  import * as indiaMap from '@amcharts/amcharts4-geodata/india2019High';
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
    mounted() {
      const chart = am4Core.create("chartdiv", am4Maps.MapChart);
      chart.geodata = indiaMap.default;
      chart.projection = new am4Maps.projections.Mercator();
      // India states map
      const indiaSeries = chart.series.push(new am4Maps.MapPolygonSeries());
      const indiaPolygonTemplate = indiaSeries.mapPolygons.template;
      indiaSeries.useGeodata = true;

      indiaPolygonTemplate.stroke = am4Core.color("#888888");
      indiaPolygonTemplate.fill = am4Core.color("#cccccc");
      const ihs = indiaPolygonTemplate.states.create("hover");
      ihs.properties.stroke = am4Core.color("#ffa500");
      indiaPolygonTemplate.propertyFields.fill = "color";
      indiaPolygonTemplate.events.on('over', this.onStateHovered);
      const countriesByName = _.mapKeys(indiaMap.default.features.map(({ properties }) => properties), 'name');
      indiaSeries.data = this.stateWiseData.map(
        data => {
          return {
            id: countriesByName[data.state].id,
            color: am4Core.color(this.getColorRampValue(data.confirmed)),
          };
        }
      )
      this.currentStateName = this.maxConfirmedState.state;
      // Show current location of user
      const imageSeries = chart.series.push(new am4Maps.MapImageSeries());
      const imageSeriesTemplate = imageSeries.mapImages.template;
      const circle = imageSeriesTemplate.createChild(am4Core.Circle);
      circle.radius = 5;
      circle.fill = am4Core.color("#ffa500");
      circle.stroke = am4Core.color("#000");
      circle.strokeWidth = 2;
      circle.nonScaling = true;
      circle.tooltipText = "{title}";
      imageSeriesTemplate.propertyFields.latitude = "latitude";
      imageSeriesTemplate.propertyFields.longitude = "longitude";
      navigator.geolocation.getCurrentPosition(
        res => {
          imageSeries.data = [{
            id: 'CLOCATION',
            latitude: res.coords.latitude,
            longitude: res.coords.longitude,
            title: "Your Location"
          }];
        }
      );
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
    methods: {
      onStateHovered(ev) {
        const stateName = ev.target.dataItem.dataContext.name;
        this.updateCurrentState(stateName);
      },
      updateCurrentState(stateName) {
        this.currentStateName = stateName;
      },
      getStateInfo(stateName) {
        return this.stateWiseData.find(({state}) => state ===stateName);
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
  }
</script>

<style lang="less" scoped>
  #chartdiv {
    width: 100%;
    height: 696px;
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
</style>
