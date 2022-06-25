import { App, createApp } from 'vue'
import RootEl from './App.vue'
import Router from './router';
import hljsVuePlugin from './foundation/app/highlight';
import "./assets/common.css";
import 'vant/lib/index.css';

const Ins: App<Element> = createApp(RootEl);
Ins.use(Router);
Ins.use(hljsVuePlugin);
Ins.mount('#app');
