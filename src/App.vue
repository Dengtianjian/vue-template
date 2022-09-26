<template>
  <n-spin v-show="pageLoading" style="
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    " description="页面渲染中"></n-spin>
  <n-config-provider>
    <n-message-provider>
      <router-view v-if="!pageLoading" v-slot="{ Component, route }">
        <keep-alive v-if="route.meta.cache">
          <component :is="Component" :key="route.fullPath"></component>
        </keep-alive>
        <component :is="Component" :key="route.fullPath" v-else></component>
      </router-view>
    </n-message-provider>
  </n-config-provider>
  <footer class="page-footer">{{ version }} <a href="mailto:mail@isdtj.com">联系我们</a>
  </footer>
</template>

<script setup lang="ts">
import { version } from "../package.json";
import { ref } from "vue";
import { NSpin, NConfigProvider } from "naive-ui";
import globalStore from "./store/globalStore";
import { Toast } from "vant";
import Request from "./foundation/Request";
import config from "./config";

window.onerror = function () {
  Toast("控制台有报错");
  globalStore.consoleErrorCount++;
};

const pageLoading = ref<boolean>(false);
</script>

<style scoped>
.page-footer {
  margin: 40px 0 20px;
  text-align: center;
  color: var(--font-light-color);
  user-select: none;
}
</style>
