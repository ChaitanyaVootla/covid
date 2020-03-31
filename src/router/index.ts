import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import World from "../views/World.vue";
import Map from "../views/Map.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/World",
    name: "World",
    component: World
  },
  {
    path: "/Map",
    name: "Map",
    component: Map
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
