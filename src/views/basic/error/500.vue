<template>
  <div class="result-page-container">
    <n-result status="500" title="非常抱歉，访问发生了错误">
      <div style="text-align: center;">
        <h3>状态码：{{ globalStore.latestError.statusCode }} 错误码：{{ globalStore.latestError.code }}</h3>
        {{ globalStore.latestError.message }}
      </div>

      <template #footer>
        <n-space justify="center">
          <n-button tag="a" href="/index.php">回到首页</n-button>
          <n-popover trigger="hover">
            <template #trigger>
              <n-button type="error" tag="a"
                href="https://double-good-luck.yuque.com/pvpw5o/qc5amq/oigfc3wsoy7h8d44">报告错误</n-button>
            </template>
            {{ RepotyTips }}
          </n-popover>
          <n-button-group>
            <n-popover trigger="hover">
              <template #trigger>
                <n-button type="info" tag="a"
                  href="https://wpa.qq.com/msgrd?@v=3&uin=3168558314&site=qq&menu=yes">联系QQ客服</n-button>
              </template>
              <img src="/assets/images/qq_qrcode.jpg" alt="QQ二维码" style="width:300px;">
            </n-popover>
            <n-popover trigger="hover">
              <template #trigger>
                <n-button type="success">联系微信客服</n-button>
              </template>
              <img src="/assets/images/wechat_qrcode.jpg" alt="微信二维码" style="width:300px;">
            </n-popover>
          </n-button-group>
        </n-space>
      </template>
    </n-result>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import globalStore from '../../../store/globalStore';
const Router = useRouter();

const RepotyTips = "请务必截图错误位置、页面，尽量提供详细的错误详情(例如站点地址、插件版本、页面地址、操作步奏等信息)，能更快高效率的解决问题";

if (!globalStore.latestError.statusCode) {
  Router.replace("/");
}
</script>

<style scoped>
.result-page-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>