import { createApp } from 'vue';
import TDesign from 'tdesign-vue-next';
import router from './router';
import App from './App.vue';
import './utils/rem';

// 引入组件库全局样式资源
import 'tdesign-vue-next/es/style/index.css';

createApp(App).use(router).use(TDesign).mount('#app');
