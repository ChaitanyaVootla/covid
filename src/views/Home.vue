<template>
  <div>
    <el-menu mode="horizontal"
      background-color="#ffa500"
      active-text-color="#333"
      text-color="#333">
      <el-menu-item class="nav-heading">
        <img src="@/assets/icon.png" class="nav-icon"/>
        COVID-19 INDIA
      </el-menu-item>
      <el-menu-item class="source-link float-right">
        <i class="el-icon-takeaway-box"></i>
        <span>Data is sourced from </span>
        <a href="https://www.covid19india.org/" target="_blank">
          <span>www.covid19india.org</span>
        </a>
      </el-menu-item>
    </el-menu>
    <el-row>
      <el-col :span="18" :offset="3">
        <div class="m-20 mb-0">
          <el-button :type="timefilterEnabled?'primary':'info'" icon="el-icon-time" circle @click="timefilterEnabled = !timefilterEnabled">
          </el-button>
        </div>
        <el-card shadow="always" class="m-20 mb-0" v-show="timefilterEnabled">
          <TimeSlider v-if="stateWiseData.length"/>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <!-- left half -->
      <el-col :span="9" :offset="3">
        <div class="nation-wide-stats-container">
          <el-card shadow="always" class="m-20">
            <NationWideStats/>
          </el-card>
        </div>
        <div class="state-wise-table-container">
          <el-card shadow="always" class="m-20">
            <StateWiseTable/>
          </el-card>
        </div>
      </el-col>
      <!-- right half -->
      <el-col :span="9">
        <el-card shadow="always" class="m-20">
          <IndiaMap v-if="stateWiseData.length"/>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="9" :offset="3">
        <el-card shadow="always" class="extra-stats-card m-20">
          <el-tabs :value="'first'" type="card">
            <el-tab-pane label="SPREAD TRENDS" name="first">
              <div class="state-wise-table-container" v-if="stateWiseData.length">
                <NationWideGraph/>
              </div>
            </el-tab-pane>
            <el-tab-pane label="AGE DISTRIBUTION" name="second">
              <div class="state-wise-table-container" v-if="patientData.length">
                <AgeGraph/>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
      <el-col :span="9">
        <el-card shadow="always" class="extra-stats-card m-20">
          <el-tabs :value="'fourth'" type="card">
            <el-tab-pane label="PATIENT TRAVEL STATS" name="fourth">
              <div class="gender-stats-container" v-if="stateWiseData.length">
                <TravelStats/>
              </div>
            </el-tab-pane>
            <el-tab-pane label="GENDER DISTRIBUTION" name="third">
              <div class="gender-stats-container" v-if="stateWiseData.length">
                <GenderStats/>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import store from "../store";
import StateWiseTable from '../components/StateWiseTable.vue'
import NationWideStats from '../components/NationWideStats.vue'
import NationWideGraph from '../components/NationWideGraph.vue'
import GenderStats from '../components/GenderStats.vue'
import AgeGraph from '../components/AgeGraph.vue'
import TravelStats from '../components/TravelStats.vue'
import IndiaMap from '../components/IndiaMap.vue'
import TimeSlider from '../components/TimeSlider.vue'

export default {
  name: "Home",
  components: {
    StateWiseTable,
    NationWideStats,
    NationWideGraph,
    GenderStats,
    AgeGraph,
    TravelStats,
    IndiaMap,
    TimeSlider,
  },
  computed: {
    stateWiseData() {
      let stateWiseData = store.getters.getStateWiseData;
      stateWiseData = stateWiseData.filter(({ state }) => state !== 'Total');
      return stateWiseData;
    },
    patientData() {
      return store.getters.getPatientData;
    },
  },
  data() {
    return {
      timefilterEnabled: false
    }
  }
};
</script>

<style scoped lang="less">
  /deep/ .inner-collapse {
    margin: 0 2em;
  }
  /deep/ .inner-collapse .el-collapse-item {
    background: blue;
  }
  .state-heading {
    font-size: 1.4em;
  }
  .state-count {
    font-size: 1.2em;
  }
  /* nav styles */
  .nav-heading{
    font-size: 1.1em !important;
  }
  .nav-icon {
    height: 2.2em;
  }
  .el-icon-takeaway-box {
    color: black;
  }
</style>
