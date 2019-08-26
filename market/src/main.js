/**
 * 入口文件
 *     引入全局(JS,CSS)资源
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入echarts
import echarts from 'echarts'


// 引入全局重置样式
import "normalize.css";
import "@/assets/styles/common.css";

Vue.use(ElementUI); // 注册全局组件,   Vue.use使用的大模块,内部会自动提供install方法(可以做全局注册)

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
