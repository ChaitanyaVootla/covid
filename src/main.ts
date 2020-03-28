import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from 'element-ui';
import './assets/styles/element-ui.scss';
import * as d3 from 'd3';

Vue.use(Element);
window.store = store;
window.d3 = d3;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
