import { RouteRecordRaw } from "vue-router";

export default [
  {
    name: "home",
    path: "/",
    component: () => import("../../../views/home.vue")
  }
] as RouteRecordRaw[]