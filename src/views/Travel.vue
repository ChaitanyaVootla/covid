<template>
  <div>
    {{mappedTravelData.length}}
    <!-- <el-form ref="form" :model="form" label-width="120px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="Latitude">
            <el-input v-model="form.latitude"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Longitude">
            <el-input v-model="form.longitude"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click.native="plotPoint([form.latitude, form.longitude])">
              PLOT
            </el-button>
          <el-form-item>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form> -->
    <el-button type="primary" @click.native="plotCurrentLocation()" circle>
      <i class="fas fa-search-location"></i>
    </el-button>
    <el-row>
      <el-col :span="12">
        <div class="map-container">
          <div id="svg-container" class="map-box">
          </div>
        </div>
      </el-col>
      <el-col :span="12">
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import store from "../store";
  import _ from 'lodash';
  import * as d3 from 'd3';

  export default {
    name: "Travel",
    mounted() {
      d3.xml('./worldIndiaHigh.svg')
        .then(data => {
          document.getElementById('svg-container').append(data.documentElement)
          this.setupMap();
          this.setupTravelPoints();
          let lat = 83;
          while(lat > -58) {
            this.plotPoint([lat, 0]);
            lat -= 10;
          }
          // d3.xml('./districts.svg')
          //   .then(data => {
          //     document.getElementById('svg-container2').append(data.documentElement)
          //   }
          // );
        }
      );
    },
    data() {
      return {
        currentStateName: '',
        darkMapColors: true,
        xOffset: 1,
        yOffset: 1,
        form: {
          latitude: '17.602139',
          longitude: '79.255371',
        }
      }
    },
    computed: {
      travelData() {
        return store.getters.getTravelData;
      },
      travelDataByPatientId() {
        return _.groupBy(this.travelData, 'pid');
      },
      patientData() {
        return store.getters.getPatientData;
      },
      mappedTravelData() {
        const mappedData = this.patientData.map(
          patient => {
            const travelHistory = this.travelDataByPatientId[`P${patient.patientId}`];
            if (travelHistory?.length) {
              return {
                ...patient,
                travelHistory,
              }
            }
          }
        ).filter(Boolean);
        return mappedData;
      },
    },
    methods: {
      plotCurrentLocation() {
        navigator.geolocation.getCurrentPosition(
          res => {
            this.plotPoint([res.coords.latitude, res.coords.longitude]);
          }
        );
      },
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
      },
      getMapSVG() {
        return d3.select('#mapSvg');
      },
      getMapLatLong() {
        let latLongs;
        if (d3.select('#svg2').attr(':mapsvg:geoViewBox')) {
          latLongs = d3.select('#svg2').attr(':mapsvg:geoViewBox').split(' ');
          return {
            leftLng: +latLongs[0],
            topLat: +latLongs[1],
            rightLng: +latLongs[2],
            bottomLat: +latLongs[3],
          }
        } else {
          latLongs = d3.select('#latLongs');
          return {
            leftLng: +d3.select('#latLongs').attr('leftLongitude'),
            topLat: +d3.select('#latLongs').attr('topLatitude'),
            rightLng: +d3.select('#latLongs').attr('rightLongitude'),
            bottomLat: +d3.select('#latLongs').attr('bottomLatitude'),
          }
        }
      },
      setupTravelPoints() {
        let points = ["9.8614231,76.5900643", "9.3823686,76.779199", "9.3757533,76.7763825", "9.375753,76.7698164", "9.385127,76.7849146", "9.0164797,76.92397", "9.0158521,76.9097683", "9.3772508,76.7756069", "9.263646,76.7829783", "9.2728908,76.7892299", "9.2611563,76.7879638,18", "9.2661764,76.7809417", "9.386206,76.7863243", "11.1397276,75.948596", "11.6015612,75.5910405", "11.6995079,75.5344015", "11.7208115,75.5349187", "11.2566435,75.7685646", "11.2486712,75.7781127", "11.7531875,75.4919971", "11.1792876,76.144535", "11.1878099,76.2580323", "11.192934,76.2251387", "11.1177955,76.1199936", "13.1986348,77.7044041", "12.938365,77.5885142", "40.6413111,-73.7803278", "25.2531745,55.3634841", "12.9645669,77.7190231", "12.9572489,77.7428406", "12.9838874,77.7418193", "12.9527286,77.6392458", "12.959711,77.7461103", "12.9768569,77.7081903", "9.3865747, 76.7833664", "9.5966458, 76.5225306", "9.8614227, 76.5813094", "9.3839593, 76.785245", "9.2744739,76.7022866", "9.3862113,76.7863243", "9.5923763,76.5199522", "9.6163845,76.7004489", "9.6327636,76.5189227", "39.468877,-117.1982217", "40.6413151,-73.7803278", "25.2531793,55.3634841", "13.19864, 77.7044041", "12.9594973, 77.7462004", "12.9599764, 77.6783478", "12.9594062, 77.7444503", "12.9768621, 77.7081903", "12.9880922, 77.7262703", "19.0895646,72.8634257", "12.9262429, 77.5906121", "8.4834254,76.9176307", "8.4901622,76.9322777", "8.4954497,76.9390526", "11.1397276, 75.9507847", "11.1780408, 75.8794302", "12.0715235, 75.2917689", "13.1986348, 77.7065928", "12.9056374, 77.5404383", "8.4834201, 76.9198194", "8.5150455, 76.927428", "8.5215699, 76.9297051", "8.5201633,76.9273983", "8.526249, 76.9282735", "9.3823686, 76.7770106", "9.3856464, 76.7829323", "9.3861945, 76.784884", "9.3757586, 76.7763825", "9.3731741, 76.7865693", "9.3863053, 76.7845842", "9.0179739, 76.9248863", "8.9941361, 76.9285812", "9.3840161, 76.783953", "9.3905569, 76.786513", "9.3766548, 76.7769429", "9.3833808, 76.7809324", "9.3856113, 76.7829583", "9.2726418, 76.7889012", "9.2661817, 76.7809417", "9.3862792, 76.7809105", "9.3833861, 76.7809324", "12.9541759, 74.8836158", "12.6251924, 75.0875817", "12.4974113, 75.0515372", "17.3447321, 76.8201453", "17.3404932, 76.8274257", "17.3216051, 76.8695485", "10.1517834, 76.3907693", "11.1507361, 75.9454172", "11.2313268, 76.0420297", "12.9572489, 77.7428406", "12.9597162, 77.7461103", "12.9383702, 77.5885142"];
        points = points.map(point => point.split(','));
        // if (this.mappedTravelData.length) {
        //   this.mappedTravelData.forEach(
        //     patient => {
        //       patient.travelHistory.forEach(
        //         ({ latlong }) => {
        //           if (latlong) {
        //             const travelPoint = latlong.split(',');
        //             // this.plotPoint(travelPoint);
        //           }
        //         }
        //       )
        //     }
        //   )
        // }
        points.forEach(
          point => {
            // this.plotPoint(point);
          }
        )
      },
      plotPoint([latitude, longitude]) {
        const mapLatLongs = this.getMapLatLong();
        const mapSVG = this.getMapSVG();
        const mapHeight = mapSVG.node().getBBox().height;
        const mapWidth = mapSVG.node().getBBox().width;
        const latRange = mapLatLongs.topLat - mapLatLongs.bottomLat;
        const lngRange = mapLatLongs.rightLng - mapLatLongs.leftLng;
        const x = (mapWidth/lngRange)*(longitude - mapLatLongs.leftLng);
        const y = (mapHeight/latRange)*(mapLatLongs.topLat - latitude);
        console.log(mapHeight, mapLatLongs.topLat, latRange);
        mapSVG.append('rect')
          .attr('x', x)
          .attr('y', y)
          .attr('width', 5)
          .attr('height', 5)
        mapSVG.append('text')
          .attr('x', x + 20)
          .attr('y', y + 10)
          .text(latitude)
          // .attr('style', `fill: ${_.random(['red'])}`);
      }
    }
  }
</script>

<style lang="less" scoped>
  /deep/ rect {
    fill: red !important;
  }
  /deep/ path {
    stroke: #888;
    fill: #e9ebdf;
    stroke-width: 0.5px;
  }
  /deep/ .indiaMap {
    background-color: #aadaff;
    border-radius: 5px;
    // margin: 2em;
    // padding: 1em;
  }
  .map-container {
    position: relative;
  }
  .map-box {
    position: absolute;
  }
  #districtsMap {
    margin-top: 3em;
  }
</style>
