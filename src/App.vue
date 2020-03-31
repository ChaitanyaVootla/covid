<template>
  <div id="app">
    <el-menu mode="horizontal"
      background-color="#ffa500"
      active-text-color="#333"
      text-color="#333"
      class="main-nav-bar">
      <el-menu-item class="nav-heading">
        <router-link to="/">
          <img src="@/assets/icon.png" class="nav-icon"/>
          COVID-19 INDIA
        </router-link>
      </el-menu-item>
      <!-- <el-menu-item class="nav-route">
        <router-link to="Travel">
          <i class="fas fa-route"></i>
          Travel
        </router-link>
      </el-menu-item>
      <el-menu-item class="nav-route">
        <router-link to="Map">
          <i class="fas fa-map"></i>
          Map
        </router-link>
      </el-menu-item>
      <el-menu-item class="nav-route">
        <router-link to="World">
          <i class="fas fa-globe-asia"></i>
          World
        </router-link>
      </el-menu-item> -->
      <el-menu-item class="source-link float-right">
        <i class="fas fa-database database-icon"></i>
        <span>Data is sourced from </span>
        <a href="https://www.covid19india.org/" target="_blank">
          <span>www.covid19india.org</span>
        </a>
      </el-menu-item>
    </el-menu>
    <router-view v-if="isStateInfoLoaded" v-loading="!isStateInfoLoaded"/>
  </div>
</template>

<script>
import store from "./store";

export default {
  created() {
    store.dispatch('fetchDistrictWiseData');
    store.dispatch('fetchMainData');
    store.dispatch('fetchPatientData');
    store.dispatch('fetchTravelData');
  },
  computed: {
    isStateInfoLoaded() {
      return store.getters.getStateWiseData.length;
    }
  }
}
</script>

<style lang="less">
  @import "assets/styles/global.less";
  /* nav styles */
  .nav-heading{
    font-size: 1em !important;
  }
  .nav-route{
    font-size: 0.8em !important;
    & i {
      color: #333 !important;
    }
  }
  .nav-icon {
    height: 2.2em;
  }
  .main-nav-bar {
    padding-bottom: 0.2em;
  }
  .database-icon {
    color: black !important;
    margin-right: 5px;
    font-size: 1.2em;
  }
</style>
