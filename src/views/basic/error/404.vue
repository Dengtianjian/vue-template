<template>
  <div class="result-page-container">
    <n-result status="404" title="访问的页面丢失了">
      <div style="text-align: center;">
        在下面再挑一个页面继续访问或者<n-button type="primary" text @click="Router.go(-1)">返回上一页</n-button>
      </div>
      <template #footer>
        <n-space justify="center">
          <n-menu :options="menuOptions" mode="horizontal"></n-menu>
        </n-space>
      </template>
    </n-result>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { generateRouterMenuOptions } from "ruyijs/Vue";
import Routes from '../../../router/routes';

const Router = useRouter();

const menuOptions = generateRouterMenuOptions(Routes, 1);
</script>

<style scoped>
.result-page-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>