<template>
  <div>
    <el-row>
      <el-col :span="18" :offset="3">
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
      <el-col :span="1" :offset="2">
        <div class="m-20">
          <div>
            <el-tooltip class="item mt-20" effect="dark" content="Time slider (coming soon!)" placement="left">
              <el-button :type="timefilterEnabled?'primary':'info'" circle @click="timefilterEnabled = !timefilterEnabled">
                <i class="fas fa-clock"></i>
              </el-button>
            </el-tooltip>
          </div>
          <div class="mt-20">
            <el-tooltip class="item" effect="dark" content="Github repo" placement="left">
              <a href="https://github.com/ChaitanyaVootla/covid" target="_blank">
                <el-button class="github-button" circle>
                  <i class="fas fa-code-branch"></i>
                </el-button>
              </a>
            </el-tooltip>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="9" :offset="3">
        <el-card shadow="always" class="extra-stats-card m-20">
          <el-tabs :value="'first'">
            <el-tab-pane label="SPREAD TRENDS" name="first">
              <div class="state-wise-table-container" v-if="stateWiseData.length">
                <NationWideChart/>
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
          <el-tabs :value="'fourth'">
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
import NationWideChart from '../components/NationWideChart.vue'

export default {
  name: "Home",
  components: {
    StateWiseTable,
    NationWideStats,
    // NationWideGraph,
    GenderStats,
    AgeGraph,
    TravelStats,
    IndiaMap,
    TimeSlider,
    NationWideChart,
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
  .github-button {
    background-color: #6e5494 !important;
    color: white;
    width: 40px;
  }
</style>
