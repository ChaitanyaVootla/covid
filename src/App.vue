<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import store from "./store";

export default {
  created() {
    store.dispatch('fetchDistrictWiseData');
    store.dispatch('fetchMainData');
    store.dispatch('fetchPatientData');
  }
}
</script>

<style>
  body {
    font-family: 'Titillium Web', sans-serif;
    font-size: 22px!important;
    font-weight: 700;
    background-color: #ddd;
    margin: 0;
  }
  .card {
      border: 1px solid #ebebeb;
      border-radius: 3px;
  }
  .text-center {
      text-align: center;
  }
  .text-right {
      text-align: right;
  }
  .text-left {
      text-align: left !important;
  }
  .float-right {
    float: right !important;
  }
  /* text colors */
  .text-danger {
    color: #E53935;
  }
  .text-warning {
    color: #F57C00;
  }
  .text-success {
    color: #388E3C;
  }
  .text-info {
    color: #909399;
  }
  /* padding, margin helpers */
  .ml-20 {
    margin-left: 20px;;
  }
  .mt-5 {
    margin-top: 5px;;
  }
  .mt-10 {
    margin-top: 10px;;
  }
  .mt-20 {
    margin-top: 20px;;
  }
  .m-20 {
    margin: 20px;
  }
  .mb-0 {
    margin-bottom: 0 !important;
  }
  .mt-0 {
    margin-top: 0 !important;
  }
  .bold {
    font-weight: bold;
  }
  /* scroll bar style */
  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #aaa;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  /* table styles*/
  .el-table th, .el-table td {
    padding: 5px 0 !important;
  }
  .el-table__body-wrapper {
    overflow-y: hidden !important;
  }
  .el-table__body-wrapper:hover {
    overflow-y: auto !important;
  }
  .el-tabs__item {
    font-weight: 600 !important;
  }
</style>
