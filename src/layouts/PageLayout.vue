<template>
  <n-spin v-show="pageLoading" style="
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    " description="页面渲染中"></n-spin>
    <router-view v-if="!pageLoading" v-slot="{ Component, route }">
      <keep-alive v-if="route.meta.cache">
        <component :is="Component" :key="route.fullPath"></component>
      </keep-alive>
      <component :is="Component" :key="route.fullPath" v-else></component>
    </router-view>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const pageLoading = ref<boolean>(false);
</script>

<style scoped>

</style>