import { createApp } from 'vue';
import ArcoVue, { Icon } from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import globalComponents from '@/components';
import router from './router';
import store from './store';
import i18n from './locale';
import directive from './directive';
import './mock';
import App from './App.vue';
// Styles are imported via arco-plugin. See config/plugin/arcoStyleImport.ts in the directory for details
// 样式通过 arco-plugin 插件导入。详见目录文件 config/plugin/arcoStyleImport.ts
// https://arco.design/docs/designlab/use-theme-package
import '@/assets/style/tailwind.css';
import '@/assets/style/global.less';
import '@/api/interceptor';

const app = createApp(App);
// 配置 IconFont
const IconFont = Icon.addFromIconFontCn({
  src: 'https://at.alicdn.com/t/c/font_4722668_05iwmjsyurv4.js',
});
app.component('IconFont', IconFont);
app.use(ArcoVue, {});
app.use(ArcoVueIcon);
app.use(router);
app.use(store);
app.use(i18n);
app.use(globalComponents);
app.use(directive);
app.mount('#app');
