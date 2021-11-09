import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
// 导入element插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../static/css/reset.css' //rest样式引入

Vue.config.productionTip = false
Vue.use(ElementUI);


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
