<template>
  <div class="menu">
    <n-menu mode="horizontal" :options="menuOptions" v-model:value="DefaultSelectedMenu" class="menu" />
  </div>
  <main>
    <page-layout></page-layout>
  </main>
  <footer class="page-footer">{{ version }} <a href="mailto:mail@isdtj.com">联系我们</a>
  </footer>
</template>

<script lang="ts" setup>
import { MenuOption } from 'naive-ui';
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import NaiveUI from '../foundation/NaiveUI';
import PageLayout from "./PageLayout.vue";
import { version } from "../../package.json";
const Router = useRouter();
const Route = useRoute();

const DefaultSelectedMenu = ref<string>(Route.name.toString());
Router.beforeResolve((to, from, next) => {
  DefaultSelectedMenu.value = to.name?.toString();
  next();
})

const menuOptions: MenuOption[] = [
  {
    label: NaiveUI.createdRouterLinkLabel("地图", {
      to: "/map/categories"
    }),
    key: 'map'
  }, {
    label: NaiveUI.createdRouterLinkLabel("技能点", {
      to: "/planner"
    }),
    key: 'planner'
  }
];
</script>

<style scoped>
.menu {
  display: flex;
  align-items: center;
  height: 60px;
  background-color: white;
}

.page-footer {
  margin: 40px 0 20px;
  text-align: center;
  color: var(--font-light-color);
  user-select: none;
}
</style>