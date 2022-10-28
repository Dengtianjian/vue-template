<template>
  <naive-config>
    <router-view></router-view>
  </naive-config>
</template>

<script setup lang="ts">
import globalStore from "./store/globalStore";
import { Toast } from "vant";
import NaiveConfig from "./components/base/NaiveConfig.vue";

window.onerror = function () {
  Toast("控制台有报错");
  globalStore.consoleErrorCount++;
};


</script>

<style scoped>

</style>
