import 'virtual:svg-icons-register';

import 'normalize.css';
import 'uno.css';
import './styles/index.scss';
// 暗黑主题部分样式
import 'element-plus/theme-chalk/dark/css-vars.css';

// import router from './permission';
import router from './router';
import store from './store';
import directives from './directives';
import filters from './filters';
import i18n from './i18n';

import App from './App.vue';
// miragejs会对加载静态资源二进制文件做未知操作  导致使用threejs加载模型时失败。故不使用
// import { setupMock } from '../mock';
const app = createApp(App);

(async () => {
  // await setupMock();
  app.use(store);
  app.use(router);
  await app.use(directives);
  app.use(filters);
  app.use(i18n);
  app.mount('#app');
})();
