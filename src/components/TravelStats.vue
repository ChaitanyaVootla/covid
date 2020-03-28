<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-table
          :data="travelPlaceData.foreign"
          max-height="195"
          width="100%">
          <el-table-column label="Foreign" width="150">
            <template slot-scope="scope">
              <div>{{scope.row.location}} - {{scope.row.count}}</div>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <el-table
          :data="travelPlaceData.india"
          max-height="195"
          width="100%">
          <el-table-column label="Indian" width="150">
            <template slot-scope="scope">
              <div>{{scope.row.location}} - {{scope.row.count}}</div>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import store from "../store";
import _ from 'lodash';

export default {
  name: "TravelStats",
  computed: {
    patientData() {
      return store.getters.getPatientData;
    },
    travelPlaceData() {
      const travelArrays = this.patientData.map(data => data['place_attributes']).filter(Boolean);
      const foreignPlacesArray = [];
      const indiaPlacesArray = [];
      travelArrays.forEach(
        array => {
          array.forEach(
            place => {
              if (place['is_foreign']) {
                foreignPlacesArray.push(place.place);
              } else {
                indiaPlacesArray.push(place.place);
              }
            }
          )
        }
      );
      const foreignMappedData = _.groupBy(foreignPlacesArray);
      const indiaMappedData = _.groupBy(indiaPlacesArray);
      const foreignCountArray = [];
      const indiaCountArray = [];
      Object.keys(foreignMappedData).map(
        location => {
          foreignCountArray.push({
            location,
            count: +foreignMappedData[location].length
          });
        }
      );
      Object.keys(indiaMappedData).map(
        location => {
          indiaCountArray.push({
            location,
            count: +indiaMappedData[location].length
          });
        }
      );
      return {
        foreign: _.sortBy(foreignCountArray, 'count').reverse(),
        india: _.sortBy(indiaCountArray, 'count').reverse()
      };
    }
  }
};
</script>

<style scoped lang="less">
</style>
