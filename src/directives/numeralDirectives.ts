import { App } from "vue";
import Numeral from "numeral";

//* 文档：http://numeraljs.com/

Numeral.register('locale', 'c-chs', {
  delimiters: {
    thousands: ',',
    decimal: '.'
  },
  abbreviations: {
    thousand: 'k',
    million: '百万',
    billion: '十亿',
    trillion: '兆'
  },
  ordinal: function (number) {
    return '.';
  },
  currency: {
    symbol: '¥'
  }
});

Numeral.locale('c-chs');

export default function (app: App<Element>) {
  app.directive("f-numbers", (el: HTMLElement, binding) => {
    el.innerText = Numeral(binding.value).format(binding.arg ?? '0');
  });
}