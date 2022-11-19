import { App, createApp } from 'vue'
import RootEl from './App.vue'
import Router from './router';
import "./assets/common.css";
import 'vant/lib/index.css';

const Ins: App<Element> = createApp(RootEl);
Ins.use(Router);
Ins.mount('#app');
