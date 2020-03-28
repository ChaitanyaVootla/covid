<template>
  <div>
    <el-menu mode="horizontal"
      background-color="#ffa500"
      active-text-color="#333"
      text-color="#333">
      <el-menu-item index="1" class="nav-heading">
        <img src="@/assets/icon.png" class="nav-icon"/>
        COVID-19 INDIA
      </el-menu-item>
    </el-menu>
    <el-row class="mt-20">
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
      <el-col :span="8">
        <el-card shadow="always" class="extra-stats-card m-20">
          <el-tabs :value="'first'">
            <el-tab-pane label="NATIONAL STATS" name="first">
              <div class="state-wise-table-container" v-if="stateWiseData.length">
                <NationWideGraph/>
              </div>
            </el-tab-pane>
            <el-tab-pane label="AGE DISTRIBUTION" name="second">
              <div class="state-wise-table-container" v-if="patientData.length">
                <AgeGraph/>
              </div>
            </el-tab-pane>
            <el-tab-pane label="GENDER DISTRIBUTION" name="third">
              <div class="gender-stats-container" v-if="stateWiseData.length">
                <GenderStats/>
              </div>
            </el-tab-pane>
            <el-tab-pane label="TRAVEL STATS" name="fourth">
              <div class="gender-stats-container" v-if="stateWiseData.length">
                <TravelStats/>
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

export default {
  name: "Home",
  components: {
    StateWiseTable,
    NationWideStats,
    NationWideGraph,
    GenderStats,
    AgeGraph,
    TravelStats,
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
</style>
