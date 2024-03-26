import dayjs from "dayjs";
import { App } from "vue";

//* 文档：https://dayjs.gitee.io/docs/zh-CN

export default function (app: App<Element>) {
  app.directive("date-format", (el: HTMLElement, binding) => {
    if (isNaN(Number(binding.value))) {
      el.innerText = binding.value;
      return;
    };
    el.innerText = dayjs(Number(binding.value) * 1000).format(binding.arg ?? "YYYY-MM-DD H:i:s");
  });
  app.directive("date-from-now", (el: HTMLElement, binding) => {
    if (isNaN(Number(binding.value))) {
      el.innerText = binding.value;
      return;
    };
    el.innerText = dayjs(Number(binding.value) * 1000).fromNow();
  });
}