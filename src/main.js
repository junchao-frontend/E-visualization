import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import SocketService from './utils/socket_service'
import './assets/css/global.scss'
import * as echarts from 'echarts' // 5.0版本的echarts引入方法
import '../public/static/theme/chalk.js'
// 引入字体文件
import './assets/font/iconfont.css'
SocketService.Instance.connect()
// import 'echarts-gl'
Vue.prototype.$socket = SocketService.Instance
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
