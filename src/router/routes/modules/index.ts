import { RouteRecordRaw } from "vue-router";

export default [
  {
    name: "index",
    path: "/",
    component: () => import("../../../layouts/DefaultLayout.vue"),
    // redirect: "/",
    children: [
      {
        name: "home",
        path: "",
        component: () => import("../../../views/home.vue")
      }
    ]
  }
] as RouteRecordRaw[]