import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Travel from "../views/Travel.vue";
import World from "../views/World.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/Travel",
    name: "Travel",
    component: Travel
  },
  {
    path: "/World",
    name: "World",
    component: World
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
