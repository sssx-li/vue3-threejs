import 'virtual:svg-icons-register';

import 'normalize.css';
import 'uno.css';
import './styles/index.scss';
// 暗黑主题部分样式
import 'element-plus/theme-chalk/dark/css-vars.css';

import router from './router';
import store from './store';

import App from './App.vue';
const app = createApp(App);

(async () => {
  app.use(store);
  app.use(router);
  app.mount('#app');
})();
