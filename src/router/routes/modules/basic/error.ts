import { RouteRecordRaw } from "vue-router";

export default [
  {
    name: "basic_error500",
    component: () => import("../../../../views/basic/error/500.vue"),
    path: "error/500",
    meta: {
      title: "发生了错误"
    }
  },
  {
    name: "basic_error403",
    component: () => import("../../../../views/basic/error/403.vue"),
    path: "error/403",
    meta: {
      title: "无权访问"
    }
  },
  {
    name: "bacis_error404",
    component: () => import("../../../../views/basic/error/404.vue"),
    path: "/:pathMatch(.*)*",
    meta: {
      title: "访问的页面丢失了~"
    }
  }
] as RouteRecordRaw[]