<template>
  <div class="result-page-container">
    <n-result status="403" title="无权访问" description="抱歉，您所在的用户组无法访问该页面">
      <template #footer>
        <n-space justify="center">
          <router-link to="/">回到首页</router-link>
        </n-space>
      </template>
    </n-result>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

</script>

<style scoped>
.result-page-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>