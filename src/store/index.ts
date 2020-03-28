import Vue from "vue";
import Vuex from "vuex";
import api from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stateWiseData: [],
    districtWiseData: [],
    nationWideData: [],
    nationWideTimeSeries: [],
    patientData: [],
  },
  mutations: {
    updateDistrictWiseData(state, data) {
      state.districtWiseData = data;
    },
    updateStateWiseData(state, data) {
      state.stateWiseData = data;
    },
    updateNationWideData(state, data) {
      state.nationWideData = data;
    },
    updateNationWideTimeSeries(state, data) {
      state.nationWideTimeSeries = data;
    },
    updatePatientData(state, data) {
      state.patientData = data;
    },
  },
  actions: {
    async fetchDistrictWiseData(store) {
      const { data } = await api.getDistrictWiseData();
      store.commit('updateDistrictWiseData', data);
    },
    async fetchMainData(store) {
      const { data } = await api.getMainData();
      store.commit('updateStateWiseData', data.statewise.filter(({state}) => state !== 'Total'));
      store.commit('updateNationWideData', data.statewise.find(({state}) => state === 'Total'));
      store.commit('updateNationWideTimeSeries', data.cases_time_series);
    },
    async fetchPatientData(store) {
      const { data } = await api.getPatientData();
      store.commit('updatePatientData', data.data.rawPatientData);
    },
  },
  getters: {
    getStateWiseData(state) {
      return state.stateWiseData;
    },
    getDistrictWiseData(state) {
      return state.districtWiseData;
    },
    getNationWideStats(state) {
      return state.nationWideData;
    },
    getNationWideTimeSeries(state) {
      return state.nationWideTimeSeries;
    },
    getPatientData(state) {
      return state.patientData;
    },
  },
  modules: {}
});
