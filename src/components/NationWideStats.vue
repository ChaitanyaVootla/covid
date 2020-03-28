<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
          <div class="text-warning text-center">
              <div class="small-text">CONFIRMED</div>
              <div class="mt-5">{{nationWideStats.confirmed}}</div>
          </div>
      </el-col>
      <el-col :span="6">
          <div class="text-danger text-center">
              <div class="small-text">ACTIVE</div>
              <div class="mt-5">{{nationWideStats.active}}</div>
              <div class="percentage-text">{{activePercentage}}%</div>
          </div>
      </el-col>
      <el-col :span="6">
          <div class="text-success text-center">
              <div class="small-text">RECOVERED</div>
              <div class="mt-5">{{nationWideStats.recovered}}</div>
              <div class="percentage-text">{{recoveredPercentage}}%</div>
          </div>
      </el-col>
      <el-col :span="6">
          <div class="text-info text-center">
              <div class="small-text">DEATHS</div>
              <div class="mt-5">{{nationWideStats.deaths}}</div>
              <div class="percentage-text">{{deathsPercentage}}%</div>
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "NationWideStats",
  computed: {
    nationWideStats() {
      return store.getters.getNationWideStats;
    },
    activePercentage() {
        return Math.round(this.nationWideStats.active*100/this.nationWideStats.confirmed);
    },
    recoveredPercentage() {
        return Math.round(this.nationWideStats.recovered*100/this.nationWideStats.confirmed);
    },
    deathsPercentage() {
        return Math.round(this.nationWideStats.deaths*100/this.nationWideStats.confirmed);
    },
  }
};
</script>

<style scoped lang="less">
  .table-header {
    color: #606266 !important;
  }
  .small-text {
      font-size: 0.5em;
      font-weight: 800;
  }
  .percentage-text {
      font-size: 0.6em;
  }
</style>
