<template>
  <div>
    <el-menu mode="horizontal" active-text-color="white">
      <el-menu-item index="1" class="nav-heading">
        <img src="@/assets/icon.png" class="nav-icon"/>
        COVID-19 INDIA
      </el-menu-item>
    </el-menu>
    <el-row class="mt-20">
      <el-col :span="10" :offset="2">
        <div class="nation-wide-stats-container card">
          <NationWideStats/>
        </div>
        <div class="state-wise-table-container card">
          <StateWiseTable/>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="state-wise-table-container" v-if="stateWiseData.length">
          <NationWideGraph/>
        </div>
        <div class="state-wise-table-container" v-if="patientData.length">
          <AgeGraph/>
        </div>
        <div class="gender-stats-container card" v-if="stateWiseData.length">
          <GenderStats/>
        </div>
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

export default {
  name: "Home",
  components: {
    StateWiseTable,
    NationWideStats,
    NationWideGraph,
    GenderStats,
    AgeGraph,
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
  .state-wise-table-container {
    width: 30em;
    margin: 1em;
  }
  .nation-wide-stats-container {
    width: 28em;
    margin: 1em;
    padding: 1em;
  }
  .el-menu.el-menu--horizontal {
    border: 0;
  }
  .gender-stats-container {
    width: 19em;
    margin: 1em;
    padding: 1em;
    margin-left: 2em;
  }
  /* nav styles */
  .nav-heading{
    font-size: 1.1em !important;
    color: #606266 !important;
  }
  .nav-icon {
    height: 2.2em;
  }
</style>
