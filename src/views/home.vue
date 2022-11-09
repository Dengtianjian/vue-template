<template>
  <n-card>
    <div class="panel">
      <div style="flex-grow:1;">
        <n-tabs>
          <n-tab-pane name="english" tab="英文">
            <n-input type="textarea" placeholder="请输入英文" clearable autofocus :rows="5" v-model:value="TranslateText"
              @input="inputSourceText">
            </n-input>
          </n-tab-pane>
        </n-tabs>
      </div>
      <div class="translate-icon" style="flex-shrink:0;">
        <i class="antdv antdv-doubleright"></i>
      </div>
      <div style="flex-grow:1;">
        <n-tabs>
          <n-tab-pane name="chinese" tab="中文">
            <n-input type="textarea" readonly placeholder="" :rows="5" :value="TranslatedText"></n-input>
          </n-tab-pane>
        </n-tabs>
      </div>
    </div>
    <n-space justify="center" class="panel">
      <n-button type="primary" @click="translate" :loading="Translateing">翻译</n-button>
    </n-space>
  </n-card>
</template>

<script lang="ts" setup>
import { useMessage } from 'naive-ui';
import { ref } from 'vue';
import config from '../config';
import http from '../foundation/http';
const NMessage = useMessage();

const TranslateText = ref<string>("");
const TranslatedText = ref<string>("");

let timer = null;
function inputSourceText() {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(translate, 500);
}

const Translateing = ref<boolean>(false);
function translate() {
  if (Translateing.value) return;
  if (!TranslateText.value) return;
  Translateing.value = true;
  http<Array<{
    dst: string,
    src: string
  }>>(config.APIURL + "/index/translate", "POST", {
    query: TranslateText.value
  }).then(res => {
    if (res.errCode) {
      NMessage.error(res.message);
    } else {
      if (res.data.length) {
        TranslatedText.value = res.data.map(item => item.dst).join("\n");
      }
    }
  }).catch(err => {
    NMessage.error("服务器错误，请稍后重试");
  }).finally(() => {
    Translateing.value = false;
  })
}
</script>

<style scoped>
.panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 20px;
}

.translate-icon {
  margin-top: 50px;
}

.translate-icon>i {
  font-size: 30px;
  color: rgba(60, 64, 67, .38);
}
</style>